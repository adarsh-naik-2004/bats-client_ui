"use server";

import { cookies } from "next/headers";

export default async function login(prevState: unknown, formdata: FormData) {
  const email = formdata.get("email");
  const password = formdata.get("password");

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_GATEWAY}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
        credentials: "include",
      }
    );

    if (!response.ok) {
      const error = await response.json();
      return {
        type: "error",
        message: error.errors?.[0]?.msg || "Login failed",
      };
    }


    
    // Get cookies from Set-Cookie headers
    const setCookieHeaders = response.headers.getSetCookie();
    
    if (setCookieHeaders.length === 0) {
      return {
        type: "error",
        message: "Authentication cookies not received",
      };
    }

    const cookieStore = await cookies();

    // Parse and set cookies
    setCookieHeaders.forEach((cookieHeader) => {
      const parts = cookieHeader.split(';');
      const [nameValue] = parts;
      const [name, value] = nameValue.split('=');
      
      if (name?.trim() === 'accessToken' || name?.trim() === 'refreshToken') {
        const cookieOptions: {
          httpOnly: boolean;
          secure: boolean;
          sameSite: 'none';
          path: string;
          maxAge?: number;
          expires?: Date;
          domain?: string;
        } = {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
          path: '/',
        };

        // Parse additional options
        parts.slice(1).forEach(part => {
          const [key, val] = part.trim().split('=');
          switch (key.toLowerCase()) {
            case 'max-age':
              cookieOptions.maxAge = parseInt(val) * 1000;
              break;
            case 'expires':
              cookieOptions.expires = new Date(val);
              break;
            case 'domain':
              cookieOptions.domain = val;
              break;
          }
        });

        cookieStore.set(name.trim(), value, cookieOptions);
      }
    });

    return {
      type: "success",
      message: "Login successful!",
    };
  } catch (error: unknown) {
    console.error("Login error:", error);
    return {
      type: "error",
      message: "Network error occurred during login.",
    };
  }
}
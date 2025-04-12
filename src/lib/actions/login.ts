"use server";
import { parse } from "cookie";
import { cookies } from "next/headers";

export default async function login(prevState: unknown, formdata: FormData) {
  const email = formdata.get("email");
  const password = formdata.get("password");

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/auth/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.log("error", error);
      return {
        type: "error",
        message: error.errors[0].msg,
      };
    }

    const c = response.headers.getSetCookie();
    const accessToken = c.find((cookie) => cookie.includes("accessToken"));
    const refreshToken = c.find((cookie) => cookie.includes("refreshToken"));

    if (!accessToken || !refreshToken) {
      return {
        type: "error",
        message: "Required cookies not found!",
      };
    }

    const parsedAccessToken = parse(accessToken);
    const parsedRefreshToken = parse(refreshToken);

    console.log(parsedAccessToken, parsedRefreshToken);

    const cookieStore = await cookies();

    cookieStore.set("accessToken", parsedAccessToken.accessToken ?? "", {
      expires: new Date(parsedAccessToken.expires ?? Date.now() + 3600 * 1000),
      httpOnly: parsedAccessToken.httpOnly === "true",
      path: parsedAccessToken.Path,
      domain: parsedAccessToken.Domain,
      sameSite: parsedAccessToken.SameSite as "strict",
    });

    cookieStore.set("refreshToken", parsedRefreshToken.refreshToken ?? "", {
      expires: parsedRefreshToken.expires
        ? new Date(parsedRefreshToken.expires)
        : undefined,
      httpOnly: parsedRefreshToken.httpOnly === "true",
      path: parsedRefreshToken.Path,
      domain: parsedRefreshToken.Domain,
      sameSite: parsedRefreshToken.SameSite as "strict",
    });

    return {
      type: "success",
      message: "Login successful!",
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error during login:", error.message);
    } else {
      console.error("Unknown error during login:", error);
    }
    return {
      type: "error",
      message: "An error occurred during login.",
    };
  }
}

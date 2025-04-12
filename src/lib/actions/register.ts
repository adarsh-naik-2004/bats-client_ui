"use server";
import { parse } from "cookie";
import { cookies } from "next/headers";

export default async function register(prevState: unknown, formdata: FormData) {
  const firstName = formdata.get("firstName");
  const lastName = formdata.get("lastName");
  const email = formdata.get("email");
  const password = formdata.get("password");


  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/auth/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
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
        message: "No cookies were found!",
      };
    }

    const parsedAccessToken = parse(accessToken);
    const parsedRefreshToken = parse(refreshToken);

    const cookieStore = await cookies();

    cookieStore.set("accessToken", parsedAccessToken.accessToken ?? "", {
      expires: parsedAccessToken.expires
        ? new Date(parsedAccessToken.expires)
        : undefined,
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
      message: "Registration successful!",
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error during registration:", error.message);
    } else {
      console.error("Unknown error during registration:", error);
    }
    return {
      type: "error",
      message: "an error has occurred during registration",
    };
  }
}

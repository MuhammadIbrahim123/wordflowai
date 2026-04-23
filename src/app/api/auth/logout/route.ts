import { NextResponse } from "next/server";

const AUTH_COOKIE_NAMES = [
  "next-auth.session-token",
  "__Secure-next-auth.session-token",
  "authjs.session-token",
  "__Secure-authjs.session-token",
  "next-auth.csrf-token",
  "__Host-next-auth.csrf-token",
  "authjs.csrf-token",
  "__Host-authjs.csrf-token",
  "next-auth.callback-url",
  "authjs.callback-url",
];

function clearCookie(response: NextResponse, name: string) {
  response.cookies.set(name, "", {
    expires: new Date(0),
    path: "/",
  });
}

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: "Logged out successfully.",
  });

  for (const cookieName of AUTH_COOKIE_NAMES) {
    clearCookie(response, cookieName);

    // Clear chunked cookies used for larger JWT payloads.
    for (let i = 0; i < 6; i += 1) {
      clearCookie(response, `${cookieName}.${i}`);
    }
  }

  return response;
}

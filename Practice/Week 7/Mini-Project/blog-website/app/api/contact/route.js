import { NextResponse } from "next/server";

export async function GET(request) {
  // const { email, message } = await request.json();

  // ...handle contact form logic (e.g. send email)

  const response = NextResponse.json({ message: "Message sent successfully!" });

  // Set cookie server-side here, not in the client
  response.cookies.set("session", "your-token-here", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}

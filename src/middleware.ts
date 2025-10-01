import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth(async (req) => {
  const { nextUrl } = req;
  if (nextUrl.pathname.startsWith("/admin") && !req.auth?.user) {
    const login = new URL("/login", nextUrl.origin);
    login.searchParams.set("callbackUrl", nextUrl.href);
    return NextResponse.redirect(login);
  }
  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};

import { NextAuthMiddlewareOptions, NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

function middleware(req: NextRequestWithAuth) {
  // handle admin dashboard pages
  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (req.nextauth.token?.role === "admin") {
      return NextResponse.next();
    }

    const redirect = new URL("/", req.url);
    return NextResponse.redirect(redirect);
  }

  const isLoginPage = req.nextUrl.pathname.startsWith("/login");
  const isSignupPage = req.nextUrl.pathname.startsWith("/signup");

  if (isLoginPage || isSignupPage) {
    if (!req.nextauth.token) {
      return NextResponse.next();
    }

    const redirect = new URL("/", req.url);
    return NextResponse.redirect(redirect);
  }
}

const callbacks: NextAuthMiddlewareOptions["callbacks"] = {
  authorized: ({ token, req }) => {
    const login = req.nextUrl.pathname === "/login";
    const signup = req.nextUrl.pathname === "/signup";

    if ((login || signup) && !token) return true;

    return token && token.email ? true : false;
  },
};

export default withAuth(middleware, { callbacks });

export const config = {
  matcher: [
    "/login",
    "/signup",
    "/checkout",
    "/admin/:path*",
    "/orders/:path*",
    "/address/:path*",
    "/profile/:path*",
    "/password-change",
    "/order-confirmation",
    "/payment-methods/:path*",
  ],
};

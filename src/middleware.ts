import { NextURL } from "next/dist/server/web/next-url";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { useUser } from "./store/use-user";

async function checkIsAuthenticated(req: NextRequest, res: NextResponse) {
  const token = req.cookies.get("access_token")?.value;
  const hasToken = !!token;

  if (!hasToken) return { ok: false, user: null };

  const response = await fetch("http://localhost:5000/auth/me", {
    headers: {
      cookie: `access_token=${token};`,
    },
  });

  const user = await response.json();
  return { ok: response.status !== 403, user };
}

function redirectTo(url: string, nextUrl: NextURL) {
  return NextResponse.redirect(new URL(url, nextUrl));
}

export async function middleware(req: NextRequest, res: NextResponse) {
  const isAuthenticated = await checkIsAuthenticated(req, res);

  const middlewareHandlers = {
    "/dashboard": async (req: NextRequest) => {
      if (!isAuthenticated.ok) return redirectTo("/login", req.nextUrl);
    },
    "/login": async (req: NextRequest) => {
      if (isAuthenticated.ok) {
        return redirectTo("/dashboard", req.nextUrl);
      }
    },
    "/register": async (req: NextRequest) => {
      if (isAuthenticated.ok) {
        return redirectTo("/dashboard", req.nextUrl);
      }
    },
  };

  const pathname = req.nextUrl.pathname as keyof typeof middlewareHandlers;

  const user = await fetch("http://localhost:5000/auth/me", {
    headers: {
      cookie: `access_token=${req.cookies.get("access_token")?.value};`,
    },
  }).then((res) => res.json());
  useUser.setState({ user });

  if (middlewareHandlers[pathname]) {
    return middlewareHandlers[pathname](req);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};

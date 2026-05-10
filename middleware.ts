import { NextRequest, NextResponse } from "next/server";

function parseJwt(token: string) {
  try {
    const base64 = token.split(".")[1];
    const json = Buffer.from(base64, "base64").toString();
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const access = request.cookies.get("access")?.value;
  const refresh = request.cookies.get("refresh")?.value;
  const { pathname } = request.nextUrl;

  const isLoginPage = pathname.startsWith("/auth/login");

  if (!access) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  const decoded = parseJwt(access);
  const now = Math.floor(Date.now() / 1000);

  if (decoded && decoded.exp < now && refresh) {
    try {
      const refreshResponse = await fetch(
        "http://127.0.0.1:8000/api/jwt/refresh/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refresh }),
        }
      );

      if (refreshResponse.ok) {
        const data = await refreshResponse.json();

        const response = NextResponse.next();

        response.cookies.set("access", data.access, {
          path: "/",
        });

        if (data.refresh) {
          response.cookies.set("refresh", data.refresh, {
            path: "/",
          });
        }

        return response;
      }
    } catch {}

    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (access && isLoginPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/browse/:path*",
    "/search/:path*",
    "/library/:path*",
    "/explore/:path*",
    "/",
    "/artist/:path*",
    "/popular-albums/:path*",
    "/fresh-track/:path*",
    "/trending/:path",
  ],
};

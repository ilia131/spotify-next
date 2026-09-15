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

export async function proxy(request: NextRequest) {
  const access = request.cookies.get("access")?.value;
  const refresh = request.cookies.get("refresh")?.value;

  const { pathname } = request.nextUrl;

  const isLoginPage = pathname.startsWith("/auth/login");

  // اگر لاگین نیست و صفحه لاگین هست اجازه بده
  if (!access && isLoginPage) {
    return NextResponse.next();
  }

  // اگر access وجود نداره
  if (!access) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  const decoded = parseJwt(access);
  const now = Math.floor(Date.now() / 1000);

  // اگر access token منقضی شده
  if (decoded?.exp < now) {
    // اگر refresh هم نبود
    if (!refresh) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

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

      // اگر refresh fail شد
      if (!refreshResponse.ok) {
        const response = NextResponse.redirect(
          new URL("/auth/login", request.url)
        );

        response.cookies.delete("access");
        response.cookies.delete("refresh");

        return response;
      }

      const data = await refreshResponse.json();

      const response = NextResponse.next();

      // access جدید
      response.cookies.set("access", data.access, {
        path: "/",
        sameSite: "lax",
        httpOnly: false,
        secure: false,
      });

      // refresh جدید اگر وجود داشت
      if (data.refresh) {
        response.cookies.set("refresh", data.refresh, {
          path: "/",
          sameSite: "lax",
          httpOnly: false,
          secure: false,
        });
      }

      return response;

    } catch (error) {
      const response = NextResponse.redirect(
        new URL("/auth/login", request.url)
      );

      response.cookies.delete("access");
      response.cookies.delete("refresh");

      return response;
    }
  }

  // اگر لاگین کرده و رفت login
  if (access && isLoginPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/auth/login",
    "/browse/:path*",
    "/search/:path*",
    "/library/:path*",
    "/explore/:path*",
    "/artist/:path*",
    "/popular-albums/:path*",
    "/fresh-track/:path*",
    "/trending/:path*",
    "/settings/:path*",
    "/profile/:path*"
  ],
};
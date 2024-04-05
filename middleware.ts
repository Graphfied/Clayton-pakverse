import NextAuth from "next-auth";
import authConfig from "./auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "./routes";

const { auth } = NextAuth(authConfig);

export default auth(
  (
    req
  ):
    | any
    | null
    | undefined
    | Promise<any>
    | undefined
    | Promise<any>
    | null
    | undefined
    | Promise<any>
    | null
    | undefined
    | Promise<any>
    | null
    | undefined
    | Promise<any>
    | null
    | undefined
    | Promise<any>
    | null
    | undefined
    | Promise<any> => {
    // req.auth
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if (isApiAuthRoute) {
      return null;
    }
    // console.log("pathname ---> ", nextUrl.pathname);

    if (isAuthRoute) {
      if (isLoggedIn) {
        return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT));
      }
      return null;
    }

    if (!isLoggedIn && !isPublicRoute) {
      let callBackUrl = nextUrl.pathname;
      if (nextUrl.search) {
        callBackUrl += nextUrl.search;
      }
      const encodedCallbackUrl = encodeURIComponent(callBackUrl);
      return Response.redirect(
        new URL(`/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
      );
    }

    return null;
  }
);

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

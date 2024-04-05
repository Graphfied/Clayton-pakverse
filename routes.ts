/**
 * An array of routes that are publicly accessible.
 * These routes do not require authentication.
 *
 * @type {string[]}
 */
export const publicRoutes = [
  "/",
  "/auth/new-verification",
  "/api/webhook",
  "/price",
  "/reservations",
  "/checkout",
];

/**
 * An array of routes that are used for authentication.
 * These routes will redirect logged in users to /settings
 *
 * @type {string[]}
 */

export const authRoutes = ["/login", "/register"];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for api authentication purposes
 *
 * @type {string}
 */

export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in
 *
 * @type {string}
 */
// export const DEFAULT_LOGIN_REDIRECT = "/settings";
export const DEFAULT_LOGIN_REDIRECT = "/account";

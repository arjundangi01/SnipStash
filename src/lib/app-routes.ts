export const AppRouts = {
  home: "/",
  auth: {
    signIn: "/auth/login",
    signUp: "/auth/signup",
  },
  user: {
    dashboard: "/dashboard",
    snippets: "/snippets",
  },
} as const;

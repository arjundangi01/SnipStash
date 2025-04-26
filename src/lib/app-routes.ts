export const AppRouts = {
  home: "/",
  auth: {
    signIn: "/auth/login",
    signUp: "/auth/signup",
  },
  user: {
    dashboard: "/dashboard",
  },
} as const;

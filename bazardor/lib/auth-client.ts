import { createAuthClient } from "better-auth/react";

function resolveBaseUrl(): string | undefined {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.BETTER_AUTH_URL;
  if (appUrl && appUrl.startsWith("http")) {
    return appUrl.replace(/\/+$/, "");
  }
  return "http://localhost:3001";
}

export const authClient = createAuthClient({
  baseURL: resolveBaseUrl(),
});

export const { signIn, signUp, signOut, useSession, updateUser } = authClient;

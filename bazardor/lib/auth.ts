import { betterAuth } from "better-auth";

function getAuthBaseUrl(): string {
  const url = process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_APP_URL;
  if (url && url.startsWith("http")) {
    return url.replace(/\/+$/, "");
  }
  return "http://localhost:3001";
}

export const auth = betterAuth({
  baseURL: getAuthBaseUrl(),
  secret: process.env.BETTER_AUTH_SECRET || "bazardor_secure_secret_key_123456789_abcdef!",
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  trustedOrigins: [
    "http://localhost:3001",
    "http://localhost:3000",
    process.env.NEXT_PUBLIC_APP_URL || "",
    process.env.BETTER_AUTH_URL || "",
  ]
    .map((origin) => origin.replace(/\/+$/, ""))
    .filter(Boolean),
});
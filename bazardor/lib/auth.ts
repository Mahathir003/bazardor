import { betterAuth } from "better-auth";

function getBaseUrl(): string {
  const url = process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_APP_URL;
  if (url && url.startsWith("http")) {
    return url.replace(/\/+$/, "");
  }
  return "https://bazardor-iota.vercel.app";
}

export const auth = betterAuth({
  baseURL: getBaseUrl(),
  secret:
    process.env.BETTER_AUTH_SECRET ||
    "bazardor_secure_secret_key_123456789_abcdef!",
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  trustedOrigins: [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://bazardor-iota.vercel.app",
    process.env.NEXT_PUBLIC_APP_URL || "",
    process.env.BETTER_AUTH_URL || "",
  ]
    .map((origin) => origin.replace(/\/+$/, ""))
    .filter(Boolean),
});

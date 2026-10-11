import { betterAuth } from "better-auth";

export const auth = betterAuth({
  secret:
    process.env.BETTER_AUTH_SECRET ||
    "bazardor_secure_secret_key_123456789_abcdef!",
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  trustedOrigins: async (request) => {
    // Dynamically trust any localhost, vercel.app preview/production deployment, or configured APP URL
    const origin = request?.headers?.get("origin");
    if (!origin) return true;

    if (
      origin.includes("localhost") ||
      origin.endsWith(".vercel.app") ||
      (process.env.NEXT_PUBLIC_APP_URL &&
        origin.startsWith(
          process.env.NEXT_PUBLIC_APP_URL.replace(/\/+$/, ""),
        )) ||
      (process.env.BETTER_AUTH_URL &&
        origin.startsWith(process.env.BETTER_AUTH_URL.replace(/\/+$/, "")))
    ) {
      return true;
    }

    return false;
  },
});

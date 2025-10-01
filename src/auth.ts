import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

async function sha256Hex(input: string) {
  const enc = new TextEncoder().encode(input);
  const hashBuf = await crypto.subtle.digest("SHA-256", enc);
  const hashArr = Array.from(new Uint8Array(hashBuf));
  return hashArr.map(b => b.toString(16).padStart(2, "0")).join("");
}

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Admin Login",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(rawCreds: { [key: string]: unknown } | undefined) {
        const username = typeof rawCreds?.username === "string" ? rawCreds.username : undefined;
        const password = typeof rawCreds?.password === "string" ? rawCreds.password : undefined;
        if (!username || !password) {
          return null;
        }
        const adminUser = process.env.ADMIN_USERNAME;
        const adminPasswordHash = process.env.ADMIN_PASSWORD_SHA256;
        if (!adminUser || !adminPasswordHash) {
          console.warn("[auth] Missing ADMIN_USERNAME or ADMIN_PASSWORD_SHA256 env var");
          return null;
        }
        const providedHash = await sha256Hex(password);
        const match = username === adminUser && safeEqual(providedHash, adminPasswordHash);
        if (!match) {
          console.warn("[auth] Invalid credentials attempt", { usernameAttempt: username, hashMatch: safeEqual(providedHash, adminPasswordHash) });
          return null;
        }
        return { id: "admin", name: adminUser };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    session({ session, token }) {
      if (token.user) session.user = {
        id: (token.user as { id: string }).id,
        name: (token.user as { name: string }).name,
        email: (token.user as { email: string | undefined }).email ?? "",
        emailVerified: (token.user as { emailVerified: Date | null | undefined }).emailVerified ?? null,
      };
      return session;
    },
  },
});

export async function requireAdmin() {
  const session = await auth();
  if (!session?.user) return null;
  return session;
}
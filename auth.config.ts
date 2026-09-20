import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { findUserById, upsertGoogleUser } from "@/lib/users"
import { validateEmail, verifyPassword } from "@/lib/password"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = validateEmail(String(credentials?.email || ""))
        if (!email || !credentials?.password) return null
        const { findUserByEmail } = await import("@/lib/users")
        const user = await findUserByEmail(email)
        if (!user?.passwordHash || user.accountStatus !== "active") return null
        const valid = await verifyPassword(String(credentials.password), user.passwordHash)
        if (!valid) return null
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account, profile, user }) {
      if (account?.provider === "google") {
        const email = (profile as { email?: string } | undefined)?.email || user?.email
        if (email) {
          const dbUser = await upsertGoogleUser({
            email: email.toLowerCase(),
            name: (profile as { name?: string } | undefined)?.name || user?.name,
            image: (profile as { picture?: string } | undefined)?.picture || user?.image,
          })
          token.userId = dbUser.id
          token.googleId = account.providerAccountId
        }
      }

      if (user?.id) {
        token.userId = user.id
      }

      if (token.userId) {
        const dbUser = await findUserById(String(token.userId))
        if (dbUser) {
          token.userId = dbUser.id
          token.email = dbUser.email
          token.name = dbUser.name
          token.picture = dbUser.image
          token.plan = dbUser.plan
          token.entitlementStatus = dbUser.entitlementStatus
          token.accountStatus = dbUser.accountStatus
        }
      }

      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = String(token.userId || "")
        session.user.email = (token.email as string) || session.user.email
        session.user.name = (token.name as string) || session.user.name
        session.user.image = (token.picture as string) || session.user.image
        session.user.plan = token.plan || "free"
        session.user.entitlementStatus = token.entitlementStatus || "free"
        session.user.accountStatus = token.accountStatus || "active"
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  debug: process.env.NODE_ENV === "development",
}

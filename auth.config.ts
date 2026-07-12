import type { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      // 初次登录时，把谷歌用户信息写入 token
      if (account && profile) {
        token.googleId = account.providerAccountId
        token.picture = (profile as { picture?: string })?.picture || token.picture
      }
      return token
    },
    async session({ session, token }) {
      // 把 token 里的信息传给 session，前端可用
      if (session.user) {
        ;(session.user as { googleId?: string }).googleId = token.googleId as string
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

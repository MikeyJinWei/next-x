import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // 存取 session.user 的 name key
      // split() method 將 string 拆成 array
      // 賦值給新增的 username key
      session.user.username = session.user.name
        .split(" ")
        .join("")
        .toLocaleLowerCase();

      // 存取 token (JWT) 的 sub key
      // 賦值給新增的 userId key
      session.user.userId = token.sub;
      return session;
    },
  },
});

export { handler as GET, handler as POST };

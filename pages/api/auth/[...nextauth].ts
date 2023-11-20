import axios from "axios";
import NextAuth from "next-auth";
import ProviderCredentials from "next-auth/providers/credentials";
import connectDB from "__server__/db";
import User from "__server__/model/User";
import errorResponse from "__server__/utils/error";

export default NextAuth({
  providers: [
    ProviderCredentials({
      name: "Email and Password",
      credentials: { email: { type: "text" }, password: { type: "password" } },
      async authorize(credentials) {
        try {
          const { email, password } = credentials!;
          const URI = `${process.env.NEXTAUTH_URL}/api/auth/login`;
          const { data } = await axios.post(URI, { email, password });
          return data;
        } catch (error) {
          errorResponse(error);
        }
      },
    }),
  ],

  session: { strategy: "jwt", maxAge: 60 * 60 * 24 * 7 },
  pages: { signIn: "/login", signOut: "/login", newUser: "/signup" },

  callbacks: {
    async session({ session, token }) {
      await connectDB();
      const user = await User.findOne({ email: token.email });
      session.user._id = user._id;
      session.user.role = user.role;
      session.user.avatar = user.avatar;

      return session;
    },

    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
  },
});

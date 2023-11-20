import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      _id: string;
      avatar: any;
      name: string;
      role: string;
      email: string;
    };
  }

  interface User {
    _id: string;
    avatar: any;
    name: string;
    role: string;
    email: string;
  }
}

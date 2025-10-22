import { Routing, ServeStatic } from "express-zod-api";
import { emailController } from "./controllers/email-controller";

export const routing: Routing = {
  v1: {
    email: emailController,
  },
  public: new ServeStatic("assets", {
    dotfiles: "deny",
    index: false,
    redirect: false,
  }),
};

import { BuiltinLogger, createConfig } from "express-zod-api";
import ui from "swagger-ui-express";
import qs from "qs";
import pino, { Logger } from "pino";

const logger = pino({
  transport: {
    target: "pino-pretty",
    options: { colorize: true },
  },
});
export const config = createConfig({
  http: { listen: 3000 },
  logger,
  queryParser: (query) => qs.parse(query, { comma: true }), // affects listUsersEndpoint
  compression: true, // affects sendAvatarEndpoint
  // third-party middlewares serving their own routes or establishing their own routing besides the API
  beforeRouting: ({ app }) => {
    app.use(
      "/api-docs",
      ui.serve,
      ui.setup(null, { swaggerUrl: "/public/docs.yaml" })
    );
  },
  inputSources: {
    patch: ["headers", "body", "params"], // affects authMiddleware used by updateUserEndpoint
  },
  cors: true,
});

// These lines enable .child() and .profile() methods of built-in logger:
declare module "express-zod-api" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type -- augmentation
  interface LoggerOverrides extends BuiltinLogger {}
}

// Uncomment these lines when using a custom logger, for example winston:
/*
declare module "express-zod-api" {
  interface LoggerOverrides extends winston.Logger {}
}
*/

// These lines enable constraints on tags
declare module "express-zod-api" {
  interface TagOverrides {
    users: unknown;
    files: unknown;
    subscriptions: unknown;
    forms: unknown;
  }
}

import { z } from "zod";
import { defaultEndpointsFactory } from "express-zod-api";
import { methodProviderMiddleware } from "../middleware/method-provider";

// Demonstrating circular schemas using z.object()
const feature = z.object({
  title: z.string(),
  get features() {
    return z.array(feature).optional();
  },
});

const sendEmail = defaultEndpointsFactory
  .addMiddleware(methodProviderMiddleware)
  .build({
    shortDescription: "Retrieves the user.",
    description: "Example user retrieval endpoint",
    input: z.object({
      email: z.email().example("test@example.com"),
    }),
    output: z.object({ message: z.string() }),
    handler: async ({ input: { email }, options: { method }, logger }) => {
      logger.info(`Requested email: ${email}, method ${method}`);
      return {
        message: "Email sent successfully",
      };
    },
  });

const getEmail = defaultEndpointsFactory.build({
  shortDescription: "Retrieves the email.",
  description: "Retrieves the email.",
  output: z.object({
    message: z.string(),
  }),
  handler: async ({ logger }) => {
    logger.info("Requested email");

    return {
      message: "Email sent successfully",
    };
  },
});

export const emailController = { "post /": sendEmail, "get /": getEmail };

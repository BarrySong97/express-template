import pino from "pino";
const isDevelopment = process.env.NODE_ENV === "development";
const logger = pino({
  level: isDevelopment ? "debug" : "info",
  transport: isDevelopment
    ? {
        target: "pino-pretty",
        options: {
          colorize: true,
          ignore: "pid,hostname",
          translateTime: "yyyy-mm-dd HH:MM:ss",
        },
      }
    : undefined,
});
export default logger;

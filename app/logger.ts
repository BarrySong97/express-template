import pino from "pino";
import pinoHttp from "pino-http";

function maskEmail(email: string) {
  const [local, domain] = email.split("@");
  return `${local.slice(0, 2)}***@${domain}`;
}
function createLogger() {
  const isDevelopment = process.env.NODE_ENV === "development";
  const isTest = process.env.NODE_ENV === "test";
  const transport = {
    targets: [
      {
        target: "pino-opentelemetry-transport",
        options: {
          resourceAttributes: {
            "service.name": "supply-smart",
            "service.version": process.env.APP_VERSION || "1.0.0",
            "deployment.environment": process.env.NODE_ENV || "development",
          },
        },
        level: "info",
      },
      // Keep console output for development
      ...(process.env.NODE_ENV === "development"
        ? [
            {
              target: "pino-pretty",
              level: "debug",
              options: { colorize: true },
            },
          ]
        : []),
    ],
  };

  return pino({
    level: process.env.LOG_LEVEL || (isDevelopment ? "debug" : "info"),
    redact: {
      paths: [
        "password",
        "token",
        "apiKey",
        "creditCard.number",
        "ssn",
        "*.password",
        "*.token",
        "req.headers.authorization",
        "req.headers.cookie",
      ],
      remove: true, // Completely remove these fields
    },
    // Pretty output for development
    transport: transport,
    serializers: {
      user: (user) => ({
        id: user.id,
        username: user.username,
        email: user.email ? maskEmail(user.email) : undefined,
        role: user.role,
        // Never log password, apiKey, tokens, etc.
        lastLogin: user.lastLogin,
      }),
    },
    // Disable in tests unless explicitly needed
    enabled: !isTest,

    // Add application context
    base: {
      env: process.env.NODE_ENV,
      version: process.env.APP_VERSION,
    },
  });
}
const logger = createLogger();
const httpLogger = pinoHttp({
  logger,
  autoLogging: {
    ignore: (req) => {
      return !!(
        req.url === "/health" ||
        req.url?.startsWith("/static/") ||
        req.url?.match(/\.(css|js|png|jpg|ico)$/)
      );
    },
  },
  serializers: {
    req: (req) => ({
      method: req.method,
      url: req.url,
    }),
    res: (res) => ({
      statusCode: res.statusCode,
    }),
  },
  // Custom log levels based on response status
  customLogLevel: (req, res, err) => {
    if (res.statusCode >= 400 && res.statusCode < 500) return "warn";
    if (res.statusCode >= 500 || err) return "error";
    if (res.statusCode >= 300 && res.statusCode < 400) return "silent";
    return "info";
  },

  // Custom success message with timing
  customSuccessMessage: (req, res) => {
    return `${req.method} ${req.url} completed`;
  },
});

export default logger;
export { httpLogger };

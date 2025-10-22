import "dotenv/config";
import { createServer } from "express-zod-api";
import { config } from "./app/config.mjs";
import { routing } from "./app/routing.mjs";
/**
 * "await" is only needed for using entities returned from this method.
 * If you can not use await (on the top level of CJS), use IIFE wrapper:
 * @example (async () => { await ... })()
 * */
createServer(config, routing);

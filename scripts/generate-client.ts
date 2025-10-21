import { writeFile } from "node:fs/promises";
import { Integration } from "express-zod-api";
import { routing } from "../routing.mts";
import { config } from "../config.mts";

await writeFile(
  "example.client.ts",
  await new Integration({
    routing,
    variant: "types",
    serverUrl: `http://localhost:${config.http!.listen}`,
  }).printFormatted(), // or just .print(),
  "utf-8"
);

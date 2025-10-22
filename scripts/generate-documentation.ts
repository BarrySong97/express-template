import { writeFile } from "node:fs/promises";
import { Documentation } from "express-zod-api";
import { config } from "../app/config";
import { routing } from "../app/routing";
import manifest from "../package.json" with { type: "json" };

await writeFile(
  "./assets/docs.yaml",
  new Documentation({
    routing,
    config,
    version: manifest.version,
    title: "Example API",
    serverUrl: "https://example.com",
    tags: {
      users: "Everything about the users",
      files: "Everything about the files processing",
      subscriptions: "Everything about the subscriptions",
    },
  }).getSpecAsYaml(),
  "utf-8"
);

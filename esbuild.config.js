import { build } from "esbuild";

await build({
  entryPoints: ["app/index.ts"], // 入口文件，可改成数组 ['src/index.ts', 'src/cli.ts']
  outdir: "dist", // 输出目录
  platform: "node", // Node.js 平台
  format: "esm", // ESM 格式
  sourcemap: false, // 生成 source map
  minify: true,
  bundle: true, // 不打包
  packages: "external",
});

import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  minify: true,
  dts: true,
  clean: true,
});

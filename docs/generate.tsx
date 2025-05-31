import { watch } from "node:fs";
import path from "node:path";
import { Docs } from "./src";
import { writeToFile } from "./src/utils";

const generate = async () => {
  const start = Date.now();
  await writeToFile("./docs/dist/index.html", `${(<Docs />)}`, {
    overwrite: true,
  });
  console.log(`Docs generated in ${Date.now() - start}ms`);
};

generate();
if (process.env.NODE_ENV === "development") {
  const dirname = import.meta.dirname;
  const filesSrc = path.join(dirname, "./src");
  const docsSrc = path.join(dirname, "./docs/src");
  console.log(`Watching for changes in ${filesSrc} and ${docsSrc}`);

  const watcher1 = watch(filesSrc, { recursive: true }, generate);
  const watcher2 = watch(docsSrc, { recursive: true }, generate);
  process.on("SIGINT", () => {
    watcher1.close();
    watcher2.close();
    process.exit(0);
  });
}

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

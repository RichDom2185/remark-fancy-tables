import { toHtml } from "hast-util-to-html";
import { open, write } from "node:fs";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fancyTables } from "../../src/handler";

export const fancyTableToHtmlTable = (contents: string): string => {
  // Ignore types since we know internally that this works
  const node = {
    lang: "table",
    value: contents,
  } as any;
  const hastNode = fancyTables({} as any, node);
  return toHtml(hastNode);
};

export const writeToFile = async (
  filePath: string,
  data: string,
  options: { overwrite?: boolean } = {}
) => {
  const { overwrite = false } = options;
  // Create directory if it doesn't exist
  const dir = path.dirname(filePath);
  await mkdir(dir, { recursive: true });
  // Open file for writing
  const fd = await new Promise<number>((resolve, reject) => {
    open(filePath, overwrite ? "w" : "wx", (err, fd) => {
      if (err) {
        reject(err);
      } else {
        resolve(fd);
      }
    });
  });
  // Write data to file
  await new Promise<void>((resolve, reject) => {
    write(fd, data, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

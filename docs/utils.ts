import { open, write } from "node:fs";
import { mkdir } from "node:fs/promises";
import path from "node:path";

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

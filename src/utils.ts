import type { Text } from "hast";

export const assert = (condition: () => boolean) => {
  if (!condition()) {
    throw new Error("Assertion failed");
  }
};

export const t: (text: string) => Text = (text) => ({
  type: "text",
  value: text,
});

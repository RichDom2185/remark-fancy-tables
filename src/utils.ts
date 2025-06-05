import type { ElementContent, Root as HastRoot, Text } from "hast";
import { raw } from "hast-util-raw";
import { fromMarkdown } from "mdast-util-from-markdown";
import { toHast } from "mdast-util-to-hast";

export const assert = (condition: () => boolean) => {
  if (!condition()) {
    throw new Error("Assertion failed");
  }
};

export const t: (text: string) => Text = (text) => ({
  type: "text",
  value: text,
});

export const markdownify = (text: string): ElementContent[] => {
  const mdast = fromMarkdown(text);
  const hast = toHast(mdast, { allowDangerousHtml: true });
  assert(() => hast.type === "root");
  const root = hast as HastRoot;
  assert(() => root.children.length === 1);
  // Parse any raw HTML
  const child = raw(root.children[0]);
  // Unwrap the top level
  return child.type === "element" && child.tagName === "p"
    ? child.children
    : [child as ElementContent];
};

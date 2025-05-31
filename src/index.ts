import { defaultHandlers } from "mdast-util-to-hast";

/**
 * Default code block handler.
 */
const defaultHandler = defaultHandlers.code;
type Handler = typeof defaultHandler;

const fancyTables: Handler = (s, node) => {
  if (node.lang !== "table") {
    return defaultHandler(s, node);
  }
  // TODO: Implement fancy tables plugin
  const contents = node.value;
  console.log(contents);
  return defaultHandler(s, node);
};

export default fancyTables;

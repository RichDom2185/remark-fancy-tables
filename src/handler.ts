import type { Element, ElementContent } from "hast";
import { h } from "hastscript";
import { defaultHandlers } from "mdast-util-to-hast";
import { assert, t } from "./utils";

/**
 * Default code block handler.
 */
const defaultHandler = defaultHandlers.code;
type Handler = typeof defaultHandler;

const starts = new Set(["|--", "|:-"]);

const alignmentDelimiter = "```alignment";
const parseContents = (contents: string) => {
  const [text, alignments] = contents.split(alignmentDelimiter, 2);
  const lines = text
    .trim()
    .split("\n")
    .map((line) => line.trim());
  const firstRow = lines[0].trim().slice(0, 3);
  const offset = starts.has(firstRow) ? 1 : 2;
  return {
    header: starts.has(firstRow) ? null : lines[0],
    body: lines.slice(offset),
    alignments: alignments?.replace(/\s+/g, "").split("") ?? [],
  };
};

// TODO: Default alignment
enum Alignment {
  LEFT = "l",
  RIGHT = "r",
  CENTER = "c",
}
const alignmentToAlign = Object.freeze({
  [Alignment.LEFT]: "left",
  [Alignment.RIGHT]: "right",
  [Alignment.CENTER]: "center",
} as const) satisfies Record<Alignment, string>;

export const fancyTables: Handler = (s, node) => {
  if (node.lang !== "table") {
    return defaultHandler(s, node);
  }
  const contents = node.value;
  const data = parseContents(contents);

  const header = data.header
    ? generateHeader(data.header, data.alignments)
    : undefined;
  let cellIndex = header?.nextCellIndex ?? 0;
  const rows: Element[] = [];

  const numRows = data.body.length;
  for (let rowIndex = 0; rowIndex < numRows; rowIndex++) {
    const row = data.body[rowIndex];
    console.debug("Processing row", [row]);

    const [_, ...cells] = row.trim().split("|");
    assert(() => _ === "");
    console.debug(`Row ${rowIndex} has ${cells.length} cells:`, cells);

    const rowChildren: Element[] = [];
    // Ignore trailing empty cell
    assert(() => cells[cells.length - 1] === "");
    for (let colIndex = 0; colIndex < cells.length - 1; ) {
      const cell = cells[colIndex].trim();
      console.debug(
        `Processing cell ${cellIndex} at row ${rowIndex}, col ${colIndex}:`,
        cell
      );

      let cleaned = cell.replace(/\\/g, "");
      const colSpan = cell.length - cleaned.length + 1;
      cleaned = cleaned.trim();

      const prefix = cleaned.slice(0, 2);
      if (prefix === "^^") {
        // Already handled by the previous row
        colIndex += 1;
        continue;
      }

      const contentsToAdd = [];
      let rowSpan = 1;
      for (
        let lookbelowIndex = rowIndex + 1;
        lookbelowIndex < numRows;
        lookbelowIndex++
      ) {
        const [nextRowLeading, ...nextRowCells] = data.body[lookbelowIndex]
          .replace(/\\/g, "|")
          .trim()
          .split("|");
        assert(() => nextRowLeading === "");
        const cellBelow = nextRowCells[colIndex].trim();
        const prefix = cellBelow.slice(0, 2);
        if (prefix === "^^") {
          rowSpan += 1;
          // TODO: Parse as markdown
          // | markdownify | split: '<p>' | shift | join: '<p>' | split: '</p>' | pop | join: '</p>'
          const contentToAdd = cellBelow.slice(2).trim();
          if (contentToAdd !== "") {
            contentsToAdd.push(contentToAdd);
          }
        } else {
          break;
        }
      }

      // Default to left alignment
      // TODO: Customize default alignment
      const alignment =
        (data.alignments[cellIndex]?.toLowerCase() as Alignment) ??
        Alignment.LEFT;
      const attrs = {
        colspan: colSpan,
        rowspan: rowSpan,
        align: alignmentToAlign[alignment],
        dataNthCell: cellIndex + 1,
      };
      rowChildren.push(
        h("td", attrs, [
          // TODO: {{- cleaned | strip | markdownify | split: '<p>' | shift | join: '<p>' | split: '</p>' | pop | join: '</p>' -}}
          t(cleaned.trim()),
          ...contentsToAdd.flatMap(
            (c) => [h("br"), t(c)] satisfies ElementContent[]
          ),
        ])
      );

      // TODO: Document what this does
      let carriedOver = 0;
      for (let i = colIndex; i < cells.length; i++) {
        const sibling = cells[i + 1].trim().slice(0, 2);
        if (sibling !== "^^") {
          break;
        }
        carriedOver += 1;
      }

      colIndex += colSpan + carriedOver;
      console.debug(
        `Set colIndex to ${colIndex} after processing cell ${cellIndex}`
      );
      cellIndex += 1;
    }
    rows.push(h("tr", rowChildren));
  }
  return h("table", [
    // TODO: Add thead
    header?.element,
    h("tbody", rows),
  ]);
};

const generateHeader = (
  header: string,
  alignments: string[]
): {
  element: Element;
  nextCellIndex: number;
} => {
  const [_, ...cells] = header.trim().split("|");
  assert(() => _ === "");
  console.debug(`Header has ${cells.length} cells:`, cells);
  let cellIndex = 0;
  const rowChildren: Element[] = [];
  // Ignore trailing empty cell
  assert(() => cells[cells.length - 1] === "");
  for (let colIndex = 0; colIndex < cells.length - 1; colIndex++) {
    const cell = cells[colIndex].trim();
    console.debug(
      `Processing header cell ${cellIndex}, col ${colIndex}:`,
      cell
    );

    let cleaned = cell.replace(/\\/g, "");
    const colSpan = cell.length - cleaned.length + 1;
    cleaned = cleaned.trim();
    const alignment =
      (alignments[cellIndex]?.toLowerCase() as Alignment) ?? Alignment.LEFT;
    const attrs = {
      colspan: colSpan,
      align: alignmentToAlign[alignment],
      dataNthCell: cellIndex + 1,
    };
    rowChildren.push(
      h("td", attrs, [
        // TODO: {{- cleaned | strip | markdownify | split: '<p>' | shift | join: '<p>' | split: '</p>' | pop | join: '</p>' -}}
        t(cleaned.trim()),
      ])
    );
    cellIndex += 1;
  }

  return {
    element: h("thead", h("tr", rowChildren)),
    nextCellIndex: cellIndex,
  };
};

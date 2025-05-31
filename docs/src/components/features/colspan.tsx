import dedent from "dedent";
import { fancyTableToHtmlTable } from "../../utils";

const example1 = dedent`
| OMG, I span 3 columns! \\      \\      |
|------------------------|------|------|
| That's...              | very | nice |
`;

const example2 = dedent`
| OMG, I span 3 columns! \\\\|
|------------|------|------|
| That's...  | very | nice |
`;

const example3 = dedent`
| OMG, I    \\ span \\ 3 columns! |
|-----------|------|------------|
| That's... | very | nice       |
`;

const table1 = fancyTableToHtmlTable(example1);
const table2 = fancyTableToHtmlTable(example2);
const table3 = fancyTableToHtmlTable(example3);

const check = new Set<string>().add(table1).add(table2).add(table3).size === 1;
if (!check) {
  throw new Error("Colspan examples do not produce the same HTML table");
}

export const Colspan = () => {
  return (
    <div>
      <ul>
        <li>Works in table headers and table body</li>
        <li>
          <p>Simply "break" the column separator to span multiple columns</p>
          <pre>
            <code>{example1}</code>
          </pre>
        </li>
        <li>
          <p>Breaks don't have to be aligned to anything</p>
          <pre>
            <code>{example2}</code>
          </pre>
        </li>
        <li>
          <p>Non-blank cells will be joined together with a space</p>
          <pre>
            <code>{example3}</code>
          </pre>
        </li>
      </ul>
      <p>The above 3 examples give the same result:</p>
      <div dangerouslySetInnerHTML={{ __html: table1 }} />
    </div>
  );
};

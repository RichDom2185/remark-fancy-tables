import dedent from "dedent";
import { fancyTableToHtmlTable } from "../../utils";

const example1 = dedent`
| _For padding_ | _For padding_ | _For padding_ |
|---------------|---------------|---------------|
| left          |    center     |         right |
|    center     |         right | left          |
|         right | left          |    center     |
\`\`\`alignment
CCC
LCR
CRL
RLC
`;

const example2 = dedent`
| _For padding_ | _For padding_ | _For padding_ |
|---------------|---------------|---------------|
| left          |    center     |         right |
|    center     |         right | left          |
|         right | left          |    center     |
\`\`\`alignment
cCClCrCrlrLc
`;

const table1 = fancyTableToHtmlTable(example1);
const table2 = fancyTableToHtmlTable(example2);

const check = new Set<string>().add(table1).add(table2).size === 1;
if (!check) {
  throw new Error("Alignment examples do not produce the same HTML table");
}

export const Alignment = () => {
  return (
    <div>
      <ul>
        <li>
          <p>
            Simply add a section under <code>```alignment</code> before closing
            the code block with <code>```</code>. Specify left, right, or
            center-aligned using `L`, `R`, or `C` respectively
          </p>
          <pre>
            <code>{example1}</code>
          </pre>
        </li>
        <li>
          <p>Whitespace and capitalization do not matter</p>
          <pre>
            <code>{example2}</code>
          </pre>
        </li>
      </ul>
      <p>The above 2 examples give the same result:</p>
      <div dangerouslySetInnerHTML={{ __html: table1 }} />
    </div>
  );
};

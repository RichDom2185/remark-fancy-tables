import dedent from "dedent";
import { fancyTableToHtmlTable } from "../../utils";

const example1 = dedent`
|------------------------|---------|
| Look, I span two rows! | Looks   |
| ^^                     | pretty! |
`;

const example2 = dedent`
|---------------|---------|
| Look, I span  | Looks   |
| ^^ two rows!  | pretty! |
`;

const table1 = fancyTableToHtmlTable(example1);
const table2 = fancyTableToHtmlTable(example2);

export const Rowspan = () => {
  return (
    <div>
      <ul>
        <li>Only works for the table body</li>
        <li>
          <p>
            Simply prepend table cells with <code>^^</code>
          </p>
          <pre>
            <code>{example1}</code>
          </pre>
          <p>Result:</p>
          <div dangerouslySetInnerHTML={{ __html: table1 }} />
        </li>
        <li>
          <p>Non-blank cells will be joined together with a line break</p>
          <pre>
            <code>{example2}</code>
          </pre>
          <p>Result:</p>
          <div dangerouslySetInnerHTML={{ __html: table2 }} />
        </li>
      </ul>
    </div>
  );
};

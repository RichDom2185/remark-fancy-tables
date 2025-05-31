import dedent from "dedent";
import { fancyTableToHtmlTable } from "../../utils";

const before = dedent`
| This      | table | looks | quite | ugly    |
|-----------|-------|-------|-------|---------|
| Sometimes | you   | don't | want  | headers |
`;

const after = dedent`
|-----------|-------|-------|-------|---------|
| Sometimes | you   | don't | want  | headers |
`;

export const Headerless = () => {
  return (
    <div>
      <p>Simply chop off the header lines:</p>
      <p>Before:</p>
      <pre>
        <code>{before}</code>
      </pre>
      <p>After:</p>
      <pre>
        <code>{after}</code>
      </pre>
      <p>Result:</p>
      <div dangerouslySetInnerHTML={{ __html: fancyTableToHtmlTable(after) }} />
    </div>
  );
};

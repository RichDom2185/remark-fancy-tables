import dedent from "dedent";
import { fancyTableToHtmlTable } from "../utils";

const table = dedent`
| Check out this _fancy_ :sparkles: table!                                               \\\\|
|----------|-----------------------------------------------------------------|-------------|
| Doe      | A deer, a female...                                             | Deer        |
| Oh wait, \\ this cell spans two columns! Here's an orange :tangerine:       | Two rows!   |
| Four...  | Bananas forever :banana: :banana: :banana:                      | ^^          |
| ^^       | Oops, forgot one more :banana:                                  \\             |
| Testing  | This is <strong>HTML bold</strong>, not markdown                | _center_    |
| This row would be center-aligned                                          \\| Hello,      |
| ^^ Hey! How are you? :eyes:                                               \\| ^^          |
| Sponge?  | Imagination :rainbow:  &#124; ( • ) ( • ) &#124; :rainbow:      | ^^ _world?_ |
| Thirteen | Some text I will break here,<br>and oh, it also has **markdown** styling!    \\|
\`\`\`alignment
c LLL Lr LL L LLc cL   ll lR
`;

export const Showcase = () => {
  return (
    <div>
      <p>
        The following table is written entirely in (extended) Markdown with no
        HTML!
      </p>
      <div dangerouslySetInnerHTML={{ __html: fancyTableToHtmlTable(table) }} />
    </div>
  );
};

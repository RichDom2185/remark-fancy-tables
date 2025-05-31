import Page from "./components/page";
import { writeToFile } from "./utils";

const Docs = () => (
  // TODO: Add page description
  <Page title="Remark Fancy Tables" description="">
    <h1>Remark Fancy Tables</h1>
  </Page>
);

writeToFile("./docs/dist/index.html", `${(<Docs />)}`, { overwrite: true });

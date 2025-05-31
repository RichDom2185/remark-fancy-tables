import { Colspan } from "./components/features/colspan";
import { Headerless } from "./components/features/headerless";
import Page from "./components/page";

export const Docs = () => (
  // TODO: Add page description
  <Page title="Remark Fancy Tables" description="">
    <h1>Remark Fancy Tables</h1>
    <h2>Features</h2>
    <h3>1. Headerless Tables</h3>
    <Headerless />
    <h3>2. Column Span and Row Span</h3>
    <h4>Column Span</h4>
    <Colspan />
  </Page>
);

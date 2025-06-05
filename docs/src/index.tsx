import { Alignment } from "./components/features/alignment";
import { Colspan } from "./components/features/colspan";
import { Headerless } from "./components/features/headerless";
import { Rowspan } from "./components/features/rowspan";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import Page from "./components/page";
import { Showcase } from "./components/showcase";

export const Docs = () => (
  // TODO: Add page description
  <Page title="Remark Fancy Tables" description="">
    <Header />
    <main class="container p-6">
      <section className="content">
        <Showcase />
        <h2>Features</h2>
        <h3>1. Headerless Tables</h3>
        <Headerless />
        <h3>2. Column Span and Row Span</h3>
        <h4>Column Span</h4>
        <Colspan />
        <h4>Row Span</h4>
        <Rowspan />
        <h3>3. Individual Cell Alignment</h3>
        <Alignment />
        <h2>Additional styling</h2>
        <p>
          Keeping to the spirit of Markdown, in order to not make the syntax too
          complicated, style-related syntax is limited to table cell alignment
          only.
        </p>
        {/* TODO: Add issue tracker URL */}
        {/* <p>Having said that, you are welcome to request for features in the issue tracker.</p> */}
        <p>
          Regardless, in order to facilitate additional styling, the plugin also
          provides a <code>data-nth-cell</code> HTML attribute for each table
          cell (1-indexed), so you can style each individual cell using CSS/JS
          that way
        </p>
      </section>
    </main>
    <Footer />
  </Page>
);

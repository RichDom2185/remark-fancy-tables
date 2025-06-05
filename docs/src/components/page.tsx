import { html } from "hono/html";
import { FC, PropsWithChildren } from "hono/jsx";

type Props = {
  title: string;
  description: string;
};

const Page: FC<PropsWithChildren<Props>> = ({
  title,
  description,
  children,
}) => {
  return html`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="description" content="${description}" />
        <meta name="color-scheme" content="light dark" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bulma@1.0.4/css/bulma.min.css"
        />
        <title>${title}</title>
      </head>
      <body>
        ${children}
      </body>
    </html>`;
};

export default Page;

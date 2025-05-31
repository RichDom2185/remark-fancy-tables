import { html } from "hono/html";
import { FC, PropsWithChildren } from "hono/jsx";
import { Constants } from "../constants";

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
        <link href="${Constants.BASE_URL}/styles.css" rel="stylesheet" />
        <title>${title}</title>
      </head>
      <body>
        ${children}
      </body>
    </html>`;
};

export default Page;

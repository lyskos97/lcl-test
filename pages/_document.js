import Document, { Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
        });

      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <html>
        <Head>
          <title>LCL</title>
          <link rel="stylesheet" type="text/css" href="/static/normalize.css" />
          <link rel="stylesheet" type="text/css" href="/static/overrides.css" />
        </Head>
        <body>
          <Main />
          <div id="modal-root" />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default MyDocument;

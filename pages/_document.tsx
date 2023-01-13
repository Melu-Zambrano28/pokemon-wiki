import Document, { Head, Html, Main, NextScript } from 'next/document'

export default class _Document extends Document {
  render() {
    const setInitialThemeScript = `
    function getUserPreference() {
      if(window.localStorage.getItem('theme-preference')) {
        return window.localStorage.getItem('theme-preference')
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches
                ? 'dark'
                : 'light'
    }
    document.body.dataset.theme = getUserPreference();
  `
    return (
      <Html>
        <Head />
        <body>
          <script dangerouslySetInnerHTML={{ __html: setInitialThemeScript }} />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

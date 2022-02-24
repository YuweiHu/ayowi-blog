// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const codeTheme = require("prism-react-renderer/themes/vsDark");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Ayowi",
  tagline: "test",
  url: "https://ayowi-blog.netlify.app",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/open-book.png",
  organizationName: "YuweiHu", // Usually your GitHub org/user name.
  projectName: "ayowi-blog", // Usually your repo name.

  plugins: ["docusaurus-plugin-sass"],

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebar/sidebars.js"),
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        disableSwitch: true,
      },
      navbar: {
        title: "Ayowi",
        // logo: {
        //   alt: "Logo",
        //   src: "img/home.jpg",
        // },
        items: [
          {
            type: "doc",
            docId: "intro",
            position: "left",
            label: "Learning",
          },
          { to: "/blog", label: "Tech Blog", position: "left" },
          { to: "/portfolio", label: "Portfolio", position: "left" },
          { to: "/resume", label: "Resume", position: "left" },
          // { to: "/resume", label: "Resume", position: "right" },
          // {
          //   href: "https://github.com/facebook/docusaurus",
          //   label: "GitHub",
          //   position: "right",
          // },
          // {
          //   type: "search",
          //   position: "right",
          // },
        ],
      },
      prism: {
        defaultLanguage: "javascript",
        theme: codeTheme,
      },
    }),
};

module.exports = config;

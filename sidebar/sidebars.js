const you_dont_know_js_sidebar = require("./you_dont_know_js_sidebar");

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    {
      type: "doc",
      id: "intro",
      label: "雜記",
    },
    you_dont_know_js_sidebar,
  ],
};

module.exports = sidebars;

const you_dont_know_js_sidebar = require("./you_dont_know_js_sidebar");
const leetcode_sidebar = require("./leetcode_sidebar");
const front_end_interview_sidebar = require("./front_end_interview_sidebar");

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    {
      type: "doc",
      id: "intro",
      label: "雜記",
    },
    you_dont_know_js_sidebar,
    leetcode_sidebar,
    front_end_interview_sidebar,
  ],
};

module.exports = sidebars;

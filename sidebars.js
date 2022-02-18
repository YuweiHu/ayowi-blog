/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    {
      type: "doc",
      id: "intro",
      label: "前言",
    },
    {
      type: "category",
      label: "You Don't Know JS",
      items: [
        {
          type: "category",
          label: "CH1 - 導讀",
          items: [
            {
              type: "doc",
              label: "JavaScript 入門",
              id: "you-dont-know-js/ch1/js-rookie",
            },
          ],
        },
        {
          type: "category",
          label: "CH2 - 型別與文法",
          items: [
            { type: "doc", label: "型別", id: "you-dont-know-js/ch2/js-type" },
            { type: "doc", label: "值", id: "you-dont-know-js/ch2/js-value" },
            {
              type: "doc",
              label: "Natives",
              id: "you-dont-know-js/ch2/js-native",
            },
            {
              type: "doc",
              label: "強制轉型",
              id: "you-dont-know-js/ch2/js-coercion",
            },
            {
              type: "doc",
              label: "文法",
              id: "you-dont-know-js/ch2/js-grammar",
            },
          ],
        },
      ],
    },
  ],
};

module.exports = sidebars;

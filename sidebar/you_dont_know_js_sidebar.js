const you_dont_know_js_sidebar = {
  type: "category",
  label: "You Don't Know JS",
  items: [
    {
      type: "doc",
      label: "開始之前",
      id: "you-dont-know-js/js-intro",
    },
    {
      type: "category",
      label: "CH1 - 型別與文法",
      items: [
        { type: "doc", label: "型別", id: "you-dont-know-js/ch1/js-type" },
        { type: "doc", label: "值", id: "you-dont-know-js/ch1/js-value" },
        {
          type: "doc",
          label: "Natives",
          id: "you-dont-know-js/ch1/js-native",
        },
        {
          type: "doc",
          label: "強制轉型",
          id: "you-dont-know-js/ch1/js-coercion",
        },
        {
          type: "doc",
          label: "文法",
          id: "you-dont-know-js/ch1/js-grammar",
        },
      ],
    },
    {
      type: "category",
      label: "CH2 - 範疇與閉包",
      items: [
        { type: "doc", label: "何謂範疇", id: "you-dont-know-js/ch2/js-scope" },
      ],
    },
  ],
};

module.exports = you_dont_know_js_sidebar;

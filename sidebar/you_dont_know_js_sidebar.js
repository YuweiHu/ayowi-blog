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
};

module.exports = you_dont_know_js_sidebar;

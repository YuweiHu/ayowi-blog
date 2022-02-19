---
id: js-rookie
title: JavaScript 入門
---

## 前言

在開始這一系列 JS 介紹之前，我還是想從入門開始說，因為說是入門...但其實日常工作中有些特性是用不太到的，把這些不常用的特性、功能整理在這。

## 值與型別

JavaScript 有以下內建型別：

- number
- string
- boolean
- null
- undefined
- object
- symbol（ES6 引進）

JS 提供 typeof 運算子檢視每個值：

```js
const arr = [1, "1", true, null, undefined, { foo: 42 }];
const addOne = (x) => x++;
typeof arr[0]; // "number"
typeof arr[1]; // "string"
typeof arr[2]; // "boolean"
typeof arr[3]; // "object"
typeof arr[4]; // "undefined"
typeof arr[5]; // "object"
typeof arr; // "object"
typeof addOne; // "function"
```

:::caution
typeof null 確實是回傳 "object"！這是個 bug，不直覺到值得記在腦中。
:::

### 內建方法

各基本型別有內建方法使用，舉個例：

```js
const a = "you don't know js";
a.split(""); // ["you", "don't", "know", "js"]
```

這其實沒什麼好特別提的，有在使用 js 的開發者一定都算熟。

真正應該引起你好奇的是：<strong>為什麼基本型別可以用類似物件的方式呼叫方法？</strong> 答案是：<strong>JS 已經幫我們封裝好，你看到的 a 其實已經是所謂「物件包裹器」形式</strong>。

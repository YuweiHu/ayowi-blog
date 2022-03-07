---
id: js-type
title: 型別
---

JS 到底有沒有稱不稱的上有型別？很多紛爭，這裡不參戰，文章內容就還是以<strong>型別</strong>兩字敘述。

## 內建型別

JavaScript 有以下<strong>內建型別</strong>：

- number
- string
- boolean
- null
- undefined
- object
- symbol（ES6 引進）

:::note
除了 object 外都是基本型別值（primitives）
:::

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
typeof new Symbol(); // "symbol"
typeof addOne; // "function"
```

:::caution
typeof null 確實是回傳 "object"！這是個 bug，不直覺到值得記在腦中。
:::
:::caution
typeof 會回傳 "function"，容易讓人誤會函式是內建型別，But not！
:::
<strong>函式與陣列實際上都是物件</strong>，這算是一個蠻重要的概念，可以將他們想成是物件的<strong>子型別</strong>。

## 作為型別的值

非常重要的一個觀念：<strong>在 JS 中，變數沒有型別，只有值有型別！</strong>（這也是 JS 型別之爭的主要爭論之處）

```js
var a = "ayowi";
typeof a; // string
a = true;
typeof a; // boolean
```

### 未定義(undefined) vs. 未宣告(undeclared)

```js
var a;
a; // undefined
b; // Uncaught ReferenceError: b is not defined
typeof b; // "undefined"
```

<strong>undefined</strong> 在 JS 裡表示在可取用的範疇中已經宣告過但「當下」沒有值，<strong>undeclared</strong> 則是指未被宣告的變數。
而<strong> typeof b </strong>回傳<strong> undefined </strong>實在很容易令人混淆，因為變數 b 實際上是未宣告而非未定義，如果能回傳 <strong>undeclared</strong>真的是比較好...。

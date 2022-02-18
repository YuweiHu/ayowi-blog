---
slug: import-lodash
title: 請用正確的姿勢進來...如何 import lodash？
author: Cliff Hu
author_title: Cliff Hu
tags: [tree shaking, lodash]
---

## 懶人包

```jsx
// Not to write this!
import _ from "lodash";
import { isEmpty } from "lodash";
// Write like this!
import isEmpty from "lodash/isEmpty";
```

<!-- truncate -->

## 前言

在網頁技術發展蓬勃的現在，前端效能顯著的影響使用者體驗，那句都市傳說是這樣說的...

> **40% of consumers will leave a page that takes longer than three seconds to load.**

關於前端效能的優化，常常是不可忽略的一部份，然而效能優化可以分很多面向進行，根據不同狀況有不同的優化方式，包含使用**快取（cache）**、**動態載入（dynamic import）**等...族繁不及備載，這裡推薦一篇我認為非常有收獲的[文章](https://medium.com/starbugs/%E4%BB%8A%E6%99%9A-%E6%88%91%E6%83%B3%E4%BE%86%E9%BB%9E-web-%E5%89%8D%E7%AB%AF%E6%95%88%E8%83%BD%E5%84%AA%E5%8C%96%E5%A4%A7%E8%A3%9C%E5%B8%96-e1a5805c1ca2)。每一項前端效能優化都是一個大主題，可以講的東西非常多，這篇文章暫時先把注意力放在「**如何發揮 Tree Shaking 優勢，縮小應用程式的 bundle size**」，並以熱門前端函式庫 [Lodash](https://lodash.com/) 為例，探討優化前後的 bundle size 差異。

## import lodash 的正確用法？

提及 Lodash，撰寫過 JavaScript 的夥伴們應該多少有使用過，這篇文章主要想帶大家探討，該怎麼 import lodash 最好（a.k.a. bundle size 最小），後續能衍生成「該怎麼引入第三方套件是最好的」。

開始之前，先來看看常見的 import 語法：

```jsx
// Method 1
import _ from "lodash";
// Method 2
import { isEmpty } from "lodash";
// Method 3
import isEmpty from "lodash/isEmpty";
```

以上三種方式都是能正確引入 lodash 的寫法，但我們用 bundle 視覺化工具 [webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer) 來觀察一下其中的差異：

Method 1 與 Method 2 lodash.js 的 bundle 大小約為 **542.28KB**

![](/img/blog/import-lodash-0.png)

Method 3 約為 **45.86KB**

![](/img/blog/import-lodash-1.png)

欸修但幾勒，怎麼我只是要 import lodash 裡面一個函式，不同的引入方法讓 bundle size 相差將近 12 倍？一段語法的差異不知不覺中影響了效能，這似乎有點恐怖...

但在繼續解釋之前，先來介紹一個重要的關鍵字 — Tree Shaking。

## Tree Shaking

到底什麼是 Tree Shaking？其實 Tree Shaking 取名非常直接，如同字面上意思...把**樹（tree）**上**沒用的果實（fruit）搖（shake）**乾淨的過程，把程式碼想像成是樹，沒用的果實想成**無用模組（dead module）**，所以...

![](/img/blog/import-lodash-2.gif)

> **Tree Shaking 就是一種消除 dead module 的演算法**

要談 Tree Shaking 我們可以先來聊聊你可能已經知道的 **[DCE（Dead Code Elimination）](https://en.wikipedia.org/wiki/Dead_code_elimination)**，一種編譯最佳化的技術，用來除去對程式執行結果沒有任何影響的程式碼。而 Tree Shaking 是 DCE 的一種實作，只是更專注於「**無用模組**」的消除，依賴 ES6 module 靜態匯入、匯出的特性來達到最佳化的過程。

現在你可能已經知道 Tree Shaking 了，但這跟 import lodash 到底有什麼關係？關鍵就在 [lodash 專案 README.md](https://github.com/lodash/lodash/blob/master/README.md) 第一行：

> **The Lodash library exported as a UMD module.**

這裡出現另外一個關鍵字 — UMD，**UMD（Universal Module Definition）**是一個 JavaScript 的**模組規範**，與**commonJS**、**AMD**、**CMD**、**ES6 module** 一樣，想了解更多可以參考這篇[文章](https://www.gushiciku.cn/pl/gb5B/zh-tw)。

簡單來說，因為 lodash 使用 UMD 模組規範，未使用 ES6 內建的模組規範，而 Tree Shaking 的原理是根據 ES6 module 的靜態結構特性，所以 lodash 自然是享受不到 Tree Shaking 帶來的好處。

這又是另外一個時間序的問題了... lodash 在 npm 上 v0.1.0 是九年前發布的，而 ES6 是在 2015 年發布...又再一次證明太過時的函式庫很有可能享受不到新時代的好東西，如果有相關較新的函式庫可以使用，應該要慎重考慮替換。

## 總結

介紹完 Tree Shaking，可以總結的說：

> **因為 lodash 是根據 UMD 模組規範設計的函式庫，如果不用正確的方式匯入的話，會因為無法享有 ES6 module 靜態結構才有的 Tree Shaking 而導致 bundle size 過大，進而影響前端效能、使用者體驗。**

## 參考資料

- [Optimization of Lodash styling and bundle size](https://technotes.khitrenovich.com/optimization-of-lodash-styling-and-performance/)
- [如何正確的 import lodash](https://medium.com/starbugs/the-correct-way-to-import-lodash-libraries-bdf613235927)
- [TreeShaking 性能優化實踐原理篇](https://codertw.com/%E7%A8%8B%E5%BC%8F%E8%AA%9E%E8%A8%80/722589/)

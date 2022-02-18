---
slug: moment-vs-dayjs
title: 淺談 JavaScript 時間處理函式庫 Moment.js 應該被淘汰的理由
author: Cliff Hu
author_title: Cliff Hu
tags: [moment, dayjs]
---

## 懶人包

1. 新專案不應該繼續使用 Moment.js。
2. [Luxon](https://moment.github.io/luxon/docs/manual/moment.html) / [Day.js](https://day.js.org/) / [date-fns](https://date-fns.org/) / [js-Joda](https://js-joda.github.io/js-joda/) 都是官方推薦的替代選擇，若習慣 Moment.js 可以優先考慮 Day.js。

<!-- truncate -->

## 前言

每一年都有新的程式語言、框架、函式庫產生，讓人們可以透過更新更方便的技術開發產品，而網頁技術發展速度之快，讓許多可能十年前紅極一時、非常好用的專案在現今會造成許多困擾，我想 [Moment.js](https://momentjs.com/) 就是最典型的例子。

Moment.js 這個在 2011 年開發出來的 JavaScript 函式庫放到 2021 年，已經是非常過時的存在，儘管功能全面所以在各種專案中出現，但現今講求使用者經驗、程式可讀性的年代，Moment.js 本質上有著兩個無法被除去的缺陷存在 — **bundle size 過大** 以及 **moment object 是可變動（mutable）的**。

## Moment.js 兩大缺點

### Bundle Size 太大

Moment.js 作為一個專案真的是太肥了...[肥到連 Chorme Dev Tools 都嫌](https://twitter.com/addyosmani/status/1304676118822174721)！

![](/img/blog/moment-vs-dayjs-0.png)

把各種專案放在一起比較，完整的展現 Moment.js 的肥大之處（？更別說主打輕量的 dayjs 硬是比 moment.js 縮小了 33 倍！這對效能的影響不在話下，也難怪 Lighthouse 建議大家把 Moment.js 專案替換掉。

官方釋出的消息中提及了為何 Moment.js 專案如此肥大，主要是

1. 對於"Tree Shaking"的演算法沒有做很好地利用。
2. 處理時區時引入的 time-zone 讓專案更加龐大。

而在 2012/December 釋出的 [ECMA-402](https://402.ecma-international.org/1.0/#sec-8) 引入 [Intl](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl) 物件對 i18n 以及 time-zone 的支持更好，但 2011 年出生的 Moment.js 沒機會享受到這個好處，也錯失能減肥的機會（謎之音：一出生就是個胖子？）

### Moment Object Mutable

[Clean Code](https://github.com/ryanmcdermott/clean-code-javascript) 中提及的 "Avoid Side Effect" 其實重重的搧了 Moment.js 專案一巴掌，在 Moment.js 所提供的 API 中都是 Mutable 的，[官方文件](https://momentjs.com/guides/#/lib-concepts/mutability/)也有說明這件事情。若不知道 mutable/immutable 差異可以參考這邊[文章](https://www.codementor.io/@manik488/mutability-vs-immutability-in-javascript-1g9hwoeddd)。

雖然熟悉 Moment.js 的老時間管理大師們用久了應該不會覺得困擾，但對新手來說總是會有 "Surprise mother fucker" 的時候出現。

老時間管理大師們會用 clone 避免 side effect 的問題：

![](/img/blog/moment-vs-dayjs-1.png)

而菜雞們會這樣領悟吃蟲的樂趣：

![](/img/blog/moment-vs-dayjs-2.png)
typo: "2016-01-08T00:00:00+08:00"

雖然所有事情都是一回生二回熟，多吃幾條蟲總是能成長茁壯，但回歸 Moment.js 這個專案來說，確實在設計這個函式庫的時候就應該以 Immutable 的概念開始比較恰當。至於為何要使用 mutable？維護團隊其中一人 Maggie 有發表意見，可以參考[這裡](https://maggiepint.com/2016/06/24/why-moment-js-isnt-immutable-yet/)。

在上述兩項提及的缺點，幾年前或許都瑕不掩瑜，畢竟 Moment.js 所提供的功能太完整。其他時間函式庫可能解決了 Moment.js 的短處，但在功能完整性方面遠不及 Moment.js，這也是 Moment.js 至今還有一席之地的原因。

## 替代專案

但到了時間函式庫百家爭鳴的 2021（？Moment.js 承認自己是個容易出錯的胖子，長江後浪推前浪，也該是退休的時候了...

Moment.js 在官方文件中欽點了四位年輕人，也列出了選擇接班人的條件：

1. 要分成小包套件，在引入時使用者能夠根據想使用的 API 做取捨。
2. 要使用 ECMAScript 提供的 Intl API 處理 locale / time-zone。
3. 仍然保有自己的 locale / time-zone 檔案。

這四位年輕人分別是：[Luxon](https://moment.github.io/luxon/docs/manual/moment.html) / [Day.js](https://day.js.org/) / [date-fns](https://date-fns.org/) / [js-Joda](https://js-joda.github.io/js-joda/)

而這裡私心推薦 — Day.js！
Day.js 解決了 Moment.js 的缺點，有著非常輕量的 size、immutable 的特性，更重要的是，語法、函式的相似性，幾乎可以讓使用者無痛從 Moment.js 轉向 Day.js 的懷抱。舉例來說：

```jsx
// format 用法
moment().format(); // 2021-06-30T22:23:30+08:00
dayjs().format(); // 2021-06-30T22:23:30+08:00

// set 用法
moment().set("hour", 8); // 2021-06-30T08:23:30+08:00
dayjs().set("hour", 8); // 2021-06-30T08:23:30+08:00

// add 用法
moment().add(7, "day"); // 2021-07-07T22:23:30+08:00
dayjs().add(7, "day"); // 2021-07-07T22:23:30+08:00
```

以上常見用法，Day.js 與 Moment.js 有著高度相似，以我一個一直以來都使用 Moment.js 的重度使用者來說，幾乎沒有轉換上的困擾...除了時區的應用！

時區的處理在網頁技術領域總是避免不了的，讓我們來看一下 Moment.js 和 Day.js 處理時區上的差異：

```jsx
import moment from "moment";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import "moment-timezone";

const renderTzresult = () => {
  dayjs.extend(timezone);
  console.log(moment().tz("America/New_York").format());
  // 2021-07-01T10:42:12-04:00
  console.log(dayjs().tz("America/New_York").format());
  // 2021-07-01T10:42:12-04:00
};
```

由程式碼可以觀測到一件事情，Day.js 中要另外 extend plugin 去處理時區問題，明顯比 Moment.js 多一個步驟，在撰寫程式碼的時候要特別留意。

## 總結

Moment.js 是時代的眼淚，是時候替換成年輕世代的時間函式庫了！如果正要啟動新專案，不妨試試更輕巧的選擇，讓前端效能有感提升！

## 參考資料

- [Moment.js Project Status](https://momentjs.com/docs/#/-project-status/)
- [ECMA - 402](https://402.ecma-international.org/1.0/#sec-8)
- [Dayjs](https://day.js.org/)

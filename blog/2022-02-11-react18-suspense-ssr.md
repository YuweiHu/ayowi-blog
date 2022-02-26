---
slug: reacr18-suspense-ssr
title: React 18 - Suspense In SSR
author: Cliff Hu
author_title: Cliff Hu
tags: [react, suspense, SSR]
---

## 前言

上篇文章提到 Suspense 在 React 18 出世後對前端的影響，這篇就來談談 Suspense 概念如何涉及**後端領域**。

<!-- truncate -->

## Suspense 應用在 Streaming Server Rendering

如前面所述，Suspense 不只能應用在前端，React team 對 SSR 也是有一些想法。開始之前我們先來談談所謂**客戶端渲染(CSR)**以及**伺服器端渲染(SSR)**。

### 客戶端渲染(CSR) vs. 伺服器端渲染(SSR)

![](/img/blog/react18-suspense/6.png)
所謂**客戶端渲染**就是在你點開網頁的一開始就把所有東西載下來，這樣你做的操作都會是在自己電腦進行，使用者體驗會比較好(不需要持續跟遠端伺服器要檔案所以比較快)，**除了首次載入頁面的時候**。<br/>
客戶端如果**網速慢**或**JS 檔案太大**，在呈現第一個畫面以前，前端會卡住呈現空白頁面（~~然後客戶就開始靠北~~）。

簡單來說，客戶端渲染相較於伺服器端渲染

- 優勢：使用者體驗較佳。
- 劣勢：首次打開網頁速度需要各種載入，速度較慢。

![](/img/blog/react18-suspense/7.png)

那伺服器端渲染的優劣勢呢？客戶端在向伺服器要檔案時，伺服器會先丟「**假的**」 HTML 檔給客戶瀏覽器呈現，為何說是假的？因為它**只可遠觀不可褻玩**。換句話說，你看的到頁面，但你不能跟他互動，你點擊你看到的頁面上的任何按鈕都不會有反應，你看到的只是**假體**，在靈魂注入假體之前，它都不會動。

那**靈魂**在哪？在路上，從伺服器到你瀏覽器的路上。**靈魂就是 JS**，而 JS 檔案通常包含很多邏輯操作，所以檔案龐大，也才會運送的慢，而等到 JS 送到瀏覽器後，我們把 JS 「**注入**」原先假體 HTML 的過程稱之為 **hydrate**，一但這個步驟完成，網頁就能如你預期的跟你互動了！

簡單來說，伺服器端渲染相較於客戶端渲染

- 優勢：第一次載入畫面的體驗較佳（因為你可以先看到假的 HTML）。
- 劣勢：在網頁上的操作都要跟伺服器溝通，成本較高。

### SSR 運用 Suspense 範例

簡單介紹完 CSR 與 SSR 的差異，讓我們直接看個案例解釋 Suspense 在 SSR 裡的作用。

![](/img/blog/react18-suspense/8.png)

![](/img/blog/react18-suspense/9.png)

#### fetch everything before u can show anything

你一定要拿完資料才能渲染頁面（啊不然勒？）

這是你面臨了選擇：

- 等 comment 資料回來 → 不好 因為要等很久 空白畫面會卡住
- comment 太肥，放生 → 也不好，使用者就是想要 comment 阿你讓我看不到？

#### load everything before u can hydrate everything

![](/img/blog/react18-suspense/19.png)

loading 完拿到 HTML，等 JS 拿到 準備 hydrate，但有個問題，hydrate 只能一次

OK 於是你再次面臨選擇：

- 等 comment 跑完再 hydrate → 不好，這表示使用者可以看到 comment 但不能操作
- 分開載入 → 也不好，因為這樣在 HTML render 時就要拿掉 comment，不然 comment 的 JS 會不知道要 hydrate 到哪

#### hydrate everything before u can interact with everything

你要 hydrate 完才能跟使用者互動，hydrate 只能一次，這會有許多限制

![](/img/blog/react18-suspense/18.png)

### React 18 發功...

來，React 幫你處理。

![](/img/blog/react18-suspense/10.png)

怎麼做？Suspense 包起來一切都處理好了。

![](/img/blog/react18-suspense/11.png)

![](/img/blog/react18-suspense/12.png)

React 18 包含兩大 feature：

- Streaming HTML
  ![](/img/blog/react18-suspense/13.png)
  ![](/img/blog/react18-suspense/14.png)
  ![](/img/blog/react18-suspense/15.png)

  解決第一個問題
  ![](/img/blog/react18-suspense/16.png)

  解決第二個問題

- Selective Hydration
  解決第三個問題
  ![](/img/blog/react18-suspense/17.png)

## 參考資料

- [React Conf 2021 Recap](https://zh-hant.reactjs.org/blog/2021/12/17/react-conf-2021-recap.html)
- [Streaming Server Rendering with Suspense](https://youtu.be/pj5N-Khihgc)
- [React 18 Keynote](https://youtu.be/FZ0cG47msEk?t=412)

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

簡單介紹完 CSR 與 SSR 的差異，讓我們直接看個案例解釋 Suspense 在 SSR 裡的作用。先想像以下的程式碼：

```jsx
<Layout>
  <NavBar />
  <Profile />
  <Panel>
    <Posts />
    <Comments />
  </Panel>
</Layout>
```

畫面呈現大致會向下方這樣：

![](/img/blog/react18-suspense/9.png)

你可以先簡單想成是一個類似 Facebook 的應用程式，而在這幾個元件中，可以想見 `<Comments />` 是佔用最多資源的部分，留言區總是有許多留言、按讚數...等，涉及的程式邏輯也較為複雜。
好，接下來一起來看看 SSR 面臨的困境，主要有以下三點：

#### 1. 拿完資料才能呈現

感覺是一句廢話...沒資料怎麼呈現？肯定是要先拿資料對吧。那問題來了！`<Comments />` 因為資料龐大，在獲取過程要非常久，這怎麼辦？於是你面臨了選擇：

- 等 `<Comments />` 資料回來？ → 不好，因為要等很久！空白畫面會卡住讓使用者不高興...。
- `<Comments />` 太龐大，放生？ → 也不好，因為使用者使用這個 app 就是想要 `<Comments />` 的功能，把 `<Comments />` 捨棄有點本末倒置。

#### 2. 下載完成才能 hydrate

還記得上面說「**假體**」與「**靈魂**」的關係嗎？必須將**靈魂(JS)**下載完成才能一次性灌入**假體(HTML)**。但因為 `<Comments />` 靈魂牽扯較多複雜邏輯，會比較大包，所以有可能會其他部分都已經下載好，但還要等 `<Comments />` 的狀況，如下圖：
![](/img/blog/react18-suspense/19.png)

OK...於是你再次面臨選擇：

- 等 `<Comments />` 跑完再 hydrate → 不好，這表示使用者可以看到 `<Comments />` 但不能互動。
- 分開載入 → 也不好，因為 hydrate 只能一次到位，要分開載入意味著一開始的 HTML 檔就要捨棄 `<Comments />`，這感覺類似...你給的假體少了右手...但使用者進來這個 app 是想看右手的啊...你的右手不但沒靈魂還斷掉了...使用者肯定不開心。

#### 3. hydrate 完成才能互動

你要 hydrate 完才能跟使用者互動，但 hydrate 只能一次，所以整個 app 會被佔用資源最重的元件決定要花多久時間 hydrate 完成。

### React 18 發功...

來，看到上面三個問題很煩惱嗎？React 18 幫你處理。怎麼做？先公佈答案：`<Suspense />` 包起來一切都處理好了。

```jsx
<Layout>
  <NavBar />
  <Profile />
  <Panel>
    <Posts />
    <Suspense fallback={<Spinner />}>
      <Comments />
    </Suspense>
  </Panel>
</Layout>
```

那實際上 React 18 是怎麼解決的？透過兩個 features 來處理 - **Streaming HTML** / **Selective Hydration**

- **Streaming HTML**
  ![](/img/blog/react18-suspense/15.png)
  加入 `Suspense` 後讓 `spinner` 先代替 `comments` 出現在前端！
  這樣就解決第一個問題！不用拿完資料再呈現。

  ![](/img/blog/react18-suspense/16.png)
  React 18 讓每個 hydrate 獨立進行，不需要等到全部下載完成！
  解決第二個問題。

- **Selective Hydration**
  ![](/img/blog/react18-suspense/17.png)
  React 18 能根據使用者點擊來決定 hydrate 先後順序！
  解決第三個問題！可以選擇性 hydrate 來決定 app 哪個部分要先跟使用者互動。

## 結語

以上 React 18 兩大特性用來解決傳統 SSR 的問題，主要還是歸功於 React 18 把 **concurrent mode** 的特性發揚光大，以前要「瀑布式」一個階段一個階段進行的步驟被拆分成獨立進行，期待 React 18 release 上線後對 SSR 的正面影響。

## 參考資料

- [React Conf 2021 Recap](https://zh-hant.reactjs.org/blog/2021/12/17/react-conf-2021-recap.html)
- [Streaming Server Rendering with Suspense](https://youtu.be/pj5N-Khihgc)
- [React 18 Keynote](https://youtu.be/FZ0cG47msEk?t=412)

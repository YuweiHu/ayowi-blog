---
slug: reacr18-suspense
title: React 18 - Suspense
author: Cliff Hu
author_title: Cliff Hu
tags: [react, suspense]
---

## 前言

以我自己的 React 開發經驗來說，因為剛好是在 React Hook 出世時開始摸索，所以算是剛好跟上不錯的學習時機，兩年多來在 React 技術方面沒有什麼太大的瓶頸，主要也歸功於 React 16 和 17 沒有什麼太大的變化。
話是這麼說，但 React Team 早就默默的將 React Fiber 相關特性移入 React 內，雖然 Hook 已經是 React Fiber 帶來的影響之一了，但 React Fiber 一直還沒完全展現 **concurrent feature** 的完整功能，而是準備在 React 18 大展身手。
時至今日，React 18 RC 已經在 React Conf 2021 釋出，React 18 也蠢蠢欲動，準備迎來一波大更新。

<!-- truncate -->

## Suspense

一句話描述 Suspense 想要帶來的好處：

> Read data over the network as easily as props or state

React team 希望將透過 Suspense 讓**資料交換**更容易達成。開始之前先來看看一些常見的寫法：

```jsx
const List = ({ patientId }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await callApi(patientId);
      setData(result);
      setIsLoading(false);
    };
    fetchData();
  }, [patientId]);

  return isLoading ? <LoadingPage /> : <List />;
};
```

在不依靠獲取資料相關的函式庫，寫起來會像上面一樣，用一個 state 控制 API 返回的資料，另一個 state 控制當前頁面的呈現：是否正在獲取資料？如果是的話呈現一個 loading page，否則呈現畫面。
以上的程式碼如果引進 data fetching library，像是 [Apollo](https://www.apollographql.com/docs/react/)、[SWR](https://swr.vercel.app/)、[React Query](https://react-query.tanstack.com/)，會讓可讀性更高，也能更直覺的從上到下閱讀程式碼：

```jsx
const List = ({ patientId }) => {
  const [data, isLoading] = useData(patientId);

  return isLoading ? <LoadingPage /> : <List />;
};
```

這其實在有個一兩年 React 相關經驗的工程師眼裡，已經非常根深柢固，不需要花太多心思就能撰寫、閱讀。

### 兩大痛點

React team 顯然覺得還能更好，React team 覺得有兩個痛點是他們想要解決的：

1. Changing data dependencies

   如果要在任意 component 新增 data fetching，你必須重新思考 loading 狀態，要更動的程式碼相對來說多出不少。

   ![](/img/blog/react18-suspense/1.png)

2. Changing visual loading states

   反過來說，如果想將 loading 邏輯拉抬到父元素，你必須更動大量的程式碼。

   ![](/img/blog/react18-suspense/2.png)

   ![](/img/blog/react18-suspense/3.png)

### 怎麼做？

說了這麼多，那到底怎麼做？
Suspense 終於要登場了，React team 認為將獲取資料與呈現 loading 邏輯分開會是一個好的解法。
而 Suspense 最直覺好用的處理是將其置入 JSX 中，在 Suspense 包覆之下的元件尚未準備好之前，會返回 fallback 所呈現的元件。
data fetching library 為了這個理念也將移除 isLoading，由 React 開發維護的 Relay 將在 React 18 發布第一天支援，而其他開源專案將持續與 React 合作，進而支援 Suspense 相關功能。

![](/img/blog/react18-suspense/4.png)

### Suspense 更多可能

其實早在 React 18 之前就已經有 Suspense 概念實踐，用於 code splitting 的前端效能優化可以看見 React.lazy 搭配 Suspense 的成果，但在 React 18 將 Suspense 的想法更廣泛的執行，其中也包含 SSR 的範疇。
接下來 Suspense 的發展，如同上述所說，會將重心放在跟開源社群合作，如果想要早早體驗 Suspense 帶來的益處，可以考慮搭配 Relay。

![](/img/blog/react18-suspense/5.png)

## 參考資料

- [React Conf 2021 Recap](https://zh-hant.reactjs.org/blog/2021/12/17/react-conf-2021-recap.html)
- [React 18 Keynote](https://youtu.be/FZ0cG47msEk?t=412)

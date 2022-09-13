---
id: React
title: React Interview Questions
---

1. 為什麼 React 渲染列表時需要加上 key？
   - React 用 key 來判斷節點需不需要重新渲染。有了 key 這個辨識機制，React 就會知道在新的一次渲染時，原本的狀態應該被保留在列表中的哪一個元件中。因此，React 之所以需要 key，正是因為 key 可以讓 React 知道，哪些子元件被新增、 移除，或是修改。

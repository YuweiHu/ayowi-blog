---
id: HTML
title: HTML Interview Questions
---

1. `doctype` 做什麼用的？

   - 宣告該 HTML 的樣子，讓瀏覽器知道要把該檔案當成什麼來讀。舉例來說，最常見的 `<!DOCTYPE html>` 就是宣告該檔案是適用 HTML 5 的規範。較舊的規範，例如 HTML 4 或是 XHTML 會有其他的宣告方式。
     :::note
     `<!DOCTYPE>` 宣告式與大小寫無關(NOT case sensitive)。例如`<!DOCTYPE html>`與`<!DocType html>`具有同樣效果。
     :::

2. **標準模式**（standards mode）和**怪異模式**（quirks mode）有什麼不同？

   - 目前瀏覽器的排版引擎有三種模式：**怪異模式**（Quirks mode）、**接近標準模式**（Almost standards mode）、以及**標準模式**（Standards mode）。在怪異模式，排版會模擬 **Navigator 4** 與 **Internet Explorer 5** 的非標準行為。為了支持在網路標準被廣泛採用前，就已經建置好的網站，這麼做是必要的。在標準模式，行為（期待）由 HTML 與 CSS 的規範描述起來。在接近標準模式，有少數的怪異行為被實行。

3. 使用 XHTML 有什麼限制？?

   XHTML 是一種 XML 的應用，可以視為 HTML + XML 的一種技術。撰寫上有一些準則，相較之下比 HTML 嚴謹。

4. 如果網頁使用 `application/xhtml+xml` 會有問題嗎？

   一些老瀏覽器會不相容。

5. 你怎麼做一個需要支持多國語言的網頁？

   使用 HTML `lang` 屬性。

6. 當開發和設計一個多國語言網站時，有什麼需要小心的？

   - 有些語言（像阿拉伯文）閱讀順序是反過來的，需注意。
     解法：用 HTML 的 `dir` 屬性決定文字排列是右到左還是左到右。
   - 有些語言（像泰文）一個句子中是沒有空格的，要注意跑版問題。

7. `data-` 屬性的好處在哪？

   `data-` 屬性可以將 HTML 標籤賦予許多特性，即使是普通的 HTML 元素也能變成複雜而強大程式物件。像是：

```html
<img
  class="spaceship cruiserX3"
  src="shipX3.png"
  data-ship-id="324"
  data-weapons="laserI laserII"
  data-shields="72%"
  data-x="414354"
  data-y="85160"
  data-z="31940"
  onclick="spaceships[this.dataset.shipId].blasted()"
/>
```

8. 考慮 HTML5 作為一個開放式的網站平台，組成 HTML5 的技術有哪些？

   - 廣義論及 HTML5 時，實際指的是包括 HTML、CSS 和 JavaScript 在內的一套技術組合。

9. 請描述 `cookies`, `sessionStorage` 和 `localStorage` 的不同？

   [連結](https://iter01.com/474585.html)

10. 什麼是漸進式呈現（Progressive Web Application）？

    [連結](https://ithelp.ithome.com.tw/articles/10215567)

11. 有用過 HTML 樣板語言（template languages）嗎？

    - 在 React 中使用 JSX 算是其中一種，常見的還有 EJS（Embedded JavaScript），也曾經撰寫過 Email template 使用 handlebars。

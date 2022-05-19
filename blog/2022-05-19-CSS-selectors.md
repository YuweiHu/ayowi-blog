---
slug: CSS-selectors
title: CSS 選擇器簡述
author: Cliff Hu
author_title: Cliff Hu
tags: [CSS, selector]
---

## 前言

前端寫久了，發現 CSS 最常忘記的就是選擇器（selector）的使用，想用一篇文章紀錄一下完整的理解。

<!-- truncate -->

## 基本選擇器 (Basic Selectors)

### 通用選擇器（Universal selector）

用以選擇所有元素。
語法:

```css
* {
  color: red;
}
```

### 標籤選擇器（Type selector）

用以選擇所有符合指定標籤的元素。
語法:

```css
input {
  color: red;
}
```

### 類別選擇器（Class selector）

用以選擇所有符合指定 class 屬性值的元素。
語法:

```css
.className {
  color: red;
}
```

### ID 選擇器（ID selector）

用以選擇指定 id 屬性值的元素。
語法:

```css
#idName {
  color: red;
}
```

### 屬性選擇器（Attribute selector）

用以選擇所有符合指定屬性的元素。
語法:

```css
/* <a> elements with a title attribute */
a[title] {
  color: purple;
}

/* <a> elements with an href matching "https://example.org" */
a[href="https://example.org"]
{
  color: green;
}

/* <a> elements with an href containing "example" */
a[href*="example"] {
  font-size: 2em;
}

/* <a> elements with an href ending ".org" */
a[href$=".org"] {
  font-style: italic;
}

/* <a> elements whose class attribute contains the word "logo" */
a[class~="logo"] {
  padding: 2px;
}
```

## 分組選擇器 (Grouping Selectors)

### 選擇器列表（Selector list）

用以將不同的選擇器組合起來的一種方法。
語法:

```css
div,
span {
  color: red;
}
```

## 組合選擇器 (Combinators)

組合選擇器是我個人比較容易忘記的...有以下幾個：

### 後代選擇器（Descendant combinator）

用以選擇某個元素後代的元素。
語法:

```css
span {
  background-color: white;
}
div span {
  background-color: DodgerBlue; /* 會 apply 到 div 內的 span */
}
```

### 子代選擇器（Child combinator）

用以選擇某個元素後代的元素。
語法:

```css
span {
  background-color: blue;
}

div > span {
  background-color: yellow;
}
```

```html
<div>
  <span>
    <!-- blue -->
    Span #1, in the div.
    <!-- yellow -->
    <span>Span #2, in the span that's in the div.</span>
  </span>
</div>
<!-- yellow -->
<span>Span #3, not in the div at all.</span>
```

### 一般兄弟選擇器（General sibling combinator）

用以選擇某個元素『同階層』的元素.
語法:

```css
p ~ span {
  color: red;
}
```

```html
<span>This is not red.</span>
<p>Here is a paragraph.</p>
<code>Here is some code.</code>
<span>And here is a red span!</span>
<span>And this is a red span!</span>
<code>More code...</code>
<div>How are you?</div>
<p>Whatever it may be, keep smiling.</p>
<h1>Dream big</h1>
<span>And yet again this is a red span!</span>
```

### 相鄰兄弟選擇器（Adjacent sibling combinator）

選擇緊接在後的元素，並共享父元素。
語法:

```css
li:first-of-type + li {
  color: red;
}
```

```html
<ul>
  <li>One</li>
  <!-- red -->
  <li>Two!</li>
  <li>Three</li>
</ul>
```

## 偽選擇器（Pseudo selectors）

### 偽類別（Pseudo classes）

The : pseudo allow the selection of elements based on state information that is not contained in the document tree.
語法:

```css
a:link {
  color: blue;
} /* Unvisited links */
a:visited {
  color: purple;
} /* Visited links */
a:hover {
  background: yellow;
} /* Hovered links */
a:active {
  color: red;
} /* Active links */
```

### 偽元素（Pseudo elements）

The :: pseudo represent entities that are not included in HTML.
語法:

```css
.exciting-text::after {
  content: " <- EXCITING!";
  color: green;
}

.boring-text::after {
  content: " <- BORING";
  color: red;
}
```

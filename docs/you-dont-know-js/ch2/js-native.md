---
id: js-native
title: Natives
---

## 常用 Natives

- String()
- Number()
- Boolean()
- Array()
- Object()
- Function()
- RegExp()
- Date()
- Error()
- Symbol()

Natives 有點像是<strong>建構器（constructor）</strong>，但建構出來的東西跟其他語言有點不同。

```js
var a = new String("abc");
typeof a; // 是"object"不是"sting"
a instanceof String; // true
```

:::note
instanceof 用來檢測 prototype 屬性是否出現在某個實例的原型鏈上。
:::
`new String("abc")` 建立了一個字串包裹器物件，包裹了`"abc"`，而非只是建立`"abc"`的基型值。

### Internal [[Class]]

`typeof` 為 `"object"` 的那些值，會額外標示一個內部[[Class]]特性。這特性通常不能被取用，但可以這樣硬拿：`Object.prototype.toString.call(..)`

```js
Object.prototype.toString.call([1, 2, 3]); // "[object Array]"
Object.prototype.toString.call(null); // "[object Null]"
Object.prototype.toString.call(undefined); // "[object Undefined]"
```

可以注意到，雖然 null 和 undefined 的原生建構器都不在，但 [[Class]] 揭露出來的就是 `Null` 和 `Undefined`。

## 封裝用的包裹器

基本型別值沒有特性或方法，所以要存取內建方法需要經過<strong>「封裝」</strong>，這部分 JS 會自動幫我們處理（這包含一些最佳化的部分，所以沒事不要自己封裝基型值，反而會拖效能）。

```js
const a = new String("abc"); // Don't do this!
const b = "abc"; // Write like this!
```

### 物件包裹器的陷阱

```js
var a = new Boolean(false);
console.log(!a); // false
```

意外嗎？其實還好。可以想見透過物件包裹器產生的是**物件**，所以`!a`會是`false`（物件是 **truthy**）。

### 解封裝

如果你想從取出底層基型值可以使用`valueOf()`方法。

```js
var a = new Number(1);
a.valueOf(); // 1
```

解封裝行為可能配合**強制轉型**隱含地發生。

```js
const a = new String("abc");
const b = a + "";
typeof a; // "object"
typeof b; // "string"
```

## 作為建構器的 Natives

### Array(..)

- Array 建構器可以不加 `new` 關鍵字
  ```js
  const a = new Array([1, 2, 3]);
  a; // [1, 2, 3]
  const b = Array([1, 2, 3]);
  b; // [1, 2, 3]
  ```
- Array 建構器只傳入一個 number N，會建構出長度 N 的空槽（empty slot）陣列。書中描述許多特殊狀況，這裡不細談，但盡量不要使用這種方式建立陣列。我自己曾在實務中為了建立一個有序等差數列而使用過，這裡特別記錄一下：
  ```js
  const a = new Array(10).fill(0).map((item, index) => index);
  a; // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  ```
  那如果沒有先呼叫 `fill` 方法呢？
  ```js
  const b = new Array(10).map((item, index) => index);
  b; // [empty x 10]
  ```
  非常詭異的邏輯，書中建議**任何情況下都不應該生成空槽陣列**。

### Date(..) & Error(..)

與其他建構器相比，Date(..) 和 Error(..) 有用多了。

- `new Date()` 是常見的生成時間物件做法，可以丟入有用的參數生成你想要的時間物件（但其實實務上在處理時間多數會使用函式庫，例如 dayjs）
- Error 通常在你想檢視錯誤時使用，常搭配 `throw`
  ```js
  const handleError = () => {
    try {
      // do sth.
    } catch (error) {
      throw new Error(error);
    }
  };
  ```

### 原生的原型（Native Prototypes）

每個內建的原生建構器（native constructors）都有自己的 `.prototype` 物件。`.prototype`可提供一些函式給建構出來的子型別使用。很饒口，直接舉個例：
`string` 物件及 `string primitives` 都能取用 `String.prototype` 的方法。

---
id: js-coercion
title: 強制轉型
---

## 隱性強制轉型 vs 顯性強制轉型

** 強制轉型(coercion)**依據明不明顯被作者分成兩種：**隱性**與**顯性**。

```js
var a = 1;
const b = a + ""; // "1" -> 隱性
const c = String(a); // "1" -> 顯性
```

## 抽象值運算

### ToString

- 基本型別會正常的字串化：`null` 變 `"null"`，`undefined` 變 `"undefined"`，`true` 變 `"true"`。
- 物件預設會回傳內部 [[Class]]，例如 [object Object]。（當然，如果你自己寫了 `toString` 方法，就會回傳該方法的結果）。
- Array 有一個覆寫的 `toString` 方法：
  ```js
  var a = [1, 2, 3];
  a.toString(); // "1,2,3"
  ```

### ToNumber

- 基本型別會轉成數字： `true` 變 `1`，`false` 變 `0`，`undefined` 變 `NaN`，`null` 變 `0`。
- 物件和陣列為先轉換成基本型別值，`ToPrimitive` 會先檢查目標是否有 `valueOf()` 方法，如果有而此方法回傳基本型別值，那就會強制轉型該值！如果沒有 `valueOf()` 就會看有沒有 `toString()` 。

  ```js
  var a = {
    valueOf: () => {
      return "42";
    },
  };
  var b = {
    toString: () => {
      return "42";
    },
  };
  var c = [4, 2];
  c.toString = () => {
    return this.join(""); // "42"
  };

  Number(a); // 42 -> 有 valueOf，轉換 valueOf 回傳的值
  Number(b); // 42 -> 有 toString，轉換 toString 回傳的值
  Number(c); // 42 -> 有 toString，轉換 toString 回傳的值
  Number(""); // 0
  Number([]); // 0
  Number(["abc"]); // NaN
  ```

### ToBoolean

- **非 falsy 即 truthy**
- falsy 值包含：**undefined** / **null** / **false** / **""** / **NaN** / **+0** / **-0**
- ```js
  var a = new Boolean(false);
  var b = new Number(0);
  var c = new String("");
  Boolean(a && b && c); // true -> 因為 a, b, c 都被物件包裹器包住了！所以都是物件！物件是 truth！
  ```

## 顯性強制轉型

### String <-> Number

- Number() / String() 這樣的形式都很明確，很清楚知道是想轉型成 number / string。
- ```js
  const a = "42";
  +a; // 42 -> 用 + 強制轉型成 number，這種用法 JS 社群普遍認為是顯性的
  ```

### \* -> Boolean

- boolean 顯性強制轉型很簡單，最常見就是 `Boolean()` 和 `!!`。
- 至於會轉型成 `true` 還是 `false`，看要轉型的是 `truth` 還是 `falsy`。

## 隱性強制轉型

### String <-> Number

### Boolean -> Number

### \* -> Number

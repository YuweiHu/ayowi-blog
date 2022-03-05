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
Number([]); // 0 -> array 有 toString 方法，[].toString = ""
Number(["abc"]); // NaN -> array 有 toString 方法，["abc"].toString = ""
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

- 如果 + 的任何一個運算元是 string，那就會進行 string 的加法，否則進行 number 的加法。
- ```js
  var a = {
    valueOf: () => {
      return 42;
    },
    toString: () => {
      return 4;
    },
  };
  a + ""; // "42" -> 隱性強制轉型，調用 toPrimitive -> 所以先調用 valueOf()
  String(a); // "4" -> 直接調用 toString()
  ```
- `-`, `*`, `/`, 這三個運算子只給 number 使用，所以要將 string 隱性強制轉型成 number，可以透過：
  ```js
  var a = "42";
  a - 0; // 42
  a * 1; // 42
  a / 1; // 42
  ```
- 如果是物件：
  ```js
  var a = [3];
  var b = [1];
  a - b; // 2
  // 因為 - 只能用於 number，所以兩個 array 先經過 toNumber ->
  // 陣列的 toNumber 怎麼做？先經過 toPrimitive，調用 array 的 toString
  // 再轉成 number 做減法！
  ```

## 寬鬆相等 vs. 嚴格相等

- `==`比較相等時允許強制轉型，而`===`不允許
- 比較規則詳閱以下

`ECMA-262 7.2.12`

````
1. ReturnIfAbrupt(x).
2. ReturnIfAbrupt(y).
3. If Type(x) is the same as Type(y), then
   a. Return the result of performing Strict Equality Comparison x === y.
4. If x is null and y is undefined, return true.
5. If x is undefined and y is null, return true.
6. If Type(x) is Number and Type(y) is String,
   return the result of the comparison x == ToNumber(y).
7. If Type(x) is String and Type(y) is Number,
   return the result of the comparison ToNumber(x) == y.
8. If Type(x) is Boolean, return the result of the comparison ToNumber(x) == y.
9. If Type(y) is Boolean, return the result of the comparison x == ToNumber(y).
10. If Type(x) is either String, Number, or Symbol and Type(y) is Object, then
    return the result of the comparison x == ToPrimitive(y).
11. If Type(x) is Object and Type(y) is either String, Number, or Symbol, then
    return the result of the comparison ToPrimitive(x) == y.
12. Return false.```
````

`ECMA-262 7.2.13`

```
1. If Type(x) is different from Type(y), return false.
2. If Type(x) is Undefined, return true.
3. If Type(x) is Null, return true.
4. If Type(x) is Number, then
  a. If x is NaN, return false.
  b. If y is NaN, return false.
  c. If x is the same Number value as y, return true.
  d. If x is +0 and y is -0, return true.
  e. If x is -0 and y is +0, return true.
  f. Return false.
5. Type(x) is String, then
  a. If x and y are exactly the same sequence of code units (same length and same code units at corresponding indices), return true.
  b. Else, return false.
6. If Type(x) is Boolean, then
  a. If x and y are both true or both false, return true.
  b. Else, return false.
7. If x and y are the same Symbol value, return true.
8. If x and y are the same Object value, return true. Return false.
```

用以上規則解幾題：

```js
var a = 42;
var b = "42";
a === b; // false
a == b; // true -> 7.2.12 rule 6
```

```js
var a = "42";
var b = true;
a === b; // false
a == b; // false -> 7.2.12 rule 9 -> "42" == 1 -> 7.2.12 rule 7 -> 42 == 1
```

```js
var a = 42;
var b = [42];
a === b; // false
a == b; // true -> 7.2.12 rule 10 => 42 == "42" => 7.2.12 rule 6 => 42 == 42
```

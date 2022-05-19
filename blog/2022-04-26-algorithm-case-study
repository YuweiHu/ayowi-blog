---
slug: algorithm-case-study
title: 菜鳥工程師耍蠢紀錄...如何用 O(n^2) 毀滅世界
author: Cliff Hu
author_title: Cliff Hu
tags: [time complexity, algorithm]
---

## 懶人包

- 在不確定資料量級的情況下，真的不要寫出 O(n^2) 的時間複雜度。

## 前言

在一個風和日麗的早上，公司 slack 突然跳出群組通知，有客戶抱怨系統太慢，我當然是不以為意啦，畢竟我早已從主系統出家許久，有時跑去北美，有時飛去太空，對於台灣的事基本不太管...

但之後群組傳來噩耗：多項證據指向可能是我兩年前撰寫的 code 殺了 server。

之後就進行一連串的錯誤偵測，順便增加幾分對兩年前自己的憎恨（？以下簡述一下問題的追查以及如何解決。

<!-- truncate -->

## 問題追查

不囉唆...先上圖。

![](/img/blog/algorithm-case-study/algorithm-case-study-1.png)

主系統的 CPU 在大概早上 9 點左右衝到 100%，藉由這張圖也可以觀察到：原本有四台機器，但衝上去的只有一台，可能代表另外三台機器已經死掉。

再看看另一張圖：

![](/img/blog/algorithm-case-study/algorithm-case-study-2.png)

這張圖顯示四台機器的 CPU 都衝上去，代表另外三台機器其實沒死，但因為太忙了無法回應。

第一張圖，機器是透過打 api health check，所以如果機器太忙，會沒有回應，但其實沒死。

看到這裡可以先下一個小結論：可能有某個 job 需要做太多事情，讓三台機器卡住，之後所有流量全部湧入剩下的那一台機器，導致回應太慢。

那到底誰是兇手？誰讓機器慢下來？

交叉比對時間之後發現，三台機器在反應變慢前都打了一支 api : `marMonthAllByDrug`

此時幾乎可以確定：抓到兇手！

## 如何解決？

先理解一下這隻 api 是幹嘛的？它要印出「特定機構一個月內所有藥物」。然後看一下 code 關鍵部分:

```js
// get sheetData
const tempOrganizationAllMar = await Mar.find({
  organization: mongoose.Types.ObjectId(organizationId),
})
  .populate("patient")
  .lean();
const organizationAllMar = tempOrganizationAllMar.filter((obj) => {
  const patientId = obj.patient._id;
  const patientTransferManage = transferManages.filter(
    (t) => String(t.patient._id) === String(patientId)
  );
  if (patientTransferManage.length % 2 === 1) {
    patientTransferManage.push({ createdDate: moment(end, "x") });
  }
  const result = [];
  for (let p = 0; p < patientTransferManage.length / 2; p++) {
    result.push(
      isOverlap(
        patientTransferManage[p].createdDate,
        patientTransferManage[p + 1].createdDate,
        start,
        end
      )
    );
  }
  return result.includes(true);
});
```

有幾點實在是寫的很差，完全就是菜雞（aka 兩年前的我）的作品

- 要拿出時間區間內的藥物，query 條件居然是直接拿 organization id 再 filter？
- 拿出來的東西不需要 patient 的全部 field，就應該先 populate 拿出需要的東西。
- 在 filter func 中再 filter 導致 O(n^2) 的 case 出現（毀滅世界關鍵）。

根據以上缺點進行修正成以下的 code :

```js
// get transfer manage data
const transferManagesDocs = await TransferManage.find({
  organization: mongoose.Types.ObjectId(organizationId),
  $or: [{ status: "newcomer" }, { status: "discharge" }],
}).lean();
const transferManages = groupBy(transferManagesDocs, (data) =>
  String(data.patient)
);
// get all mars in a month
const organizationAllMarInMonth = await Mar.find({
  organization: mongoose.Types.ObjectId(organizationId),
  $or: [
    {
      endDate: { $exists: false },
      presDate: { $lte: moment(endTime, "x").toDate() },
    },
    {
      endDate: { $gte: moment(startTime, "x").toDate() },
      presDate: { $lte: moment(endTime, "x").toDate() },
    },
  ],
})
  .populate({ path: "patient", select: "branch bed room firstName lastName" })
  .lean();

// filter mars by transfer manage
const organizationAllMar = organizationAllMarInMonth.filter((obj) => {
  const patientId = obj.patient._id;
  const patientTransferManage = transferManages[patientId] || [];
  if (patientTransferManage.length % 2 === 1) {
    patientTransferManage.push({ createdDate: moment(endTime, "x") });
  }
  for (let p = 0; p < patientTransferManage.length / 2; p++) {
    const overlap = isOverlap(
      patientTransferManage[p].createdDate,
      patientTransferManage[p + 1].createdDate,
      start,
      end
    );
    if (overlap) {
      return true;
    }
  }
  return false;
});
```

改進最多的部分還是從 O(n^2) 下降至 O(n)，n=4000 時運行時間大致從 5000ms 降到 88ms。

## 思考

- 不要瞎雞掰亂寫 O(n^2)。
- 有沒有可能讓使用者知道我們 server 忙不過來，不要讓使用者在繼續戳，打 api 毀天滅地？

---
slug: type-in-url
title: 你在瀏覽器輸入網址之後到底都幹了什麼事？
author: Cliff Hu
author_title: Cliff Hu
tags: [browser]
---

## 懶人包

![](/img/blog/typeinURL.png)

<center>
<a href="https://twitter.com/manekinekko/status/1281704000572858375?fbclid=IwAR3v1IRLOeIpEGYf6Q0DR7gA_ngYQ65vHVkf6uRU8MkJYnMlePCDUv8w7qk"> image source</a>
</center>

<!-- truncate -->

## 前言

這陣子看到網路上有人在討論「輸入網址之後發生的事」，發現自己對後半段（HTML + CSS + JS 回到瀏覽器以後）算熟悉，但 DNS、TCP 以及 HTTP 相關的好像不是那麼懂，所以想來寫一篇文章紀錄一下自己目前掌握的知識。

## DNS

先想像一下，過年時候你被爸媽強迫打給六舅公拜年，你百般不願意但還是硬著頭皮做了，但你根本不知道平常沒在聯絡的六舅公電話到底是多少...這時候你只好先去**電話簿**查詢六舅公的**電話**。

其實 **DNS（Domain Name Server）**就是**電話簿**，當你輸入 **www.example.com** 時，你的電腦會先去 **DNS（電話簿）** 找 **IP 位址（電話）**。平常網址列看到的 **.com** **.edu** **.tw** 這些都是給人類看的，並不是給電腦看的，在網路世界裡 IP 位址才是真正有效的地址。

欸那今天如果是打給奶奶拜年呢？你平常就有打電話在關心奶奶，所以不需要去電話簿查詢奶奶的電話。

這就是**快取（cache）**的概念，你的電腦會幫你記住你瀏覽過的網站，當你下想要再訪問同樣網站的時候，就不需要透過 DNS 重新查詢。（就像是你知道奶奶電話，就不需要回去電話簿查詢）

## TCP 連結

### 建立 TCP 連結

得知 IP 位址之後為了讓客戶端與伺服器端溝通，需要經過三次握手（three-handshake）建立 TCP 連線，這過程是為了確保兩個要溝通的端點都有收發包的能力。過程大致如下：

第一次握手：客戶端發送 SYN（synchronous），並進入 SYN_SENT 狀態，等待伺服器確認。

第二次握手：伺服器收到 SYN，需要發送 ACK（acknowledgement） 給客戶端（確認用，告訴客戶端我收到你的請求了），同時伺服器也要向客户端發送一个 SYN，所以第二次握手是由伺服器發送 SYN + ACK 給客戶端，此時伺服器進入 SYN_RCVD 狀態。

第三次握手：客户端收到伺服器端回傳的 SYN + ACK，再向伺服器發送一次訊息，客户端進入 ESTABLISHED 狀態。等伺服器收到客户端發送的 ACK 也會進入 ESTABLISHED 狀態，完成三次握手。

### 終止 TCP 連線

雖然圖片說明是在講建立連線的過程，但這裡也順便紀錄一下斷開連線四次揮手的過程，大致如下：

第一次揮手：客戶端發送一個 FIN 請求（請求連接終止：FIN = 1），請求中會指定一個序列號 seq = u，並停止再發送數據，主動關閉 TCP 連接。此時客戶端處於 FIN_WAIT1 狀態，等待伺服器的確認。

第二次揮手：伺服器收到 FIN 之後，會發送 ACK 回應，且把客戶端的序號值 +1 作為 ACK 回應的序列號值，表明已經收到客戶端的報文了，此時服務端處於 CLOSE_WAIT 狀態。此時的 TCP 處於半關閉狀態，客戶端到服務端的連接釋放。客戶端收到伺服器的確認後，進入 FIN_WAIT2（終止等待 2）狀態，等待伺服器發出的連接釋放報文段。

第三次揮手：如果伺服器也想斷開連接了（沒有要向客戶端發出的數據），和客戶端的第一次揮手一樣，發送 FIN 報文，且指定一個序列號。此時伺服器處於 LAST_ACK 的狀態，等待客戶端的確認。

第四次揮手：客戶端收到 FIN 之後，一樣發送一個 ACK 回應（ack = w+1），且把伺服器的序列值 +1 作為自己 ACK 回應的序號值（seq=u+1），此時客戶端處於 TIME_WAIT （時間等待）狀態。

## HTTP 請求

在 TCP 傳輸層之上的應用層，可以用 HTTP 協議溝通。HTTP（HyperText Transfer Protocol）被設計來讓瀏覽器和伺服器進行溝通，連線時最顯著的特點是客戶端傳送的每次請求（request）都需要伺服器回送響應（response），在請求結束後，會主動釋放連線。從建立連線到關閉連線的過程稱為**一次連線**。

HTTP 如果經過加密，就會是你更熟知的 HTTPS，S 的意思是 Secure，使用 HTTPS 傳輸會讓資料更安全。HTTP 與 HTTPS 的比較想知道更多可以參考這篇[文章](https://tw.alphacamp.co/blog/http-https-difference)。

HTTP 每次回應（response）都會有狀態碼，即是 HTTP response status code，詳細資訊可以參考 [MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)。

## 總結

DNS 整個機制還有很多內容可以說，TCP/IP 傳輸層的協議也是，但我想身為專精在前端的我更注重 HTTP 的相關機制，包含 HTTP 1.0/1.1 的差異？HTTP Cache？HTTP Cookies？

關於 HTTP 之後會在寫一篇文章好好討論。

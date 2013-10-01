---
layout: post
title: Frequent Question raised in Android programming
category: Technology
tag: Android
lan: EN
---

This post lists some questions or problems appears frequently during Android developing.

##1. adb cannot run, adb server is out of date

Sometimes, when you want to installed your app on your smart phone with Eclipse running. It seems your computer has not detect your phone.

This is because there are some alternative Android USB detectors are running on `port 5037`. Such as tencent's tadb.exe.

You will have this error message when you run adb start-server:

    C:\Users\xxxx>adb start-server
    adb server is out of date.  killing...
    ADB server didn't ACK
    * failed to start daemon *

We can use this snip to check which process is occupy the port `tcp:5037`

    C:\Users\xxxxxx>netstat -ano | findstr "5037"
    TCP    | 127.0.0.1:5037  | 0.0.0.0:0       | LISTENING   | 4236 
    TCP    | 127.0.0.1:5037  | 127.0.0.1:49422 | ESTABLISHED | 4236 
    TCP    | 127.0.0.1:49422 | 127.0.0.1:5037  | ESTABLISHED | 3840 

Just kill the process 4236 then you will run adb.exe successfully.

##2. Animation run twice in listview

This is a programming mistake.
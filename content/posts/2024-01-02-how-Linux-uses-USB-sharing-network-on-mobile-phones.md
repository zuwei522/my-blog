---
title: Linux 如何使用手机的 USB 共享网络
subtitle:
date: 2024-01-02T15:10:00+08:00
slug: how-linux-uses-usb-sharing-network-on-mobile-phones
draft: false
author:
  name: Zuwei
keywords:
  - Linux
  - 共享网络
  - USB
tags:
  - Linux
categories:
  - 随笔
---

1. 在 Linux 终端输入命令 `ipconfig` 或 `ip addr` 查看当前已有网络。
2. 将手机通过数据线连接上主机的 USB 口，开启手机的“USB 共享网络”功能。
3. 再次输入命令 `ipconfig` 或 `ip addr`，检查是否有新增的网络，此时没有IP地址。注意新增的网络接口名称，如“usb0”。
4. 为网络接口分配IP地址：`dhclient usb0`
5. 再次查看网络接口：`ipconfig` 或 `ip addr`
6. 确认已接入互联网：`ping www.baidu.com`
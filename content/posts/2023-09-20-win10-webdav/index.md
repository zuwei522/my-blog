---
title: Windows 10 挂载 Alist WebDAV
subtitle:
date: 2023-09-20T18:38:00+08:00
slug: win10-webdav
draft: false
author:
  name: Zuwei
keywords:
  - WebDAV
  - Alist
  - Windows 10
tags:
  - WebDAV
categories:
  - 随笔
lightgallery: true
---

最近想在机房上课的时候，直接访问在宿舍搭建的 Alist 网盘存取代码，但只能在 Web 页面中下载文件，而且还不能下载一整个文件夹。于是想到通过挂载 WebDAV 来访问，这样还可以直接把文件夹添加到 VS Code 的工作区中了。

可以使用 RaiDrive 来挂载 WebDAV，但是每次都要安装软件，有些麻烦。能不能直接映射网络驱动器呢？答案是可以的，但是原生只支持 https 协议的 WebDAV，需要修改一下注册表才能支持 http 的 WebDAV。
{{< image src="2023093760110708.png" alt="映射网络驱动器" caption="映射网络驱动器" >}}

## 步骤
1. 按下 “windows徽标键” + “R”，打开运行窗口，输入 `regedit`，点击确定后，打开注册表编辑器窗口。
{{< image src="2023093710571008.png" alt="运行" caption="运行" >}}

2. 将路径定位到以下路径：`计算机\HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\WebClient\Parameters`。双击右侧界面中的 `BasicAuthLevel` 条目，将数值数据修改为“2”，点击确定后关闭注册表编辑器。
{{< image src="2023094158255840.png" alt="修改注册表" caption="修改注册表" >}}

3. 按下 “windows徽标键” + “R”，打开运行窗口，输入 `services.msc`，点击确定后，打开“服务”界面。找到 “WebClient”
服务，右键点击打开选项菜单，选择重新启动，稍等几秒，待完成后，关闭“服务”界面。
{{< image src="2023093253344957.png" alt="服务" caption="服务" >}}

> 引用：<https://blog.csdn.net/qq_38894585/article/details/128818512>

进行完以上三个步骤，再点击映射网络驱动器，输入 WebDAV 地址，下一步就会弹出输入用户名和密码，之后就完成啦。

---

## Windows 下 WebDAV 最大文件传输限制

默认状态下，读取超出 50M 的文件会弹出“0x800700DF: 文件大小超过允许的限制，无法保存”

解决方法：修改注册表，最大传输文件上限可达 4G
- 重复上述步骤 1 和 2，双击右侧界面中的 `FileSizeLimitInBytes` 条目，将数值数据修改为“2”，点击确定后关闭注册表编辑器，重启电脑。
---
categories:
- Wiki
date: '2023-10-05 02:28:00'
keywords: ''
lightgallery: ''
slug: Red-Hat-Challenge-2023-Preliminary-Round-Preparation
tags:
- Linux
- Red Het
title: 红帽挑战赛 - 初赛 备赛
updated: '2024-08-02T19:04:49.089+08:00'
---
## 初赛主要考察内容

- Linux 基本操作
- 网络安全配置
- [用户群组管理](#一、用户群组管理)
- 控制和监控 Systemd 服务
- 文件安全管理
- 管理存储设备
- 逻辑卷和文件系统

## 一、用户群组管理

### 1. 查看当前用户

- `whoami`
- `who am i`
- `who mom likes`

```shell
shiyanlou:~/ $ whoami
shiyanlou
shiyanlou:~/ $ who am i
shiyanlou pts/2        2023-10-04 14:14 (127.0.0.1)
shiyanlou:~/ $ who mom likes
shiyanlou pts/2        2023-10-04 14:14 (127.0.0.1)
```

### 2. 创建用户

创建用户需要 root 权限，若当前非 root 用户，则需使用 `sudo [命令]` 命令，或切换为 root 用户。

> 在命令前添加 `sudo`，可以 root 权限来执行该条命令。使用 sudo 命令有两个大前提，一是当前登录用户的密码，二是当前用户必须在 sudo 用户组。

- `adduser [用户名]` **创建新用户**

```shell
shiyanlou:~/ $ sudo adduser lilei
正在添加用户"lilei"...
正在添加新组"lilei" (1000)...
正在添加新用户"lilei" (1000) 到组"lilei"...
创建主目录"/home/lilei"...
正在从"/etc/skel"复制文件...
输入新的 UNIX 密码： 
重新输入新的 UNIX 密码： 
passwd：已成功更新密码
正在改变 lilei 的用户信息
请输入新值，或直接敲回车键以使用默认值
	全名 []: 
	房间号码 []: 
	工作电话 []: 
	家庭电话 []: 
	其它 []: 
这些信息是否正确？ [Y/n]
```

- `su [选项] [用户名]` **切换用户**

  |                   选项（可选）                   |                              说明                              |
  | :----------------------------------------------: | :-------------------------------------------------------------: |
  |               `-`, `-l`, `--login`               | 提供一个类似于用户直接登录（login）的环境，用户可能会希望这样。 |
  | 执行该命令后，输入该用户的密码后可切换至该用户。 |                                                                |

```shell
shiyanlou:~/ $ su - lilei
密码： 
lilei@651d93de1d59731dbb1f24db:~$ 
```

- **退出当前用户**
- `exit` 命令
- `Ctrl+D` 快捷键
  退出当前用户跟退出终端一样，可以使用 `exit` 命令或者使用快捷键 `Ctrl+D`

```shell
lilei@651d93de1d59731dbb1f24db:~$ exit
注销
shiyanlou:~/ $ 
```

### 3. 用户组

- **查看用户组**
- `groups [用户名]...`
  显示每个输入的用户名所在的全部组，如果没有指定用户名则默认为当前进程用户。

```shell
shiyanlou:~/ $ groups lilei shiyanlou root
lilei : lilei
shiyanlou : shiyanlou sudo public ssl-cert
root : root
```

> 冒号之前表示用户，后面表示该用户所属的用户组。

- `cat /etc/group` **查看 /etc/group 文件**

<details><summary> 点击展开详细信息 </summary>
 > `/etc/group` 的内容包括用户组（Group）、用户组口令、GID（组 ID） 及该用户组所包含的用户（User），每个用户组一条记录。格式如下：`group_name:password:GID:user_list`

使用 `cat /etc/group` 命令会输出所有用户组，可配合以下命令方便查看
- `sort`
将 `cat /etc/group` 命令的输出*排序*后再次输出
         cat /etc/group | sort
- `grep`
将 `cat /etc/group` 命令的输出按指定字符串*筛选*后输出
         cat /etc/group | grep [字符串]
```shell
shiyanlou:~/ $ cat /etc/group | grep shiyanlou
sudo:x:27:shiyanlou,labex
shiyanlou:x:5000:
public:x:5002:shiyanlou,labex
ssl-cert:x:118:shiyanlou
```
</details>
- `usermod -G [用户组] [用户名]` **为用户添加用户组**
> 为用户添加用户组需要 root 权限

示例：为用户 lilei 添加 sudo 用户组，使其拥有 root 权限

```shell
shiyanlou:~/ $ groups lilei
lilei : lilei
shiyanlou:~/ $ sudo usermod -G sudo lilei
shiyanlou:~/ $ groups lilei
lilei : lilei sudo
```
### 4. 删除用户、用户组

- `deluser [选项] [用户名]` **删除用户**

> 删除用户需要 root 权限


|  选项（可选）  |                 说明                 |
| :-------------: | :----------------------------------: |
| `--remove-home` | 删除用户时一并将该用户的工作目录删除 |

```shell
shiyanlou:~/ $ sudo deluser lilei
正在删除用户 'lilei'...
警告：组"lilei"没有其他成员了。
完成。
shiyanlou:~/ $ groups lilei
groups: "lilei": no such user
shiyanlou:~/ $ ls /home
labex  lilei  project  shiyanlou
```
- `groupdel [用户组]` **删除用户组**

> 删除用户组需要 root 权限。删除用户组前，需先删除其中的用户
>

---
categories:
- DSA 实验
date: '2023-09-28 00:26:00'
keywords: ''
lightgallery: ''
slug: DSA-single-linked-list-experiment
tags:
- 单链表
- 链表
title: 数据结构：单链表 - 实验
updated: '2024-08-02T18:43:32.676+08:00'
---
### 一、实验目的

1. 掌握线性表的定义、特点、逻辑结构，理解线性表的抽象数据类型。
2. 熟练掌握线性表的两种存储结构的结构类型定义、特点和基本操作的实现。
3. 通过本次实验帮助学生加深对线性表的理解，并加以应用。

<!--more-->

### 二、实验环境

已安装 CodeBlocks 软件的计算机；

### 三、实验学时

2学时

### 四、实验要求

1. 熟悉c语言的语法知识；
2. 了解线性表的逻辑结构特性；
3. 掌握线性表的链式存储结构—单链表的定义、创建、插入、删除、取值等基本操作；
4. 完成实验报告。

### 五、实验内容

> 注：所写代码要有良好的输入和输出提示

参考课本代码，完成单链表的基本操作（定义、初始化、插入、删除、定位等）的汇总，用一个完整的程序实现单链表的基本运算。要求在主函数中对以上操作进行调用，实现以下功能：

 1. 定义单链表 link1，用尾插入法创建 link1，并输出创建后的 link1 元素序列。
 2. 计算 link1 的长度，并将结果存放在头结点的数据域中，然后输出单链表的所有元素（包含头结点，头结点作为第一个输出）。
 3. 定义单链表 link2，产生 10 个 1-200 的随机整数，通过插入函数依次保存到带头结点的 link2 中，并输出插入后的 link2 元素序列。
 4. 查找 link1 中第i个元素（i 由用户输入），输出第 i 个元素的值。
 5. 由用户输入一个数，然后通过查找函数查找这个数是否在 link1 中，如果在则删除这个数并输出删除后的 link1，如果不在则输出找不到。
 6. 调用删除函数删除 link2 中第i个元素（i 由用户输入），删除成功后输出删除后的 link2 的元素序列，删除失败则显示不存在这个数。

> 备注：产生随机数的方法 `srand((int)time(0))`，`rand()`。(随机函数所在头文件 `<stdlib.h>`，时间函数所在头文件 `<time.h>`)

```c
#include <stdio.h>
#include <stdlib.h>

typedef int DataType;
// 单链表的结点 自定义的数据类型
struct Node
{
    DataType data;
    struct Node *next;
};
typedef struct Node Node;
typedef struct Node *LinkList;

// 创建带头结点的空单链表 算法2-12
LinkList createNullList()
{
    LinkList head = (LinkList)malloc(sizeof(Node));
    if (head != NULL)
        head->next = NULL;
    else
        printf("内存空间不足！");
    return head;
}

// 尾插法建表 算法2-15
void creatAtTail(LinkList head)
{
    Node *p, *q = head;
    DataType data;
    printf("请录入 link1 数据，以 -1 结尾：\n");
    scanf("%d", &data);
    while (data != -1)
    {
        p = (Node *)malloc(sizeof(Node));
        p->data = data;
        p->next = NULL; // 尾结点赋空值
        q->next = p;    //  q 指的是原来单链表中的末尾结点 把新结点 p 链入到单链表的尾部
        q = p;          // q 重新记录末尾结点
        scanf("%d", &data);
    }
}

// 打印链表中的元素
void printLinkList(LinkList head)
{
    LinkList p = head->next;
    while (p != NULL)
    {
        printf("%d ", p->data);
        p = p->next;
    }
    printf("\n");
}

// 计算链表长度，并将结果存放在头结点的数据域中
void lenthOfList(LinkList head)
{
    LinkList p = head;
    int len = 0;
    while (p->next != NULL)
    {
        len++;
        p = p->next;
    }
    head->data = len;
}

// 使用后插法在链表中插入元素
int insertPost_link(LinkList head, LinkList p, DataType data)
{
    LinkList q;
    if (p == NULL)
    {
        printf("插入位置错误\n");
        return 0;
    }
    q = (Node *)malloc(sizeof(Node));
    if (q == NULL)
    {
        printf("内存分配失败\n");
        return 0;
    }
    else
    {
        q->data = data;
        q->next = p->next;
        p->next = q;
        return 1;
    }
}

// 在链表尾部插入元素
void insertAtTail(LinkList head, DataType data)
{
    Node *p = head, *q;
    while (p->next != NULL)
    {
        p = p->next;
    }
    insertPost_link(head, p, data);
}

// 产生 10 个 1-200 的随机整数，并存入链表中
void creatRandomList(LinkList head)
{
    int i;
    for (i = 0; i < 10; i++)
    {
        insertAtTail(head, rand() % 200 + 1);
    }
}

// 查找链表中指定位序的元素，成功返回该元素，失败返回空值
DataType findByOrder(LinkList head, int order)
{
    if (order < 1)
        return NULL;
    Node *p = head;
    int i;
    for (i = 0; p->next != NULL && i < order; i++)
    {
        p = p->next;
    }
    if (i == order)
        return p->data;
    else
        return NULL;
}

// 查找链表中指定元素的位序，成功返回该元素的位序，失败返回 0
int findByData(LinkList head, DataType data)
{
    int i = 1;
    Node *p = head->next;
    while (p != NULL && p->data != data)
    {
        p = p->next;
        i++;
    }
    if (p == NULL)
        return 0;
    else
        return i;
}

// 删除链表中指定位序的元素，成功返回 1，失败返回 0
int deleteByOrder(LinkList head, int order)
{
    if (order < 1)
        return 0;
    Node *p = head, *q;
    int i;
    for (i = 1; p->next != NULL && i < order; i++)
    {
        p = p->next;
    }
    if (i != order)
        return 0;
    else
    {
        q = p->next;
        p->next = q->next;
        free(q);
        return 1;
    }
}

int main()
{
    // 定义单链表 link1，用尾插入法创建 link1，并输出创建后的 link1 元素序列
    LinkList link1 = createNullList();
    creatAtTail(link1);
    printf("\nlink1 创建后的元素序列：\n");
    printLinkList(link1);

    // 计算 link1 的长度，并将结果存放在头结点的数据域中，然后输出单链表的所有元素（包含头结点，头结点作为第一个输出）
    lenthOfList(link1);
    printf("\nlink1 的长度及其元素：\n%d ", link1->data);
    printLinkList(link1);

    // 定义单链表 link2，产生 10 个 1-200 的随机整数，通过插入函数依次保存到带头结点的 link2 中，并输出插入后的 link2 元素序列
    LinkList link2 = createNullList();
    int i;
    for (i = 0; i < 10; i++)
        if (!insertPost_link(link2, link2, rand() % 200 + 1))
        {
            printf("插入失败\n");
            break;
        }
    printf("\nlink2 创建后的元素序列：\n");
    printLinkList(link2);

    // 查找 link1 中第 i 个元素（i由用户输入），输出第i个元素的值
    printf("\n请输入 link1 中要查找的元素的位置：");
    scanf("%d", &i);
    DataType result;
    if ((result = findByOrder(link1, i)) != NULL)
        printf("\nlink1 中第 %d 个元素为：%d", i, result);
    else
        printf("\nlink1 中不存在第 %d 个元素", i);

    // 由用户输入一个数，然后通过查找函数查找这个数是否在 link1 中，如果在则删除这个数并输出删除后的 link1，如果不在则输出找不到
    printf("\n\n请输入要查找的 link1 元素：");
    DataType find;
    scanf("%d", &find);
    if ((i = findByData(link1, find)) != 0)
    {
        printf("\nlink1 中存在 %d 元素，删除后元素序列：\n", find);
        deleteByOrder(link1, i);
        printLinkList(link1);
    }
    else
        printf("\nlink1 中不存在元素 %d\n", find);

    // 调用删除函数删除link2中第i个元素（i由用户输入），删除成功后输出删除后的link2的元素序列，删除失败则显示不存在这个数。
    printf("\n请输入要删除的 link2 元素的位置：");
    scanf("%d", &i);
    if (deleteByOrder(link2, i))
    {
        printf("\nlink2 中删除第 %d 个元素后的元素序列：\n", i);
        printLinkList(link2);
    }
    else
        printf("\nlink2 中不存在第 %d 个元素", i);

    return 0;
}
```

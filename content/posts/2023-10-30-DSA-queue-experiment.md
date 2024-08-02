---
categories:
- DSA 实验
date: '2023-10-30 22:14:00'
keywords: ''
lightgallery: ''
slug: DSA-queue-experiment
tags:
- C
- 队列
- 杨辉三角
title: 数据结构：队列 - 实验
updated: '2024-08-02T18:54:09.588+08:00'
---
## 一、实验目的

1. 掌握队列这种数据结构特性及其主要存储结构，并能在现实生活中灵活运用。

## 二、实验环境

已安装 CodeBlocks 软件的计算机；

## 三、实验学时

2学时

## 四、实验要求

1. 熟悉c语言的语法知识；
2. 掌握队列的链式存储结构的定义、构造、销毁、插入、删除等基本操作；
3. 完成实验报告。

## 五、实验内容

> 注：所写代码要有良好的输入和输出提示

参考课本代码，完成队列的链式存储结构的定义、取队头、出队、入队等函数的编写，并自己独立完成链式队列的输出函数编写（从队头开始输出）。要求在主函数中实现对以上操作的调用，实现以下功能：

* [X]  第一步：队列初始化为空队列。
* [X]  第二步：键盘输入奇数时，入队。
* [X]  第三步：每输入一个整数，显示操作后队列中的值。
* [X]  第四步：键盘输入0时，算法结束。
* [X]  附加题：使用队列打印杨辉三角形。[参考原文](http://data.biancheng.net/view/98.html)

```c
#include <stdio.h>
#include <stdlib.h>

typedef int DataType;

struct Node
{
    DataType data;
    struct Node *link;
};
typedef struct Node *PNode;

struct Queue
{
    PNode f;
    PNode r;
};
typedef struct Queue *LinkQueue;

LinkQueue SetNullQueue_Link() // 创建空队列
{
    LinkQueue lqueue;
    lqueue = (LinkQueue)malloc(sizeof(struct Queue));
    if (lqueue != NULL)
    {
        lqueue->f = NULL;
        lqueue->r = NULL;
    }
    else
    {
        printf("内存分配失败！\n");
    }
    return lqueue;
}

int IsNullQueue_Link(LinkQueue lqueue) // 判断队列是否为空
{
    return lqueue->f == NULL;
}

void EnQueue_Link(LinkQueue lqueue, DataType x) // 入队操作
{
    PNode p;
    p = (PNode)malloc(sizeof(struct Node)); // 申请节点空间
    if (p == NULL)
    {
        printf("内存分配错误！\n");
    }
    else
    {
        p->data = x;           // 数据域赋值
        p->link = NULL;        // 指针域赋值
        if (lqueue->f == NULL) // 空队列的特殊处理
        {
            lqueue->f = p;
            lqueue->r = p;
        }
        else
        {
            lqueue->r->link = p; // 修改队尾
            lqueue->r = p;       // 修改队尾指针
        }
    }
}

int DeQueue_Link(LinkQueue lqueue) // 出队
{
    struct Node *p;
    if (lqueue->f == NULL) // 判断队列是否为空
    {
        printf("队列为空！\n");
        return NULL;
    }
    else
    {
        p = lqueue->f;               // p 指向队头结点，以方便后面的释放
        lqueue->f = lqueue->f->link; // 修改队头指针
        DataType n = p->data;
        free(p); // 释放节点空间
        return n;
    }
}

DataType FrontQueue_Link(LinkQueue lqueue) // 取对头元素
{
    if (lqueue->f == NULL) // 判断队列是否为空
    {
        printf("队列为空！\n");
        return NULL;
    }
    else
    {
        return lqueue->f->data; // 返回队头节点数据域
    }
}

void PrintQueue_Link(LinkQueue lqueue) // 打印队列
{
    PNode p;
    p = lqueue->f;
    while (p != NULL)
    {
        printf("%d ", p->data);
        p = p->link;
    }
    printf("\n");
}

void printPascalTriangle(int n) // 打印杨辉三角
{
    int i, s, e, k;
    // 由于杨辉三角越往下，值的位数越多，为了保持输出数据的形状，杨辉三角第一行中的1需要空多个格
    for (i = 1; i <= n; i++)
    {
        printf("   ");
    }
    // 输出 1，需要控制其所占位数
    printf("%-5d\n", 1);
    // 初始化队列，同时将三角的第二行作为起始行，向下推导
    LinkQueue lqueue = SetNullQueue_Link();
    EnQueue_Link(lqueue, 0);
    EnQueue_Link(lqueue, 1);
    EnQueue_Link(lqueue, 1);
    k = 1;
    while (k < n)
    {
        // 每往下一行，其第一个数字都需往左移动 1 个占位
        for (i = 1; i <= n - k; i++)
        {
            printf("   ");
        }
        // 0 作为转行符，入队列
        EnQueue_Link(lqueue, 0);
        do
        {
            // 队头元素出队列
            s = DeQueue_Link(lqueue);
            // 取新的队头元素
            e = FrontQueue_Link(lqueue);
            // 如果所取元素非 0，则输出，否则做转行操作
            if (e)
            {
                printf("%-5d", e);
            }
            else
            {
                printf(" \n");
            }
            EnQueue_Link(lqueue, s + e);
        } while (e != 0); // 一旦 e 值为 0，即做转行操作，退出循环，开始新一行的排列
        k++;
    }
    // 出循环后，队列中还存有下一行的数据
    e = DeQueue_Link(lqueue);
    while (!IsNullQueue_Link(lqueue))
    {
        printf("%-5d", DeQueue_Link(lqueue));
    }
}

int main()
{
    // 队列初始化为空队列
    LinkQueue lqueue = SetNullQueue_Link();

    // 键盘输入奇数时，入队
    int n;
    while (1)
    {
        printf("请输入一个数，奇数入队，偶数出队，输入“0”结束算法：");
        scanf("%d", &n);

        if (n == 0)
        {
            break;
        }

        if (n % 2 == 1)
        {
            EnQueue_Link(lqueue, n);
            printf("当前队列：");
            PrintQueue_Link(lqueue);
        }

        // 键盘输入偶数时，出队
        else
        {
            if (DeQueue_Link(lqueue) != NULL)
            {
                printf("当前队列：");
                PrintQueue_Link(lqueue);
            }
        }
    }

    // 使用队列打印杨辉三角形
    printf("请输入要打印的杨辉三角行数：");
    scanf("%d", &n);
    printPascalTriangle(n);

    return 0;
}
```

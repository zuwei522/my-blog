---
categories:
- DSA 实验
date: '2023-09-13T00:19:00'
excerpt: 参考课本代码，完成顺序表的定义、初始化、插入、删除、定位、合并等函数的编写，并自己独立完成顺序表的输出函数编写。
keywords: ''
lightgallery: ''
slug: DSA-sequence-table-experiment
tags:
- 顺序表
title: 数据结构：顺序表 - 实验
updated: '2024-08-02T18:10:44.322+08:00'
---
### 实验内容

> 注：所写代码要有良好的输入和输出提示

参考课本代码，完成顺序表的定义、初始化、插入、删除、定位、合并等函数的编写，并自己独立完成顺序表的输出函数编写。要求在主函数中实现对以上操作的调用，实现以下功能：

1. 定义三个顺序表 La，Lb，Lc，并调用初始化函数实现三个表的初始化。
2. 调用插入函数依次往 La 中插入元素 10，30，50，70，90。
3. 调用插入函数依次往 Lb 中插入元素 20，40，60，80，100。
4. 调用输出函数输出 La 和 Lb。
5. 调用删除函数删除 La 的第 1 个元素并输出删除后的 La。
6. 由用户输入一个数，然后通过定位函数查找这个数是否在 Lb 中，如果在则删除这个数并输出删除后的 Lb，如果不在则不做任何操作。
7. 调用合并函数将 La 和 Lb 合并成一个顺序表放到 Lc，并输出合并后的 Lc 的元素序列。

```c
#include <stdio.h>
#include <stdlib.h>

// 为顺序表中要存储的元素类型（int）起一个叫 DataType 的别名
typedef int DataType;

struct List
{
    int Max;        // 最大元素个数
    int n;          // 实际元素个数
    DataType *elem; // 首地址
};
typedef struct List *SeqList;

// 创建空的顺序表，m 为顺序表的最大值
SeqList SetNullList_Seq(int m)
{
    // 申请结构体空间
    SeqList slist = (SeqList)malloc(sizeof(struct List));

    if (slist != NULL)
    {
        // 申请顺序表空间，大小为 m 个 DataType 空间
        slist->elem = (DataType *)malloc(sizeof(DataType) * m);

        if (slist->elem)
        {
            slist->Max = m;
            slist->n = 0;
            return (slist);
        }
        else
            free(slist);
    }
    printf("创建失败！\n");
    return NULL;
}

// 顺序表的判空
int IsNullList_Seq(SeqList slist)
{
    return (slist->n == 0);
}

// 顺序表的插入算法
int IntertPre_Seq(SeqList slist, int p, DataType x)
{
    // 在线性表 slist 的 p 位置之前插入 x，如果成功，返回 1，否则返回 0
    int q;

    // 若顺序表溢出
    if (slist->n >= slist->Max)
    {
        printf("顺序表溢出");
        return 0;
    }

    // 若不存在下标为 p 的元素
    if (p < 0 || p > slist->n)
    {
        printf("不存在");
        return 0;
    }

    // 将插入的位置以及之后的元素后移
    for (q = slist->n - 1; q >= p; q--)
        slist->elem[q + 1] = slist->elem[q];

    // 插入元素 x
    slist->elem[p] = x;

    // 顺序表长度加一
    slist->n++;

    return 1;
}

// 遍历输出顺序表
void Print(SeqList slist)
{
    int i;
    for (i = 0; i < slist->n; i++)
        printf("\t%d", slist->elem[i]);
}

// 顺序表的删除算法，删除下标为 p 的元素
int DelIndex_Seq(SeqList slist, int p)
{
    int q;

    // 若不存在下标为 p 的元素
    if (p < 0 || p >= slist->n)
    {
        printf("要删除的元素不存在");
        return 0;
    }

    // p 位置之后的元素向前移动
    for (q = p; q < slist->n - 1; q++)
        slist->elem[q] = slist->elem[q + 1];

    // 顺序表长度减一
    slist->n--;

    return 1;
}

//查找值为 x 的元素，返回元素所在的下标
int LocateIndex_Seq(SeqList slist, int x)
{
    int q;
    for(q = 0; q < slist->n; q++)
    {
        if(slist->elem[q] == x)
            return q;
    }

    // 查找失败，返回 -1
    return -1;
}

// 将 alist 与 blist 合并到 clist
void MergeList_Seq(SeqList alist, SeqList blist, SeqList clist)
{
    int i, j, k = 0;
  
    // 合并
    for (i = 0; i < alist->n; i++, k++)
        clist->elem[k] = alist->elem[i];

    for (j = 0; j < blist->n; j++, k++)
        clist->elem[k] = blist->elem[j];

    // 合并后，alist 和 blist 长度之和
    clist->n = i + j;
}

int main()
{
    // 定义三个顺序表 La，Lb，Lc
    SeqList La, Lb, Lc;

    // 并调用初始化函数实现三个表的初始化
    La = SetNullList_Seq(10);
    Lb = SetNullList_Seq(10);
    Lc = SetNullList_Seq(10);

    // 调用插入函数依次往 La 和 Lb 中插入元素
    int i;
    printf("\n请输入要往 La 中插入的元素：");
    for (i = 0; i < 5; i++)
    {
        int x;
        scanf("%d", &x);
        IntertPre_Seq(La, i, x);
    }

    printf("\n请输入要往 Lb 中插入的元素：");
    for (i = 0; i < 5; i++)
    {
        int x;
        scanf("%d", &x);
        IntertPre_Seq(Lb, i, x);
    }

    // 调用输出函数输出 La 和 Lb
    printf("\n输出 La 中的元素：");
    Print(La);
    printf("\n输出 Lb 中的元素：");
    Print(Lb);

    // 调用删除函数删除 La 的第 1 个元素并输出删除后的 La
    if(DelIndex_Seq(La, 0))
        printf("\n\n已删除 La 的第 1 个元素\n");
    else
        printf("\n删除失败");

    printf("\n输出 La 中的元素：");
    Print(La);

    // 由用户输入一个数，然后通过定位函数查找这个数是否在 Lb 中
    int numToLocate,delIndex;
    printf("\n\n请输入 Lb 中要删除的一个数：");
    scanf("%d",&numToLocate);

    // 如果在则删除这个数并输出删除后的 Lb
    if((delIndex=LocateIndex_Seq(Lb, numToLocate)) >= 0)
    {
        DelIndex_Seq(Lb, delIndex);
        printf("\n%d 已删除，输出 Lb 中的元素：",numToLocate);
        Print(Lb);

    }
    // 如果不在则不做任何操作
    else
        printf("\n%d 并不在 Lb 中，未进行任何操作",numToLocate);

    // 调用合并函数将 La 和 Lb 合并成一个顺序表放到 Lc，并输出合并后的 Lc 的元素序列
    MergeList_Seq(La, Lb, Lc);
    printf("\n\n将 La 和 Lb 合并到 Lc，并输出 Lc 中的元素：");
    Print(Lc);

    return 0;
}
```

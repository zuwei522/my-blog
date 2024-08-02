---
categories:
- DSA 实验
date: '2023-10-21 15:42:00'
keywords: ''
lightgallery: ''
slug: DSA-stack-experiment
tags:
- C
- 栈
title: 数据结构：栈 - 实验
updated: '2024-08-02T18:47:52.561+08:00'
---
## 一、实验目的

1. 掌握栈这种数据结构特性及其主要存储结构，并能在现实生活中灵活运用。

## 二、实验环境

已安装 CodeBlocks 软件的计算机；

## 三、实验学时

2学时

## 四、实验要求

1. 熟悉c语言的语法知识；
2. 掌握栈的顺序存储结构—顺序栈的定义、构造、获得栈顶元素、入栈、出栈等基本操作；
3. 完成实验报告。

## 五、实验内容

> 注：所写代码要有良好的输入和输出提示

参考课本代码，完成栈的定义、构造、获得栈顶元素、进栈、出栈等函数的编写。要求在主函数中实现对以上操作的调用，编写一个算法判断给定的字符向量是否为回文。回文是指正读与反读均相同的字符序列，如“abba”和“abdba”均是回文，但“good”就不是回文。

> 提示：入栈的元素应为字符

- 第一步：用一个字符数组来存储字符向量。
- 第二步：将字符数组入栈。（字符数组结束标识为`#`）
- 第三步：出栈（出到栈空为止）取栈顶元素一一和字符数组的元素（从下标0开始）对比，若有一个不等则不是回文，若都相等则为回文。
- 附加题：输入中缀表达式，把中缀转成后缀表达式，然后计算表达式的值输出。

```c
// 实验3-栈
#include <stdio.h>
#define MAXSIZE 100

typedef char DataType;
struct Stack
{
    int MAX;
    int top;
    DataType *elem;
};
typedef struct Stack *SeqStack;

SeqStack SetNullStack_Seq(int m) // 创建空栈
{
    SeqStack sstack = (SeqStack)malloc(sizeof(struct Stack));
    if (sstack != NULL)
    {
        sstack->elem = (DataType *)malloc(sizeof(DataType) * m);
        if (sstack->elem != NULL)
        {
            sstack->MAX = m;
            sstack->top = -1;
            return sstack;
        }
        else
        {
            free(sstack);
            return NULL;
        }
    }
    else
    {
        printf("Alloc failure!");
        return NULL;
    }
}

int IsNullStack_seq(SeqStack sstack) // 判断栈是否为空
{
    return sstack->top == -1;
}

void Push_seq(SeqStack sstack, int x) // 入栈
{
    if (sstack->top >= (sstack->MAX - 1))
    {
        printf("error: 栈已满！\n");
    }
    else
    {
        sstack->elem[++sstack->top] = x;
    }
}

DataType Pop_seq(SeqStack sstack) // 出栈并返回栈顶元素
{
    if (IsNullStack_seq(sstack))
    {
        printf("error: 栈已经空了！\n");
        return NULL;
    }
    else
    {
        return sstack->elem[sstack->top--];
    }
}

int IsHuiwen(SeqStack sstack, char str[]) // 判断是否为回文
{
    int i;
    for (i = 0; str[i] != '\0'; i++)
    {
        if (Pop_seq(sstack) != str[i])
        {
            return 0;
        }
    }
    return 1;
}

int main()
{
    // 第一步：用一个字符数组来存储字符向量。
    char str[MAXSIZE];
    printf("请输入要判断是否为回文的字符：");
    gets(str);

    // 第二步：将字符数组入栈。（字符数组结束标识为“\0”）
    SeqStack sstack = SetNullStack_Seq(MAXSIZE);
    int i;
    for (i = 0; str[i] != '\0'; i++)
    {
        Push_seq(sstack, str[i]);
    }

    // 第三步：出栈（出到栈空为止）取栈顶元素一一和字符数组的元素（从下标0开始）对比，若有一个不等则不是回文，若都相等则为回文。
    IsHuiwen(sstack, str) ? printf("是回文！\n") : printf("不是回文！\n");

    return 0;
}
```

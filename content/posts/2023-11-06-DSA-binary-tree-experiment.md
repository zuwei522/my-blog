---
categories:
- DSA 实验
date: '2023-11-06 20:11:00'
keywords: ''
lightgallery: ''
slug: DSA-binary-tree-experiment
tags:
- C
- 二叉树
title: 数据结构：二叉树 - 实验
updated: '2024-08-02T18:58:58.853+08:00'
---
## 一、实验目的

1. 通过实验掌握二叉树的基本存储结构；
2. 掌握二叉树的建立与遍历的基本算法，并加以应用；

## 二、实验环境

已安装 CodeBlocks 软件的计算机；

## 三、实验学时

2学时

## 四、实验要求

1. 熟悉c语言的语法知识；
2. 掌握二叉树的链式存储结构——二叉链表的定义、构造、遍历等基本操作；
3. 完成实验报告。

## 五、实验内容

> 注：所写代码要有良好的输入和输出提示

参考课本代码，完成二叉树的二叉链表的存储结构的定义、创建、前序遍历、中序遍历、后序遍历、求叶子数和求深度等函数的编写。在理解课本代码的基础上完成以下函数的编写：

1. 编写一个函数输出结点的值。
2. 编写一个函数，用递归算法求二叉树的结点总数，函数原型为：`int node(BinTree T)`。
3. 要求在主函数中实现对以上操作的调用，实现以下功能：

   1. [X]  定义一棵二叉树T，并调用创建函数创建一棵如下图所示的二叉树：
   2. [X]  分别输出二叉树的前序序列、中序序列和后序序列。
   3. [X]  分别输出二叉树的叶子结点数、深度和结点总数。
   4. [X]  附加题：编写非递归的算法实现二叉树的中序遍历、前序遍历和后序遍历。

```c
#include <stdio.h>
#include <malloc.h>

typedef char DataType;
typedef struct BTreeNode
{
    DataType data;
    struct BTreeNode *leftchild;
    struct BTreeNode *rightchild;
} BinTreeNode;
typedef BinTreeNode *BinTree;

BinTree CreateBinTree_Recursion() // 建立二叉树的递归算法
{
    char ch;
    BinTree bt;
    scanf("%c", &ch);
    if (ch == '@') // 输入@，则分支为空
    {
        bt = NULL;
    }
    else
    {
        bt = (BinTreeNode *)malloc(sizeof(BinTreeNode));
        bt->data = ch;
        bt->leftchild = CreateBinTree_Recursion();  // 递归构造左子树
        bt->rightchild = CreateBinTree_Recursion(); // 递归构造右子树
    }
    return bt;
}

void PreOrder_Recursion(BinTree bt) // 递归先序遍历
{
    if (bt == NULL)
    {
        return;
    }
    printf("%c ", bt->data);
    PreOrder_Recursion(bt->leftchild);
    PreOrder_Recursion(bt->rightchild);
}

void InOrder_Recursion(BinTree bt) // 递归中序遍历
{
    if (bt == NULL)
    {
        return;
    }
    InOrder_Recursion(bt->leftchild);
    printf("%c ", bt->data);
    InOrder_Recursion(bt->rightchild);
}

void PostOrder_Recursion(BinTree bt) // 递归后序遍历
{
    if (bt == NULL)
    {
        return;
    }
    PostOrder_Recursion(bt->leftchild);
    PostOrder_Recursion(bt->rightchild);
    printf("%c ", bt->data);
}

int CountLeafNode(BinTree bt) // 统计叶子节点总数
{
    if (bt == NULL)
    {
        return 0; // 递归调用结束条件
    }
    else if (bt->leftchild == NULL && bt->rightchild == NULL) // 左、右子树都为空，是叶子
    {
        return 1;
    }
    else
    {
        return CountLeafNode(bt->leftchild) + CountLeafNode(bt->rightchild); // 递归遍历左子树和右子树
    }
}

int CountLevel(BinTree bt) // 计算二叉树的深度
{
    if (bt == NULL)
    {
        return 0; // 如果空则返回 0
    }
    else
    {
        int left = CountLevel(bt->leftchild);     // 递归计算左子树深度
        int right = CountLevel(bt->rightchild);   // 递归计算右子树深度
        return (left > right ? left : right) + 1; // 返回两个子树中高的深度 + 1
    }
}

int CountNode(BinTree bt) // 统计二叉树结点数
{
    if (bt == NULL)
    {
        return 0;
    }
    else
    {
        return CountNode(bt->leftchild) + CountNode(bt->rightchild) + 1;
    }
}

int main()
{
    // 1. 定义一棵二叉树 T，并调用创建函数创建一棵如下图所示的二叉树：(二叉树的扩展的前序遍历序列 ABC@@DE@@@FGH@@I@@@)
    printf("请输入二叉树的先序序列：");
    BinTree T = CreateBinTree_Recursion();

    // 2. 分别输出二叉树的前序序列、中序序列和后序序列
    printf("该二叉树的前序序列为：");
    PreOrder_Recursion(T);
    printf("\n该二叉树的中序序列为：");
    InOrder_Recursion(T);
    printf("\n该二叉树的后序序列为：");
    PostOrder_Recursion(T);

    // 3. 分别输出二叉树的叶子结点数、深度和结点总数
    printf("\n该二叉树的叶子结点数为：%d\n", CountLeafNode(T));
    printf("该二叉树的深度为：%d\n", CountLevel(T) - 1);
    printf("该二叉树的结点总数为：%d\n", CountNode(T));

    return 0;
}
```

---
id: ds-tree
title: Tree Note
---

## Traverse

遍歷二元樹 (Binary Tree Traversal) 的順序有三種，分別是`前序 (preorder)`, `中序 (inorder)` 和`後序 (postorder)`。遍歷二元樹實作又可以分為遞迴 (recursive) 和迭代 (iterative) 兩種版本。

```
    4
   / \
  2   6
 / \ / \
1  3 5  7
```

- `前序 (preorder)`: 中 -> 左 -> 右，4213657。
- `中序 (inorder)`: 左 -> 中 -> 右，1234567。注意：對二元搜尋樹 (binary search tree, BST) 做 inorder traversal 就是由小到大依序遍歷。
- `後序 (postorder)`: 左 -> 右 -> 中，1325764。

:::note
order 指的是 parent node 的位置，child node 順序皆是 left -> right。
:::

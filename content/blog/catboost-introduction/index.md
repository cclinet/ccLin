---
title: CatBoost 简介
date: "2022-03-10T15:50:37.931Z"
description: "CatBoost 简介"
---

[CatBoost](https://catboost.ai) 是由 [Yandex](https://en.wikipedia.org/wiki/Yandex) 开发的一个 GBDT 算法，被 CERN，Yandex， Cloudflare 等公司广泛使用。其[源代码](https://github.com/catboost/catboost)在 github 上以 Apache 2.0 协议发布。
相比于其他 BGDT 算法，CatBoost 的主要优点有：

- 不需要调参就可以获得比较好的效果
- 对于类别特征有更好的处理
- 训练速度快,且可以利用 GPU 进行训练
- 预测速度快

下面来介绍下 CatBoost 的一些特点

## Quantization

分桶

- Median
  使每个桶的大小大致相同(等频分桶)
- Uniform
  等距分桶
- UniformAndQuantiles|对 1/2 个桶进行 median,然后每个桶内部再 uniform
  (TQuantization TMedianPlusUniformBinarizer::BestSplit **in** catboost/library/cpp/grid_creator/binarization.cpp)
- MaxLogSum
  最大化如下公式

$$
\sum_{i=1}^N \log(weight)
$$

n — bucket 中不同对象的数量
weight — 每个对象出现的次数

- MinEntropy

$$
\sum_{i=1}^N weight \cdot \log(weight)
$$

- GreedyLogSum
  MaxLogSum 的贪心近似

类别特征转换

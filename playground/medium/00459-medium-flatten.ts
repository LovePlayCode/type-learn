/*
  459 - Flatten
  -------
  by zhouyiming (@chbro) #中等 #array

  ### 题目

  在这个挑战中，你需要写一个接受数组的类型，并且返回扁平化的数组类型。

  例如:

  ```ts
  type flatten = Flatten<[1, 2, [3, 4], [[[5]]]]> // [1, 2, 3, 4, 5]
  ```

  > 在 Github 上查看：https://tsch.js.org/459/zh-CN
*/

/* _____________ 你的代码 _____________ */

/**
 * Flatten<T> - 递归扁平化数组类型
 *
 * 【核心知识点】
 *
 * 1. 数组的递归解构
 *    - `T extends [infer First, ...infer Rest]` 将数组拆分为首元素和剩余部分
 *    - First: 第一个元素，Rest: 剩余元素组成的数组
 *
 * 2. 条件类型的嵌套判断
 *    - 先判断 First 是否为数组类型
 *    - 如果是数组，递归扁平化 First
 *    - 如果不是数组，直接保留
 *
 * 3. 展开运算符的类型应用
 *    - `...Flatten<First>` 展开递归扁平化的结果
 *    - `...Flatten<Rest>` 展开剩余部分的扁平化结果
 *
 * 【实现思路】
 *
 * 递归过程：
 * 1. 检查输入是否为数组，非数组报错
 * 2. 将数组拆分为 [First, ...Rest]
 * 3. 判断 First 是否为数组：
 *    - 是数组：递归扁平化 First，然后处理 Rest
 *    - 不是数组：保留 First，然后处理 Rest
 * 4. 数组为空时返回空数组
 *
 * 【执行示例】
 *
 * Flatten<[1, [2, 3], [[4]]]>
 *
 * 第1步: T = [1, [2, 3], [[4]]]
 * → First = 1, Rest = [[2, 3], [[4]]]
 * → 1 extends any[] ? false
 * → [1, ...Flatten<[[2, 3], [[4]]]>]
 *
 * 第2步: Flatten<[[2, 3], [[4]]]>
 * → First = [2, 3], Rest = [[[4]]]
 * → [2, 3] extends any[] ? true
 * → [...Flatten<[2, 3]>, ...Flatten<[[[4]]]>]
 *
 * 第3步: Flatten<[2, 3]>
 * → First = 2, Rest = [3]
 * → 2 extends any[] ? false
 * → [2, ...Flatten<[3]>] → [2, 3]
 *
 * 第4步: Flatten<[[[4]]]>
 * → First = [[4]], Rest = []
 * → [[4]] extends any[] ? true
 * → [...Flatten<[[4]]>, ...Flatten<[]>]
 * → [...[4], ...[]] → [4]
 *
 * 最终结果: [1, ...([2, 3] ∪ [4])] = [1, 2, 3, 4]
 */
type Flatten<T extends any[]> = T extends [infer First, ...infer Rest]
  ? First extends any[]
    ? [...Flatten<First>, ...Flatten<Rest>]
    : [First, ...Flatten<Rest>]
  : []

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Flatten<[]>, []>>,
  Expect<Equal<Flatten<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<Flatten<[1, [2]]>, [1, 2]>>,
  Expect<Equal<Flatten<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, 5]>>,
  Expect<Equal<Flatten<[{ foo: 'bar', 2: 10 }, 'foobar']>, [{ foo: 'bar', 2: 10 }, 'foobar']>>,
]

// @ts-expect-error
type error = Flatten<'1'>

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/459/answer/zh-CN
  > 查看解答：https://tsch.js.org/459/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/

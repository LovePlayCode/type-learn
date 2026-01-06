/*
  191 - 追加参数
  -------
  by Maciej Sikora (@maciejsikora) #中等 #arguments

  ### 题目

  > 由 @antfu 翻译

  实现一个泛型 `AppendArgument<Fn, A>`，对于给定的函数类型 `Fn`，以及一个任意类型 `A`，返回一个新的函数 `G`。`G` 拥有 `Fn` 的所有参数并在末尾追加类型为 `A` 的参数。

  ```typescript
  type Fn = (a: number, b: string) => number

  type Result = AppendArgument<Fn, boolean>
  // 期望是 (a: number, b: string, x: boolean) => number
  ```

  > 本挑战来自于 [@maciejsikora](https://github.com/maciejsikora) 在 Dev.io 上的[文章](https://dev.to/macsikora/advanced-typescript-exercises-question-4-495c)

  > 在 Github 上查看：https://tsch.js.org/191/zh-CN
*/

/* _____________ 你的代码 _____________ */

/**
 * AppendArgument<Fn, A> - 在函数参数末尾追加一个新参数
 *
 * 【核心知识点】
 *
 * 1. 函数类型的条件推断
 *    - 使用 `Fn extends (...args: infer P) => infer R` 提取参数和返回值
 *    - P 是参数元组类型，R 是返回值类型
 *
 * 2. 展开运算符在类型中的应用
 *    - `...P` 可以在函数参数位置展开元组类型
 *    - `[...P, A]` 在元组末尾追加新类型
 *
 * 3. 泛型约束
 *    - `Fn extends (...args: any[]) => any` 确保 Fn 是函数类型
 *    - 非函数类型会触发 @ts-expect-error
 *
 * 【实现思路】
 *
 * 步骤1: 约束 Fn 必须是函数类型
 * 步骤2: 使用 infer 提取原函数的参数 P 和返回值 R
 * 步骤3: 构造新函数，参数为 [...P, A]，返回值为 R
 *
 * 【示例分析】
 *
 * AppendArgument<(a: number, b: string) => number, boolean>
 * 1. P = [a: number, b: string]
 * 2. R = number
 * 3. 返回 (a: number, b: string, x: boolean) => number
 */
type AppendArgument<Fn extends (...args: any[]) => any, A> =
  Fn extends (...args: infer P) => infer R
    ? (...args: [...P, A]) => R
    : never

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type Case1 = AppendArgument<(a: number, b: string) => number, boolean>
type Result1 = (a: number, b: string, x: boolean) => number

type Case2 = AppendArgument<() => void, undefined>
type Result2 = (x: undefined) => void

type cases = [
  Expect<Equal<Case1, Result1>>,
  Expect<Equal<Case2, Result2>>,
  // @ts-expect-error
  AppendArgument<unknown, undefined>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/191/answer/zh-CN
  > 查看解答：https://tsch.js.org/191/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/

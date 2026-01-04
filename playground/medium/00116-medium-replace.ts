/*
  116 - Replace
  -------
  by Anthony Fu (@antfu) #中等 #template-literal

  ### 题目

  实现 `Replace<S, From, To>` 将字符串 `S` 中的第一个子字符串 `From` 替换为 `To` 。

  例如

  ```ts
  type replaced = Replace<'types are fun!', 'fun', 'awesome'> // 期望是 'types are awesome!'
  ```

  > 在 Github 上查看：https://tsch.js.org/116/zh-CN
*/

/* _____________ 你的代码 _____________ */

/**
 * Replace<S, From, To> - 将字符串 S 中的第一个 From 替换为 To
 *
 * 【核心知识点】
 *
 * 1. 模板字面量类型 (Template Literal Types)
 *    - TypeScript 4.1 引入，允许在类型层面操作字符串
 *    - 语法：`${...}` 可以嵌入其他字符串类型
 *    - 例如：`hello ${string}` 可以匹配 'hello world'、'hello ts' 等
 *
 * 2. 条件类型中的 infer 关键字
 *    - infer 用于在条件类型中"捕获"类型
 *    - 只能在 extends 子句的 true 分支中使用
 *    - 可以同时 infer 多个类型变量
 *
 * 3. 模式匹配 (Pattern Matching)
 *    - `S extends \`${infer Before}${From}${infer After}\``
 *    - 这是字符串的模式匹配：尝试将 S 拆分为三部分
 *    - Before: From 之前的部分
 *    - From: 要被替换的子串（已知）
 *    - After: From 之后的部分
 *
 * 【实现思路】
 *
 * 步骤1: 边界处理
 *   - 如果 From 是空字符串 ''，直接返回原字符串 S
 *   - 因为空字符串可以匹配任何位置，会导致意外行为
 *
 * 步骤2: 模式匹配
 *   - 使用模板字面量 `${infer Before}${From}${infer After}` 尝试匹配
 *   - TypeScript 会找到 From 第一次出现的位置（贪婪匹配 Before 最短）
 *
 * 步骤3: 重组字符串
 *   - 匹配成功：返回 `${Before}${To}${After}`，用 To 替换 From
 *   - 匹配失败：返回原字符串 S
 *
 * 【示例分析】
 *
 * Replace<'foobarbar', 'bar', 'foo'>
 * 1. From = 'bar' 不是空串，继续
 * 2. 'foobarbar' 匹配 `${infer Before}bar${infer After}`
 *    - Before = 'foo'
 *    - After = 'bar'
 * 3. 返回 `foo` + `foo` + `bar` = 'foofoobar'
 *
 * 注意：只替换第一个匹配，第二个 'bar' 保留
 */
type Replace<S extends string, From extends string, To extends string> =
  From extends ''
    ? S
    : S extends `${infer Before}${From}${infer After}`
      ? `${Before}${To}${After}`
      : S

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Replace<'foobar', 'bar', 'foo'>, 'foofoo'>>,
  Expect<Equal<Replace<'foobarbar', 'bar', 'foo'>, 'foofoobar'>>,
  Expect<Equal<Replace<'foobarbar', '', 'foo'>, 'foobarbar'>>,
  Expect<Equal<Replace<'foobarbar', 'bar', ''>, 'foobar'>>,
  Expect<Equal<Replace<'foobarbar', 'bra', 'foo'>, 'foobarbar'>>,
  Expect<Equal<Replace<'', '', ''>, ''>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/116/answer/zh-CN
  > 查看解答：https://tsch.js.org/116/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/

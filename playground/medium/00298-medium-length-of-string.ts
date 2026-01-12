/*
  298 - Length of String
  -------
  by Pig Fang (@g-plane) #中等 #template-literal

  ### 题目

  计算字符串的长度，类似于 `String#length` 。

  > 在 Github 上查看：https://tsch.js.org/298/zh-CN
*/

/* _____________ 你的代码 _____________ */

/**
 * LengthOfString<S> - 计算字符串的长度
 *
 * 【核心知识点】
 *
 * 1. 模板字面量类型的递归解构
 *    - `S extends \`${infer First}${infer Rest}\`` 将字符串拆分为首字符和剩余部分
 *    - First: 第一个字符，Rest: 剩余字符串
 *
 * 2. 数组长度作为计数器
 *    - TypeScript 可以推断数组字面量的 length 属性
 *    - [...Acc, any] 在数组末尾添加一个元素，长度 +1
 *
 * 3. 尾递归优化思想
 *    - 使用累加器 Acc 记录当前长度
 *    - 每次递归时将计数器 +1，直到字符串为空
 *
 * 【实现思路】
 *
 * 递归过程：
 * 1. 检查字符串是否为空，空则返回累加器长度
 * 2. 将字符串拆分为 First + Rest
 * 3. 累加器添加一个元素（长度 +1）
 * 4. 递归处理剩余字符串
 *
 * 【执行示例】
 *
 * LengthOfString<'abc'>
 *
 * 第1步: S = 'abc', Acc = []
 * → 'abc' extends `${infer First}${infer Rest}` ✓
 * → First = 'a', Rest = 'bc'
 * → LengthOfString<'bc', [...[], any]>
 * → LengthOfString<'bc', [any]>
 *
 * 第2步: S = 'bc', Acc = [any]
 * → 'bc' extends `${infer First}${infer Rest}` ✓
 * → First = 'b', Rest = 'c'
 * → LengthOfString<'c', [...[any], any]>
 * → LengthOfString<'c', [any, any]>
 *
 * 第3步: S = 'c', Acc = [any, any]
 * → 'c' extends `${infer First}${infer Rest}` ✓
 * → First = 'c', Rest = ''
 * → LengthOfString<'', [...[any, any], any]>
 * → LengthOfString<'', [any, any, any]>
 *
 * 第4步: S = '', Acc = [any, any, any]
 * → '' extends `${infer First}${infer Rest}` ✗
 * → 返回 Acc['length'] = 3
 */
type LengthOfString<S extends string, Acc extends any[] = []> =
  S extends `${string}${infer Rest}`
    ? LengthOfString<Rest, [...Acc, any]>
    : Acc['length']

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<LengthOfString<''>, 0>>,
  Expect<Equal<LengthOfString<'kumiko'>, 6>>,
  Expect<Equal<LengthOfString<'reina'>, 5>>,
  Expect<Equal<LengthOfString<'Sound! Euphonium'>, 16>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/298/answer/zh-CN
  > 查看解答：https://tsch.js.org/298/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/

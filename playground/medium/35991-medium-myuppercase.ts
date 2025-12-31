/*
  35991 - MyUppercase
  -------
  by NaNix (@fusheng33) #中等

  ### 题目

  Implement `Uppercase<T>`, convert all letter to uppercase

  > 在 Github 上查看：https://tsch.js.org/35991/zh-CN
*/

/* _____________ 你的代码 _____________ */

type MyUppercase<T extends string> = any

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<MyUppercase<'a'>, 'A'>>,
  Expect<Equal<MyUppercase<'Z'>, 'Z'>>,
  Expect<Equal<MyUppercase<'A z h yy 😃cda\n\t  a   '>, 'A Z H YY 😃CDA\n\t  A   '>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/35991/answer/zh-CN
  > 查看解答：https://tsch.js.org/35991/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/

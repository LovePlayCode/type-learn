/*
  18142 - All
  -------
  by cutefcc (@cutefcc) #中等 #array

  ### 题目

  如果传入的第一个参数中所有元素都等于传入的第二个参数，则返回 true；如果有不匹配，则返回 false。

  例如：

  ```ts
  type Test1 = [1, 1, 1]
  type Test2 = [1, 1, 2]

  type Todo = All<Test1, 1> // 应与 true 相同
  type Todo2 = All<Test2, 1> // 应与 false 相同
  ```

  > 在 Github 上查看：https://tsch.js.org/18142/zh-CN
*/

/* _____________ 你的代码 _____________ */

type All = any

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<All<[1, 1, 1], 1>, true>>,
  Expect<Equal<All<[1, 1, 2], 1>, false>>,
  Expect<Equal<All<['1', '1', '1'], '1'>, true>>,
  Expect<Equal<All<['1', '1', '1'], 1>, false>>,
  Expect<Equal<All<[number, number, number], number>, true>>,
  Expect<Equal<All<[number, number, string], number>, false>>,
  Expect<Equal<All<[null, null, null], null>, true>>,
  Expect<Equal<All<[[1], [1], [1]], [1]>, true>>,
  Expect<Equal<All<[{}, {}, {}], {}>, true>>,
  Expect<Equal<All<[never], never>, true>>,
  Expect<Equal<All<[any], any>, true>>,
  Expect<Equal<All<[unknown], unknown>, true>>,
  Expect<Equal<All<[any], unknown>, false>>,
  Expect<Equal<All<[unknown], any>, false>>,
  Expect<Equal<All<[1, 1, 2], 1 | 2>, false>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/18142/answer/zh-CN
  > 查看解答：https://tsch.js.org/18142/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/

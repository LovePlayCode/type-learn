/*
  529 - Absolute
  -------
  by Andrey Krasovsky (@bre30kra69cs) #中等 #math #template-literal

  ### 题目

  实现一个接收string,number或bigInt类型参数的`Absolute`类型,返回一个正数字符串。

  例如

  ```ts
  type Test = -100;
  type Result = Absolute<Test>; // expected to be "100"
  ```

  > 在 Github 上查看：https://tsch.js.org/529/zh-CN
*/

/* _____________ 你的代码 _____________ */

/**
 * Absolute<T> - 获取数字的绝对值（返回字符串）
 *
 * 【核心知识点】
 *
 * 1. 模板字面量类型的字符串化
 *    - `${T}` 将 number、bigint 转换为字符串类型
 *    - 例如：`${-100}` → `"-100"`，`${100n}` → `"100"`
 *
 * 2. 模板字面量的模式匹配
 *    - `\`-${infer Rest}\`` 匹配以负号开头的字符串
 *    - infer Rest 捕获负号后面的数字部分
 *
 * 3. 类型的统一处理
 *    - 先将所有输入转为字符串：`${T}`
 *    - 再进行字符串层面的负号处理
 *
 * 【实现思路】
 *
 * 1. 将输入 T 转换为字符串类型：`${T}`
 * 2. 检查字符串是否以 "-" 开头
 * 3. 如果是负数，去掉负号返回 Rest
 * 4. 如果是正数或零，直接返回字符串
 *
 * 【执行示例】
 *
 * Absolute<-100>
 * 1. `${-100}` → `"-100"`
 * 2. `"-100"` extends `\`-${infer Rest}\`` ✓
 * 3. Rest = `"100"`
 * 4. 返回 `"100"`
 *
 * Absolute<100>
 * 1. `${100}` → `"100"`
 * 2. `"100"` extends `\`-${infer Rest}\`` ✗
 * 3. 返回 `"100"`
 *
 * Absolute<-1_000_000n>
 * 1. `${-1_000_000n}` → `"-1000000"`（bigint 的下划线会被移除）
 * 2. `"-1000000"` extends `\`-${infer Rest}\`` ✓
 * 3. Rest = `"1000000"`
 * 4. 返回 `"1000000"`
 *
 * 【特殊情况处理】
 *
 * - `-0` 和 `0` 都会转换为 `"0"`
 * - `'-0'` 字符串会匹配负号模式，返回 `"0"`
 * - bigint 的数字分隔符（下划线）在字符串化时会自动移除
 */
type Absolute<T extends number | string | bigint> = `${T}` extends `-${infer Rest}`
  ? Rest
  : `${T}`

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Absolute<0>, '0'>>,
  Expect<Equal<Absolute<-0>, '0'>>,
  Expect<Equal<Absolute<10>, '10'>>,
  Expect<Equal<Absolute<-5>, '5'>>,
  Expect<Equal<Absolute<'0'>, '0'>>,
  Expect<Equal<Absolute<'-0'>, '0'>>,
  Expect<Equal<Absolute<'10'>, '10'>>,
  Expect<Equal<Absolute<'-5'>, '5'>>,
  Expect<Equal<Absolute<-1_000_000n>, '1000000'>>,
  Expect<Equal<Absolute<9_999n>, '9999'>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/529/answer/zh-CN
  > 查看解答：https://tsch.js.org/529/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/

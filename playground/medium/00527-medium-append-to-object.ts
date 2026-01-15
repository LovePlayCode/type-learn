/*
  527 - Append to object
  -------
  by Andrey Krasovsky (@bre30kra69cs) #中等 #object-keys

  ### 题目

  实现一个为接口添加一个新字段的类型。该类型接收三个参数，返回带有新字段的接口类型。

  例如:

  ```ts
  type Test = { id: '1' }
  type Result = AppendToObject<Test, 'value', 4> // expected to be { id: '1', value: 4 }
  ```

  > 在 Github 上查看：https://tsch.js.org/527/zh-CN
*/

/* _____________ 你的代码 _____________ */

/**
 * AppendToObject<T, U, V> - 向对象类型添加新属性
 *
 * 【核心知识点】
 *
 * 1. 映射类型 (Mapped Types)
 *    - { [K in keyof T | U]: ... } 遍历所有可能的键
 *    - keyof T | U 包含原对象的所有键和新键 U
 *
 * 2. 条件类型在映射中的应用
 *    - K extends keyof T ? T[K] : V
 *    - 如果 K 是原对象的键，保留原值 T[K]
 *    - 如果 K 是新键 U，使用新值 V
 *
 * 3. 泛型约束
 *    - U extends PropertyKey 确保 U 可以作为对象的键
 *    - PropertyKey = string | number | symbol
 *
 * 【为什么不用交叉类型？】
 *
 * 交叉类型 T & { [K in U]: V } 在某些情况下可能不满足严格的类型检查，
 * 特别是在 type-challenges 的测试环境中。映射类型重构能确保：
 * 1. 属性顺序一致
 * 2. 类型结构完全匹配期望
 * 3. 更好的类型推断
 *
 * 【实现思路】
 *
 * 1. 使用 keyof T | U 获取所有可能的键
 * 2. 对每个键 K 进行条件判断：
 *    - 如果 K 属于原对象，保留原值 T[K]
 *    - 如果 K 是新键 U，使用新值 V
 * 3. 重新构造整个对象类型
 *
 * 【示例分析】
 *
 * AppendToObject<{ id: '1' }, 'value', 4>
 *
 * 步骤1: keyof { id: '1' } | 'value' = 'id' | 'value'
 * 步骤2: 映射每个键
 * - K = 'id': 'id' extends keyof { id: '1' } ? '1' : 4 → '1'
 * - K = 'value': 'value' extends keyof { id: '1' } ? never : 4 → 4
 * 步骤3: 结果 { id: '1', value: 4 }
 */

// 交叉类型 T & { [K in U]: V } 在 type-challenges 的严格测试中可能不匹配期望的类型结构
type AppendToObject<T, U extends PropertyKey, V> = {
  [K in keyof T | U]: K extends keyof T ? T[K] : V
}

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type test1 = {
  key: 'cat'
  value: 'green'
}

type testExpect1 = {
  key: 'cat'
  value: 'green'
  home: boolean
}

type test2 = {
  key: 'dog' | undefined
  value: 'white'
  sun: true
}

type testExpect2 = {
  key: 'dog' | undefined
  value: 'white'
  sun: true
  home: 1
}

type test3 = {
  key: 'cow'
  value: 'yellow'
  sun: false
}

type testExpect3 = {
  key: 'cow'
  value: 'yellow'
  sun: false
  moon: false | undefined
}

type cases = [
  Expect<Equal<AppendToObject<test1, 'home', boolean>, testExpect1>>,
  Expect<Equal<AppendToObject<test2, 'home', 1>, testExpect2>>,
  Expect<Equal<AppendToObject<test3, 'moon', false | undefined>, testExpect3>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/527/answer/zh-CN
  > 查看解答：https://tsch.js.org/527/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/

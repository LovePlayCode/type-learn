/*
  296 - Permutation
  -------
  by Naoto Ikuno (@pandanoir) #中等 #union

  ### 题目

  实现联合类型的全排列，将联合类型转换成所有可能的全排列数组的联合类型。

  ```typescript
  type perm = Permutation<'A' | 'B' | 'C'>; // ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']
  ```

  > 在 Github 上查看：https://tsch.js.org/296/zh-CN
*/

/* _____________ 你的代码 _____________ */

/**
 * Permutation<T> - 生成联合类型的全排列
 *
 * 【核心知识点】
 *
 * 1. 联合类型的分发特性 (Distributive Conditional Types)
 *    - 当 T 是联合类型时，`T extends any` 会对每个成员分别处理
 *    - 例如：`'A' | 'B' extends any` 会分别处理 'A' 和 'B'
 *
 * 2. never 的特殊处理
 *    - `never extends any` 不会进入 true 分支，直接返回 never
 *    - 需要用 `[T] extends [never]` 来检测 never（包装后避免分发）
 *
 * 3. Exclude<T, K> 工具类型
 *    - 从联合类型 T 中排除 K
 *    - 用于递归时"移除"当前处理的元素
 *
 * 4. 保留原始联合类型
 *    - 使用额外的泛型参数 K = T 保存原始联合类型
 *    - 因为 T extends any 后，T 变成了单个成员，需要 K 来做 Exclude
 *
 * 【详细执行步骤】以 Permutation<'A' | 'B' | 'C'> 为例
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │ 第1步：初始调用                                                          │
 * │ Permutation<'A' | 'B' | 'C'>                                            │
 * │ T = 'A' | 'B' | 'C', K = 'A' | 'B' | 'C'                                │
 * │                                                                         │
 * │ [T] extends [never]? → ['A'|'B'|'C'] extends [never]? → false           │
 * │ 进入 T extends any 分支，触发分发！                                       │
 * └─────────────────────────────────────────────────────────────────────────┘
 *                              ↓ 分发为3个分支
 *     ┌───────────────────────┼───────────────────────┐
 *     ↓                       ↓                       ↓
 * ┌─────────────┐       ┌─────────────┐       ┌─────────────┐
 * │ T = 'A'     │       │ T = 'B'     │       │ T = 'C'     │
 * │ K = 原始联合 │       │ K = 原始联合 │       │ K = 原始联合 │
 * └─────────────┘       └─────────────┘       └─────────────┘
 *       ↓                     ↓                     ↓
 * ['A', ...P<'B'|'C'>]  ['B', ...P<'A'|'C'>]  ['C', ...P<'A'|'B'>]
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │ 第2步：递归展开 Permutation<'B' | 'C'>（以 'A' 分支为例）                  │
 * │                                                                         │
 * │ T = 'B' | 'C', K = 'B' | 'C'                                            │
 * │ [T] extends [never]? → false，继续分发                                   │
 * └─────────────────────────────────────────────────────────────────────────┘
 *                    ↓ 分发为2个分支
 *           ┌───────┴───────┐
 *           ↓               ↓
 *       T = 'B'         T = 'C'
 *           ↓               ↓
 *   ['B', ...P<'C'>]  ['C', ...P<'B'>]
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │ 第3步：递归展开 Permutation<'C'>（最后一个元素）                           │
 * │                                                                         │
 * │ T = 'C', K = 'C'                                                        │
 * │ [T] extends [never]? → false                                            │
 * │ T extends any → T = 'C'                                                 │
 * │ ['C', ...Permutation<Exclude<'C', 'C'>>]                                │
 * │ ['C', ...Permutation<never>]                                            │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │ 第4步：递归终止 Permutation<never>                                       │
 * │                                                                         │
 * │ T = never                                                               │
 * │ [T] extends [never]? → [never] extends [never]? → true!                 │
 * │ 返回 []                                                                  │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │ 第5步：回溯合并结果                                                       │
 * │                                                                         │
 * │ Permutation<'C'> = ['C', ...[]] = ['C']                                 │
 * │ Permutation<'B'> = ['B', ...[]] = ['B']                                 │
 * │                                                                         │
 * │ Permutation<'B' | 'C'> = ['B', ...['C']] | ['C', ...['B']]              │
 * │                       = ['B', 'C'] | ['C', 'B']                         │
 * │                                                                         │
 * │ 同理：                                                                   │
 * │ Permutation<'A' | 'C'> = ['A', 'C'] | ['C', 'A']                        │
 * │ Permutation<'A' | 'B'> = ['A', 'B'] | ['B', 'A']                        │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │ 第6步：最终结果                                                          │
 * │                                                                         │
 * │ Permutation<'A' | 'B' | 'C'>                                            │
 * │ = ['A', ...(['B','C'] | ['C','B'])]                                     │
 * │ | ['B', ...(['A','C'] | ['C','A'])]                                     │
 * │ | ['C', ...(['A','B'] | ['B','A'])]                                     │
 * │                                                                         │
 * │ = ['A','B','C'] | ['A','C','B']                                         │
 * │ | ['B','A','C'] | ['B','C','A']                                         │
 * │ | ['C','A','B'] | ['C','B','A']                                         │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * 【为什么需要 K = T？】
 *
 * 问题：在 `T extends any` 分发后，T 变成了单个成员（如 'A'）
 *
 * 错误写法：
 * type Wrong<T> = T extends any ? [T, ...Wrong<Exclude<T, T>>] : never
 * // 当 T = 'A' 时，Exclude<'A', 'A'> = never，丢失了 'B' 和 'C'！
 *
 * 正确写法：
 * type Right<T, K = T> = T extends any ? [T, ...Right<Exclude<K, T>>] : never
 * // K 始终保持原始联合类型 'A' | 'B' | 'C'
 * // 当 T = 'A' 时，Exclude<K, T> = Exclude<'A'|'B'|'C', 'A'> = 'B' | 'C' ✓
 *
 * 【为什么用 [T] extends [never] 而不是 T extends never？】
 *
 * - `T extends never` 当 T 是 never 时，条件类型直接返回 never（不进入任何分支）
 * - `[T] extends [never]` 将 T 包装成元组，避免分发特性，可以正确检测 never
 */
type Permutation<T, K = T> =
  [T] extends [never]
    ? []
    : T extends any
      ? [T, ...Permutation<Exclude<K, T>>]
      : never

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Permutation<'A'>, ['A']>>,
  Expect<Equal<Permutation<'A' | 'B' | 'C'>, ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']>>,
  Expect<Equal<Permutation<'B' | 'A' | 'C'>, ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']>>,
  Expect<Equal<Permutation<boolean>, [false, true] | [true, false]>>,
  Expect<Equal<Permutation<never>, []>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/296/answer/zh-CN
  > 查看解答：https://tsch.js.org/296/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/

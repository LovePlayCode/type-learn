/*
  20 - Promise.all
  -------
  by Anthony Fu (@antfu) #中等 #array #promise

  ### 题目

  给函数`PromiseAll`指定类型，它接受元素为 Promise 或者类似 Promise 的对象的数组，返回值应为`Promise<T>`，其中`T`是这些 Promise 的结果组成的数组。

  ```ts
  const promise1 = Promise.resolve(3);
  const promise2 = 42;
  const promise3 = new Promise<string>((resolve, reject) => {
    setTimeout(resolve, 100, 'foo');
  });

  // 应推导出 `Promise<[number, 42, string]>`
  const p = PromiseAll([promise1, promise2, promise3] as const)
  ```

  > 在 Github 上查看：https://tsch.js.org/20/zh-CN
*/
const qwe = [12,3,4] as const
declare function zhuanhuan<T extends any[]>(values: readonly [...T]): {
  [key in keyof T]: T[key]
}

// 数组字面量 [1, 2, 3] 直接传入函数 [...T] 语法让 TypeScript 将其推断为元组
const ll = zhuanhuan([1,2,3])

// qwe 在声明时已经被推断为 number[] （普通数组）
// 传入函数时，TypeScript 用的是 qwe 已有的类型 number[]
// [...T] 无法"恢复"已经丢失的元组信息

const l2 = zhuanhuan(qwe)
/* _____________ 你的代码 _____________ */
/**
 * T 直接作为参数类型时，TypeScript 倾向于推断为数组类型
   [...T] 告诉 TypeScript 这是一个展开的元组，需要保留每个位置的类型信息
 * @param values 
 */
declare function PromiseAll<T extends any[]>(values: [...T]): Promise<{
  [key in keyof T]: Awaited<T[key]>
}>
/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

const promiseAllTest1 = PromiseAll([1, 2, 3] as const)
const promiseAllTest2 = PromiseAll([1, 2, Promise.resolve(3)] as const)
const promiseAllTest3 = PromiseAll([1, 2, Promise.resolve(3)])
const promiseAllTest4 = PromiseAll<Array<number | Promise<number>>>([1, 2, 3])
const promiseAllTest5 = PromiseAll<(number | Promise<string>)[]>([1, 2, Promise.resolve('3')])

type cases = [
  Expect<Equal<typeof promiseAllTest1, Promise<[1, 2, 3]>>>,
  Expect<Equal<typeof promiseAllTest2, Promise<[1, 2, number]>>>,
  Expect<Equal<typeof promiseAllTest3, Promise<[number, number, number]>>>,
  Expect<Equal<typeof promiseAllTest4, Promise<number[]>>>,
  Expect<Equal<typeof promiseAllTest5, Promise<(number | string)[]>>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/20/answer/zh-CN
  > 查看解答：https://tsch.js.org/20/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/

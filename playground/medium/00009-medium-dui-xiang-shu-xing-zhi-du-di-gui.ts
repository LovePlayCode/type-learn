/*
  9 - 对象属性只读（递归）
  -------
  by Anthony Fu (@antfu) #中等 #readonly #object-keys #deep

  ### 题目

  实现一个泛型 `DeepReadonly<T>`，它将对象的每个参数及其子对象递归地设为只读。

  您可以假设在此挑战中我们仅处理对象。不考虑数组、函数、类等。但是，您仍然可以通过覆盖尽可能多的不同案例来挑战自己。

  例如

  ```ts
  type X = {
    x: {
      a: 1
      b: 'hi'
    }
    y: 'hey'
  }

  type Expected = {
    readonly x: {
      readonly a: 1
      readonly b: 'hi'
    }
    readonly y: 'hey'
  }

  type Todo = DeepReadonly<X> // should be same as `Expected`
  ```

  > 在 Github 上查看：https://tsch.js.org/9/zh-CN
*/
type Hmm<T> = keyof T extends never ? true : false
type X11 = Hmm<{ a: string }> // false, "a" is a known key
type X22 = Hmm<{}> // true, there are no known keys
type X3 = Hmm<object> // true, there are no known keys
type X4 = Hmm<string> // false, there are keys like "toUpperCase"
type X5 = Hmm<
    { a: string } | { b: string }
> // true, unions with no common keys have no known keys
/* _____________ 你的代码 _____________ */

type DeepReadonly<T> = T extends object
  ? keyof T extends never
    ? T
    : { readonly [P in keyof T]: DeepReadonly<T[P]> }
  : T

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<DeepReadonly<X1>, Expected1>>,
  Expect<Equal<DeepReadonly<X2>, Expected2>>,
]

type X1 = {
  a: () => 22
  b: string
  c: {
    d: boolean
    e: {
      g: {
        h: {
          i: true
          j: 'string'
        }
        k: 'hello'
      }
      l: [
        'hi',
        {
          m: ['hey']
        },
      ]
    }
  }
}

type X2 = { a: string } | { b: number }

type Expected1 = {
  readonly a: () => 22
  readonly b: string
  readonly c: {
    readonly d: boolean
    readonly e: {
      readonly g: {
        readonly h: {
          readonly i: true
          readonly j: 'string'
        }
        readonly k: 'hello'
      }
      readonly l: readonly [
        'hi',
        {
          readonly m: readonly ['hey']
        },
      ]
    }
  }
}

type Expected2 = { readonly a: string } | { readonly b: number }

/* _____________ 下一步 _____________ */
/*
* https://github.com/type-challenges/type-challenges/issues/187
  > 分享你的解答：https://tsch.js.org/9/answer/zh-CN
  > 查看解答：https://tsch.js.org/9/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/

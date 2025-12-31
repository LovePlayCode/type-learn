/*
  8 - 对象部分属性只读
  -------
  by Anthony Fu (@antfu) #中等 #readonly #object-keys

  ### 题目

  实现一个泛型`MyReadonly2<T, K>`，它带有两种类型的参数`T`和`K`。

  类型 `K` 指定 `T` 中要被设置为只读 (readonly) 的属性。如果未提供`K`，则应使所有属性都变为只读，就像普通的`Readonly<T>`一样。

  例如

  ```ts
  interface Todo {
    title: string
    description: string
    completed: boolean
  }

  const todo: MyReadonly2<Todo, 'title' | 'description'> = {
    title: "Hey",
    description: "foobar",
    completed: false,
  }

  todo.title = "Hello" // Error: cannot reassign a readonly property
  todo.description = "barFoo" // Error: cannot reassign a readonly property
  todo.completed = true // OK
  ```

  > 在 Github 上查看：https://tsch.js.org/8/zh-CN
*/
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}
/* _____________ 你的代码 _____________ */

/**
 * 分发条件类型 (Distributive Conditional Types)。
一旦你使用了 K extends ... 这种条件判断，且 K 是一个泛型参数，当 K 是一个 联合类型 (Union Type) 时（keyof T 正是一个联合类型），TypeScript 就会自动把这个类型“拆开”分别处理，最后再用 | 合并起来。
  官网学习地址: https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types
*/
// type MyReadonly2<T, K extends keyof T = keyof T> = K extends null|undefined ? Readonly<T> : {
//   readonly [key in K]: T[key]
// }
type  MyReadonly2<T,K extends keyof T = keyof T> = Omit<T,K> & {
  readonly [P in K]: T[P]
}
type abc = {age: string} & {readonly name:string}
const kkk: abc = {
  age: 'asd',
  name: 'asd'
}
kkk.age = '23'
kkk.name = 'd'
const c: MyReadonly2<Todo> = {}
type r = MyReadonly2<Todo1, 'title' | 'description'>
type MyPick<T, K extends keyof T> = {
  [p in K]: T[p]  // 映射类型在对象字面量内部
}
const a: MyReadonly2<{age:number;name:string},'age'|'name'> = {
  'age': 2,
  name: '123'
}
/* _____________ 测试用例 _____________ */
import type { Alike, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Alike<MyReadonly2<Todo1>, Readonly<Todo1>>>,
  Expect<Alike<MyReadonly2<Todo1, 'title' | 'description'>, Expected>>,
  Expect<Alike<MyReadonly2<Todo2, 'title' | 'description'>, Expected>>,
  Expect<Alike<MyReadonly2<Todo2, 'description' >, Expected>>,
]

// @ts-expect-error
type error = MyReadonly2<Todo1, 'title' | 'invalid'>

interface Todo1 {
  title: string
  description?: string
  completed: boolean
}

interface Todo2 {
  readonly title: string
  description?: string
  completed: boolean
}

interface Expected {
  readonly title: string
  readonly description?: string
  completed: boolean
}

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/8/answer/zh-CN
  > 查看解答：https://tsch.js.org/8/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/

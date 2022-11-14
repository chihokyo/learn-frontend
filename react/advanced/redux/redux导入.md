# 导入

这里主要是说从 dispatch 和 action 的源头来考虑的。

首先写一个常规的，没有任何 redux 的东西。只最基础的数据操作。

```jsx
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import './App.css';

// 记录全局时间戳
let idSeq = Date.now();
// input框
const Control = memo((props) => {
  const { addTodo } = props;
  const inputRef = useRef();
  const onSubmit = (e) => {
    // 阻止默认行为
    e.preventDefault();
    const newText = inputRef.current.value?.trim();
    if (newText.length === 0) {
      return;
    }
    addTodo({
      id: ++idSeq,
      text: newText,
      complete: false,
    });
    inputRef.current.value = '';
  };
  return (
    <div className="control">
      <h1>todos</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          className="new-todo"
          placeholder="what needs to be done"
          ref={inputRef}
        />
      </form>
    </div>
  );
});

// 展示todoitem
const TodoItem = memo((props) => {
  const { todo, toggleTodo, removeTodo } = props;
  const { id, text, complete } = todo;
  const onChange = () => {
    toggleTodo(id);
  };
  const onRemove = () => {
    removeTodo(id);
  };

  return (
    <div>
      <li className="todo-item">
        <input type="checkbox" onChange={onChange} checked={complete} />
      </li>
      <label className={complete ? 'complete' : ''}>{text}</label>
      <button onClick={onRemove}>&#xd7;</button>
    </div>
  );
});

// 展示todo
const Todos = memo((props) => {
  const { todos, toggleTodo, removeTodo } = props;
  return (
    <ul>
      {todos.map((todo) => {
        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleTodo={toggleTodo}
            removeTodo={removeTodo}
          />
        );
      })}
    </ul>
  );
});

/**
 * 主函数
 */
const TodoList = () => {
  const [todos, setTodos] = useState([]);

  // 操作数据逻辑 【因为传递的都是函数，所以下面的所有函数都用useCallback】
  const addTodo = useCallback((todo) => {
    // 这里是用的函数，而不是直接使用的todos，可以避免对todos的依赖
    setTodos((todos) => [...todos, todo]);
  }, []);

  const removeTodo = useCallback((id) => {
    setTodos((todos) =>
      // 过滤出所有不符合条件的
      todos.filter((todo) => {
        return todo.id !== id;
      })
    );
    // 这里没有需要依赖的 以下同理
  }, []);

  const toggleTodo = useCallback((id) => {
    setTodos((todos) =>
      todos.map((todo) => {
        // 这里就是指定id的状态是否为已完成
        return todo.id === id
          ? {
              ...todo,
              complete: !todo.complete,
            }
          : todo;
      })
    );
  }, []);

  // 从getItem里取出
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem('todo_key') || '[]');
    setTodos(todos);
  }, []);

  // 只要todos发生变化
  useEffect(() => {
    localStorage.setItem('todo_key', JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="todo-list">
      <Control addTodo={addTodo} />
      <Todos removeTodo={removeTodo} toggleTodo={toggleTodo} todos={todos} />
    </div>
  );
};

export default TodoList;
```

上面的代码很多，主要看这里

```jsx
const addTodo {setTodos((todos) => [...todos, todo]);}
const removeTodo {setTodos((todos) =>
      todos.filter((todo) => {
        return todo.id !== id;
      })
    );}
const toggleTodo...
// 这里都在写一些逻辑操作
```

可以看到上面的逻辑操作数据的东西，其实不外乎就是，对于数据是怎么操作的，以及操作啥数据

怎么操作的 → 增删改查 就可以写成 `"set","add"...`这样 → 于是就诞生了 type

操作啥数据 → 就可以直接把要什么数据写在这里 → 于是就诞生 payload

## dispatch 登场

下面这段代码会很长，但是重点其实就那几个。

```jsx
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import './App.css';

// 记录全局时间戳
let idSeq = Date.now();
// input框
const Control = memo((props) => {
  const { dispatch } = props;
  const inputRef = useRef();
  const onSubmit = (e) => {
    // 阻止默认行为
    e.preventDefault();
    const newText = inputRef.current.value?.trim();
    if (newText.length === 0) {
      return;
    }
    dispatch({
      type: 'add',
      payload: {
        id: ++idSeq,
        text: newText,
        complete: false,
      },
    });
    inputRef.current.value = '';
  };
  return (
    <div className="control">
      <h1>todos</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          className="new-todo"
          placeholder="what needs to be done"
          ref={inputRef}
        />
      </form>
    </div>
  );
});

// 展示todoitem
const TodoItem = memo((props) => {
  const { todo, dispatch } = props;
  const { id, text, complete } = todo;
  const onChange = () => {
    dispatch({
      type: 'toggle',
      payload: id,
    });
  };
  const onRemove = () => {
    dispatch({
      type: 'remove',
      payload: id,
    });
  };

  return (
    <div>
      <li className="todo-item">
        <input type="checkbox" onChange={onChange} checked={complete} />
      </li>
      <label className={complete ? 'complete' : ''}>{text}</label>
      <button onClick={onRemove}>&#xd7;</button>
    </div>
  );
});

// 展示todo
const Todos = memo((props) => {
  const { todos, dispatch } = props;
  return (
    <ul>
      {todos.map((todo) => {
        return <TodoItem key={todo.id} todo={todo} dispatch={dispatch} />;
      })}
    </ul>
  );
});

/**
 * 主函数
 */
const TodoList = () => {
  const [todos, setTodos] = useState([]);

  // 上面的操作不是很清晰 所有的数据库操作都分散在各个地方 无法做到统一管理
  // 比如你想找到一个操作数据的部分，难道要找
  //   {
  //     type:"add",
  //     payload:todo
  //   } // Action

  const dispatch = useCallback((action) => {
    const { type, payload } = action;
    switch (type) {
      case 'set':
        setTodos(payload);
        break;
      case 'add':
        setTodos((todos) => [...todos, payload]);
        break;
      case 'remove':
        setTodos((todos) =>
          // 过滤出所有不符合条件的
          todos.filter((todo) => {
            return todo.id !== payload;
          })
        );
        break;
      case 'toggle':
        setTodos((todos) =>
          todos.map((todo) => {
            // 这里就是指定id的状态是否为已完成
            return todo.id === payload
              ? {
                  ...todo,
                  complete: !todo.complete,
                }
              : todo;
          })
        );
        break;
      default:
    }
  }, []);

  // 从getItem里取出
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem('todo_key') || '[]');
    // setTodos(todos); 修改之前 为什么要这么修改呢？因为这样可以统一在一个地方
    dispatch({ type: 'set', payload: todos });
  }, []);

  // 只要todos发生变化
  useEffect(() => {
    localStorage.setItem('todo_key', JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="todo-list">
      <Control dispatch={dispatch} />
      <Todos dispatch={dispatch} todos={todos} />
    </div>
  );
};

export default TodoList;
```

上面的重点就是操作数据的部分全部都浓缩在了 dispatch，因为主要的就是 type 和 payload 的话。那么直接用一个函数，传入参数进行操作不就行了。也就是说重点就是这里。👇🏻 把所有的操作数据都集合在这里

```jsx
const dispatch = useCallback((action) => {
  const { type, payload } = action;
  switch (type) {
    case 'set':
      setTodos(payload);
      break;
    case 'add':
      setTodos((todos) => [...todos, payload]);
      break;
    case 'remove':
      setTodos((todos) =>
        // 过滤出所有不符合条件的
        todos.filter((todo) => {
          return todo.id !== payload;
        })
      );
      break;
    case 'toggle':
      setTodos((todos) =>
        todos.map((todo) => {
          // 这里就是指定id的状态是否为已完成
          return todo.id === payload
            ? {
                ...todo,
                complete: !todo.complete,
              }
            : todo;
        })
      );
      break;
    default:
  }
}, []);
```

集合在这里之后发现了一个好处就是传递给子组件的东西也少了

```jsx
// before
<TodoItem
  key={todo.id}
  todo={todo}
  toggleTodo={toggleTodo}
  removeTodo={removeTodo}
/>
//after 现在只要传递dispatch就可以
<TodoItem key={todo.id} todo={todo} dispatch={dispatch} />;

// 然后各种操作，只要发送dispatch就行了
dispatch({
  type: 'add',
  payload: {
    id: ++idSeq,
    text: newText,
    complete: false,
  },
});
```

> 但是上面也有个地方就是 dispatch 每次发送的时候都要写 type 和 payload。
>
> 这样感觉太麻烦了，于是就浓缩成了一个函数，函数里面写 payload。
>
> 比较像是 type 变成了一个函数名，然后参数就是 payload

## actionCreator 登场

这里进行转换

```jsx
export function createSet(payload) {
  return {
    type: 'set',
    payload,
  };
}

export function createAdd(payload) {
  return {
    type: 'add',
    payload,
  };
}

export function createRemove(payload) {
  return {
    type: 'remove',
    payload,
  };
}

export function createToggle(payload) {
  return {
    type: 'toggle',
    payload,
  };
}
```

然后之前还要一个个在 dispatch 里写上 type，payload，这次不用写了都。

```jsx
// before
dispatch({
  type: 'add',
  payload: {
    id: ++idSeq,
    text: newText,
    complete: false,
  },
});
inputRef.current.value = '';
};
// after
dispatch(
  createAdd({
    id: ++idSeq,
    text: newText,
    complete: false,
  })
);
```

### 进一步封装

但是其实，你可以一步到位，直接在 action.js 里传递就好。不用每次都在*App.jsx*进行调用了。

```jsx
// 那么我直接这样可以不可以呢？
// addTodo = (payload) => dispatch(createAdd(payload));
// {
//     addTodo,createAdd,
//     removeTodo,createRemove
// }
```

那怎么才可以一步到达这个位置呢？难道每次都要手动写吗？那么就需要封装。

```jsx
{
  addTodo, createAdd, removeTodo, createRemove;
}
// 自动每次都是这样呢？
addTodo = (payload) => dispatch(createAdd(payload));
```

这个函数很难，主要是看到输入和输出。

输入的是参数 1{addTodo 是个字符串，createAdd 是一个函数}，参数 2 是一个 dispatch

输出的是一个数组，此时的数组 key 是 addTodo，value 是一个实现了 dispatch 功能的函数了。

相当于组合了。这个一定要好好看。这里的本质就是把 action 和 dispatch 进行了打包。

```jsx
// <Control {...bindActionCreators({ addTodo: createAdd }, dispatch)} />
// 参数1 对象 参数2 dispatch
function bindActionCreators(actionCreators, dispatch) {
  const ret = {};
  for (let key in actionCreators) {
    // ret[key]就是一个 addTodo 相当于ret[addTodo]
    ret[key] = function (...args) {
      // createAdd找到这个函数
      const actionCreator = actionCreators[key];
      //   createAdd(..args)
      const action = actionCreator(...args);
      // dispatch(createAdd(..args));
      dispatch(action);
      // 也就是
    };
  }
  // 相当于传递的只是俩参数名的对象，但出来的参数名+分发dispatch的函数
  return ret;
}
```

这样就一步步推导出来了。 这个函数最大的作用就是只用 addTodo 就完成了**action+dispatch 的任务。进一步封装。**

最后的完成版是这样的。

`App.jsx`

```jsx
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { createAdd, createRemove, createSet, createToggle } from './action';
import './App.css';

// 记录全局时间戳
let idSeq = Date.now();

// <Control {...bindActionCreators({ addTodo: createAdd }, dispatch)} />
// 参数1 对象 参数2 dispatch
function bindActionCreators(actionCreators, dispatch) {
  const ret = {};
  for (let key in actionCreators) {
    // ret[key]就是一个 addTodo 相当于ret[addTodo]
    ret[key] = function (...args) {
      // createAdd找到这个函数
      const actionCreator = actionCreators[key];
      //   createAdd(..args)
      const action = actionCreator(...args);
      // dispatch(createAdd(..args));
      dispatch(action);
      // 也就是
    };
  }
  // 相当于传递的只是俩参数名的对象，但出来的参数名+分发dispatch的函数
  return ret;
}

// input框
const Control = memo((props) => {
  const { addTodo } = props;
  const inputRef = useRef();
  const onSubmit = (e) => {
    // 阻止默认行为
    e.preventDefault();
    const newText = inputRef.current.value?.trim();
    if (newText.length === 0) {
      return;
    }
    addTodo({
      id: ++idSeq,
      text: newText,
      complete: false,
    });
    inputRef.current.value = '';
  };
  return (
    <div className="control">
      <h1>todos</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          className="new-todo"
          placeholder="what needs to be done"
          ref={inputRef}
        />
      </form>
    </div>
  );
});

// 展示todoitem
const TodoItem = memo((props) => {
  const { todo, removeTodo, toggleTodo } = props;
  const { id, text, complete } = todo;
  const onChange = () => {
    toggleTodo(id);
  };
  const onRemove = () => {
    removeTodo(id);
  };

  return (
    <div>
      <li className="todo-item">
        <input type="checkbox" onChange={onChange} checked={complete} />
      </li>
      <label className={complete ? 'complete' : ''}>{text}</label>
      <button onClick={onRemove}>&#xd7;</button>
    </div>
  );
});

// 展示todo
const Todos = memo((props) => {
  const { todos, removeTodo, toggleTodo } = props;
  return (
    <ul>
      {todos.map((todo) => {
        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            removeTodo={removeTodo}
            toggleTodo={toggleTodo}
          />
        );
      })}
    </ul>
  );
});

/**
 * 主函数
 */
const TodoList = () => {
  const [todos, setTodos] = useState([]);

  // 上面的操作不是很清晰 所有的数据库操作都分散在各个地方 无法做到统一管理
  // 比如你想找到一个操作数据的部分，难道要找
  //   {
  //     type:"add",
  //     payload:todo
  //   } // Action

  const dispatch = useCallback((action) => {
    const { type, payload } = action;
    switch (type) {
      case 'set':
        setTodos(payload);
        break;
      case 'add':
        setTodos((todos) => [...todos, payload]);
        break;
      case 'remove':
        setTodos((todos) =>
          // 过滤出所有不符合条件的
          todos.filter((todo) => {
            return todo.id !== payload;
          })
        );
        break;
      case 'toggle':
        setTodos((todos) =>
          todos.map((todo) => {
            // 这里就是指定id的状态是否为已完成
            return todo.id === payload
              ? {
                  ...todo,
                  complete: !todo.complete,
                }
              : todo;
          })
        );
        break;
      default:
    }
  }, []);

  // 从getItem里取出
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem('todo_key') || '[]');
    // setTodos(todos); 修改之前 为什么要这么修改呢？因为这样可以统一在一个地方
    dispatch(createSet(todos));
  }, []);

  // 只要todos发生变化
  useEffect(() => {
    localStorage.setItem('todo_key', JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="todo-list">
      <Control {...bindActionCreators({ addTodo: createAdd }, dispatch)} />
      <Todos
        {...bindActionCreators(
          { removeTodo: createRemove, toggleTodo: createToggle },
          dispatch
        )}
        todos={todos}
      />
    </div>
  );
};

export default TodoList;
```

`action.js`

```js
export function createSet(payload) {
  return {
    type: 'set',
    payload,
  };
}

// 那么我直接这样可以不可以呢？
// addTodo = (payload) => dispatch(createAdd(payload));
// {
//     addTodo,createAdd,
//     removeTodo,createRemove
// }

export function createAdd(payload) {
  return {
    type: 'add',
    payload,
  };
}

export function createRemove(payload) {
  return {
    type: 'remove',
    payload,
  };
}

export function createToggle(payload) {
  return {
    type: 'toggle',
    payload,
  };
}
```

> 但是上面也是有弊端的，很复杂。
>
> 而且如果我引入了一个新的 state，并且每次更新 todos 的时候也更新另一个 state 呢？

```jsx
switch (type) {
  case 'set':
    setTodos(payload);
    seCount(count + 1); //?
    break;
  case 'add':
    setTodos((todos) => [...todos, payload]);
    seCount(count + 1); //?
    break;
```

要这样岂不是每一次都有多余的操作。

所以 reducer 闪亮登场

## reducer 出场

这里最主要的就是原来的函数逻辑处理都是在 dispatch 里进行的，目前都是在 state 里面进行。

reducer 接受了 2 个参数，一个 state，一个 action

```jsx
const reducer = (state, action) => {
  const { type, payload } = action;
  const { todos, count } = state;
  switch (type) {
    case 'set':
      return {
        ...state,
        todos: payload,
        count: count + 1,
      };
    case 'add':
      return {
        ...state,
        todos: [...todos, payload],
        count: count + 1,
      };
    case 'remove':
      return {
        ...state,
        todos: todos.filter((todo) => {
          return todo.id !== payload;
        }),
      };
    case 'toggle':
      return {
        ...state,
        todos: todos.map((todo) => {
          // 这里就是指定id的状态是否为已完成
          return todo.id === payload
            ? {
                ...todo,
                complete: !todo.complete,
              }
            : todo;
        }),
      };
    default:
      return state;
  }
};

const dispatch = useCallback(
  (action) => {
    const state = {
      todos,
      count,
    };

    const setters = {
      todos: setTodos,
      count: setCount,
    };

    const newState = reducer(state, action);

    for (let key in newState) {
      setters[key](newState[key]);
    }
  },
  [todos, count]
);
```

差不多了。

这里的重点就是把 dispatch 拆分成了 reducer 这里。老数据，经过 reducer 之后，就变成了新数据。

为了让新数据产生变化，于是就到了这些。

```jsx
const newState = reducer(state, action);

for (let key in newState) {
  // 一股脑的把所有数据全部都更新了，这里就是新数据 → newState[key]
  setters[key](newState[key]);
}
```

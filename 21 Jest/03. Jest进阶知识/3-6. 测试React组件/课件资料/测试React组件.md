# 测试React组件

在现代前端开发中，组件是一个重要的模块，一个组件拥有完整的功能，能够对我们的代码进行最大程度的复用。

因此在进行单元测试的时候，往往也需要对重要的组件进行测试。

这一节课我们先聚焦在 React 上面，看一下 React 的组件如何进行测试。



## Testing library

这是专门用来做测试的一个工具库，官网：https://testing-library.com/

这个测试库提供了一系列的 API 和工具，可以用来测试 Web 组件。

这里解答一个疑问，Jest 和 Testing library 之间有什么联系或者区别？

首先 Jest 是一个完整的测试框架，里面提供了诸如匹配器、mock库、断言工具库之类的工具，设计目标是提供一个完整的测试工具链，测试的重点在某个函数的功能是否完整。

Testing library 是一个测试工具库，这个库的设计理念是“测试组件的行为而不是实现细节”，通过这个库提供的一些 API 可以模拟浏览器中与应用交互的方式。Testing library 是一个通用库，可以和各种框架进行结合。

在进行 React 组件的测试的时候，Jest 和 Testing library 一般都是配合着一起使用的。

这里我们使用 create-react-app 搭建一个 react 项目，内部就有关于测试的示例代码，代码如下：

```js
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
```

在 Testing library 库里面，有很多的扩展库，例如在 cra项目中，就默认安装了@testing-library/jest-dom、@testing-library/react、@testing-library/user-event

*@testing-library/react*、*@testing-library/jest-dom* 和 *@testing-library/user-event* 都是 *Testing Library* 的一部分，属于 Testing library 的扩展库，提供了一些常用的测试工具和断言方法。

- *@testing-library/react*：这个库是 *Testing Library* 的核心库，提供了一组用于测试 *React* 组件的工具，例如 *render、screen、fireEvent* 等等。它可以帮助你在测试中查询和操作组件中的 *DOM*元素，以及模拟用户行为，例如点击、输入等等。
- *@testing-library/jest-dom*：这个库是一个 *Jest* 的扩展库，提供了一组 *Jest* 断言方法，用于测试 *DOM* 元素的状态和行为。它可以帮助你编写更简洁、更可读的测试代码，例如 *toBeInTheDocument、toHaveTextContent* 等等。
- *@testing-library/user-event*：这个库提供了一组用于模拟用户行为的工具，例如 *type、click、tab* 等等。它可以帮助你编写更接近真实用户体验的测试，例如模拟用户输入、键盘操作等等。



render 方法

该方法接收一个组件作为参数，将其渲染为 DOM 元素，并返回一个对象，对象身上包含一些重要的属性如下：

- *container*：渲染后的 *DOM* 元素。可以通过操作它来模拟用户行为，或者进行其他的断言验证。
- *baseElement*：整个文档的根元素 <*html*>。
- *asFragment*：将渲染后的 *DOM* 元素转换为 *DocumentFragment* 对象，方便进行快照测试。
- *debug*：在控制台输出渲染后的 *DOM* 元素的 *HTML* 结构，方便调试。



screen 对象

该对象封装了一个常用的 DOM 查询和操作的函数，screen 也提供了一些常用的方法：

- *screen.getByLabelText*：根据 <*label*> 元素的 *for* 属性或者内部文本，获取与之关联的表单元素。
- *screen.getByText*：根据文本内容获取元素。
- *screen.getByRole*：根据 *role* 属性获取元素。
- *screen.getByPlaceholderText*：根据 *placeholder* 属性获取表单元素。
- *screen.getByTestId*：根据 *data-testid* 属性获取元素。
- screen.queryBy\*：类似的，还有一系列 queryBy* 函数，用于获取不存在的元素时不会抛出异常，而是返回null。



## 测试组件示例

示例一

```jsx
import { useState } from "react";
function HiddenMessage({ children }) {
    const [isShow, setIsShow] = useState(false);
    return (
        <div>
            <label htmlFor="toggle">显示信息</label>
            <input
                type="checkbox"
                name="toggle"
                id="toggle"
                checked={isShow}
                onChange={e => setIsShow(e.target.checked)}
            />
            {isShow ? children : null}
        </div>
    );
}

export default HiddenMessage;
```

首先我们有上面的这么一个组件，该组件有一个插槽接收传入的信息，然后根据 checkbox 的点击状态来决定这个信息是否显示。

接下来我们针对上面的组件进行一个测试。注意，使用 cra 搭建的 react 项目，官方推荐将测试代码放到 src 目录下面，默认跑测试的时候，也只会查找 src 下面的测试文件，这个配置是可以改的，但是需要 npm run eject 弹出隐藏的 jest.config.js 配置，然后再修改。

下面是对应的测试代码：

```js
import { render, screen, fireEvent} from "@testing-library/react";
import HiddenMessage from "../HiddenMessage";

test("能够被勾选，功能正常",()=>{
    const testMessage = "这是一条测试信息";
    render(<HiddenMessage>{testMessage}</HiddenMessage>);
    // 期望文档中没有，因为一开始组件的状态为 false
    expect(screen.queryByText(testMessage)).toBeNull();
    // 模拟点击
    fireEvent.click(screen.getByLabelText("显示信息"));
    // 这一次就期望在文档中出现
    expect(screen.getByText(testMessage)).toBeInTheDocument();
});
```

在书写测试用例的时候，有一个 3A 模式，Arrange（准备）、Act（动作）、Assert（断言）

3A ： https://wiki.c2.com/?ArrangeActAssert

1. **Arrange** all necessary preconditions and inputs.
2. **Act** on the object or method under test.
3. **Assert** that the expected results have occurred.

关于 queryByText 和 getByText 两者之间的区别：

queryBy* 如果没有找到，返回的是 null，而 getBy* 没有找到，会抛出错误，具体的可以参阅：https://testing-library.com/docs/react-testing-library/cheatsheet/#queries



示例二

该组件是一个登录组件，里面涉及到账号和密码的输入，以及发送请求，代码如下：

```jsx
import * as React from 'react'

function Login() {
    // 这里维护了一个组件自身的状态
    const [state, setState] = React.useReducer((s, a) => ({ ...s, ...a }), {
        resolved: false,
        loading: false,
        error: null,
    })

    function handleSubmit(event) {
        event.preventDefault()
        const { usernameInput, passwordInput } = event.target.elements

        setState({ loading: true, resolved: false, error: null })

        window
            .fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: usernameInput.value,
                    password: passwordInput.value,
                }),
            })
            .then(r => r.json().then(data => (r.ok ? data : Promise.reject(data))))
            .then(
                user => {
                    setState({ loading: false, resolved: true, error: null })
                    window.localStorage.setItem('token', user.token)
                },
                error => {
                    setState({ loading: false, resolved: false, error: error.message })
                },
            )
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="usernameInput">Username</label>
                    <input id="usernameInput" />
                </div>
                <div>
                    <label htmlFor="passwordInput">Password</label>
                    <input id="passwordInput" type="password" />
                </div>
                <button type="submit">Submit{state.loading ? '...' : null}</button>
            </form>
            {state.error ? <div role="alert">{state.error}</div> : null}
            {state.resolved ? (
                <div role="alert">Congrats! You're signed in!</div>
            ) : null}
        </div>
    )
}

export default Login
```

在上面的登录组件中，我们首先维护了一个组件状态，{ loading:false,resolved:false,error:null}

用户填写用户名和密码，点击 button 进行提交，首先会把状态修改为 { loading:true,resolved:false,error:null}

然后接下来通过 fetch 发送请求，根据响应来决定如何处理，如果请求成功，状态为  { loading:false,resolved:true,error:null}，接下来在页面上就应该显示 Congrats! You're signed in!

如果请求失败，状态就为 { loading:false,resolved:false,error:error.message}，页面就显示对应的错误信息。

接下来我们来书写对应的测试代码。

这里我们是对组件进行测试，这是属于一种单元测试，那么我们就需要屏蔽真实的请求。

这里介绍一种新的方式，通过 msw 的第三方库可以快速启动一个服务器，方便我们进行单元测试。

对应的测试代码如下：

```js
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, screen, fireEvent } from "@testing-library/react";
import Login from "../Login";

const fakeUserRes = { token: "fake_user_token" };
const server = setupServer(
    rest.post('/api/login', (req, res, ctx) => {
        return res(ctx.json(fakeUserRes));
    })
);

// 启动服务器
beforeAll(() => server.listen());
// 关闭服务器
afterAll(() => server.close());
// 每一个测试用例完成后会执行
afterEach(() => {
    server.resetHandlers(); // 重置服务器，每个测试用例之间相互不影响
    window.localStorage.removeItem('token');
});

test("测试请求成功", async () => {
    // 渲染该组件
    render(<Login />);
    // 往表单里面填写信息
    fireEvent.change(screen.getByLabelText(/Username/i), {
        target: {
            value: 'xiejie'
        }
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
        target: {
            value: '123456'
        }
    });
    // 点击提交按钮
    fireEvent.click(screen.getByText("Submit"));
    // 既然是请求成功，那么我们期望“Congrats! You're signed in!”这条信息显示出来
    expect(await screen.findByRole('alert')).toHaveTextContent(/Congrats/i);
    // 既然请求成功，那么 token 也应该是成功保存的
    expect(window.localStorage.getItem('token')).toEqual(fakeUserRes.token);
});



test("测试请求失败", async() => {
    // 模拟服务器请求失败
    server.use(rest.post('/api/login', (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ message: '服务器内部出错' }));
    }));

    // 渲染该组件
    render(<Login />);
    // 往表单里面填写信息
    fireEvent.change(screen.getByLabelText(/Username/i), {
        target: {
            value: 'xiejie'
        }
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
        target: {
            value: '123456'
        }
    });
    // 点击提交按钮
    fireEvent.click(screen.getByText("Submit"));
    // 请求失败
    expect(await screen.findByRole('alert')).toHaveTextContent(/服务器内部出错/i);
    expect(window.localStorage.getItem('token')).toBeNull();
});
```

在上面的测试代码中，我们首先使用到了 msw 这个依赖库，这个依赖库可以帮助我们模拟一个服务器，后面我们可以在这个服务器的基础上给出各种 mock 响应。

之后我们书写了两个测试，一个是测试请求成功，一个是测试请求失败。里面就是按照 3A 模式进行操作的。

---

-*EOF*-

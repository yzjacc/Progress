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
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
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
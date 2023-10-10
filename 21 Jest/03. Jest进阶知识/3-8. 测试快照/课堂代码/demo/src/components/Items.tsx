import { useState } from "react";
function Items() {
  const [items, setItems] = useState(["苹果1", "香蕉2", "西瓜3"]);
  const [value, setValue] = useState("");
  const lis = items.map((it, idx) => <li key={idx}>{it}</li>);
  function addItem() {
    if (items) {
      const newItems = [...items];
      newItems.push(value);
      setItems(newItems);
      setValue("");
    }
  }
  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={addItem}>添加</button>
      <ul>{lis}</ul>
    </div>
  );
}

export default Items;

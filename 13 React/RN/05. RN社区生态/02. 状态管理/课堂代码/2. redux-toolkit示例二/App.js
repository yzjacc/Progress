import { Provider } from "react-redux";
import store from "./redux/store";
import ToDoList from "./components/ToDoList";

export default function App() {
  return (
    <Provider store={store}>
      <ToDoList />
    </Provider>
  );
}

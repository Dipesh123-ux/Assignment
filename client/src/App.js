import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import store from "./data/reducers/store";
import { TaskForm } from "./components/tasks/TaskForm";
import { TaskList } from "./components/tasks/TaskList";
import { initializeTasks, selectTheme } from "./data/slices/taskSlice";
import Home from "./components/tasks/Home";

function App() {
  useEffect(() => {
    store.dispatch(initializeTasks());
  }, []);
  return (
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <Home />
      </DndProvider>
    </Provider>
  );
}

export default App;

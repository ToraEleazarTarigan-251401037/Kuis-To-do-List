// src/App.jsx
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { dummyTodos } from "./data/dummyTodos";
import TodoListPage from "./pages/TodoListPage";
import TodoDetailPage from "./pages/TodoDetailPage";
import Toast from "./components/Toast";

export default function App() {
  const [todos, setTodos] = useState(dummyTodos);
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage("");
    }, 3000);
  };

  const handleAddTodo = (newTodo) => {
    setTodos((prev) => [newTodo, ...prev]);
    showToast("Tugas berhasil ditambahkan!");
  };

  const handleUpdateTodo = (updatedTodo) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
    showToast("Tugas berhasil diperbarui!");
  };

  const handleDeleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
    showToast("Tugas berhasil dihapus!");
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <TodoListPage
              todos={todos}
              onAddTodo={handleAddTodo}
              onDeleteTodo={handleDeleteTodo}
            />
          }
        />
        <Route
          path="/todo/:id"
          element={
            <TodoDetailPage todos={todos} onUpdateTodo={handleUpdateTodo} />
          }
        />
      </Routes>

      <Toast message={toastMessage} onClose={() => setToastMessage("")} />
    </>
  );
}
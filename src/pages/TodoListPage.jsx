import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TodoListPage({ todos, onAddTodo, onDeleteTodo }) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("to-do");
  const [priority, setPriority] = useState("low");
  const [deadline, setDeadline] = useState("");

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setStatus("to-do");
    setPriority("low");
    setDeadline("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !deadline) return;

    onAddTodo({
      id: Date.now(),
      title: title.trim(),
      description: description.trim() || "-",
      status,
      priority,
      deadline,
    });

    resetForm();
    setIsModalOpen(false);
  };

  const handleDelete = (todo) => {
    const confirmed = window.confirm(
      `Apakah Anda yakin ingin menghapus tugas "${todo.title}"?`
    );
    if (confirmed) {
      onDeleteTodo(todo.id);
    }
  };

  return (
    <div style={{ maxWidth: "1100px", margin: "40px auto", padding: "0 20px", fontFamily: "sans-serif" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "bold", margin: 0 }}>Todo List</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          style={{
            backgroundColor: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "10px 16px",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Tambah Todo
        </button>
      </div>

      {/* Tabel Daftar Tugas */}
      <div style={{ border: "1px solid #e5e7eb", borderRadius: "8px", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #e5e7eb", backgroundColor: "#f9fafb" }}>
              <th style={{ padding: "14px 16px" }}>Judul</th>
              <th style={{ padding: "14px 16px" }}>Status</th>
              <th style={{ padding: "14px 16px" }}>Prioritas</th>
              <th style={{ padding: "14px 16px" }}>Deadline</th>
              <th style={{ padding: "14px 16px", textAlign: "center" }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {todos.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ padding: "24px", textAlign: "center", color: "#6b7280" }}>
                  Belum ada tugas. Klik "Tambah Todo" untuk membuat tugas baru.
                </td>
              </tr>
            ) : (
              todos.map((todo) => (
                <tr key={todo.id} style={{ borderBottom: "1px solid #e5e7eb" }}>
                  <td style={{ padding: "14px 16px" }}>{todo.title}</td>
                  <td style={{ padding: "14px 16px" }}>{todo.status}</td>
                  <td style={{ padding: "14px 16px" }}>{todo.priority}</td>
                  <td style={{ padding: "14px 16px" }}>{todo.deadline}</td>
                  <td style={{ padding: "14px 16px", textAlign: "center" }}>
                    <div style={{ display: "inline-flex", gap: "8px" }}>
                      <button
                        onClick={() => navigate(`/todo/${todo.id}`)}
                        title="Lihat Detail"
                        style={{
                          backgroundColor: "#2563eb",
                          color: "#fff",
                          border: "none",
                          width: "32px",
                          height: "32px",
                          borderRadius: "6px",
                          cursor: "pointer",
                        }}
                      >
                        👁
                      </button>
                      <button
                        onClick={() => handleDelete(todo)}
                        title="Hapus Tugas"
                        style={{
                          backgroundColor: "#dc2626",
                          color: "#fff",
                          border: "none",
                          width: "32px",
                          height: "32px",
                          borderRadius: "6px",
                          cursor: "pointer",
                        }}
                      >
                        🗑
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Tambah Todo */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "24px",
              borderRadius: "10px",
              width: "100%",
              maxWidth: "440px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
            }}
          >
            <h2 style={{ textAlign: "center", marginTop: 0, marginBottom: "20px", fontSize: "20px" }}>
              Tambah Todo
            </h2>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontWeight: "600", marginBottom: "6px" }}>Judul</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={{ width: "100%", padding: "8px 10px", borderRadius: "6px", border: "1px solid #d1d5db", boxSizing: "border-box" }}
                />
              </div>

              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontWeight: "600", marginBottom: "6px" }}>Deskripsi</label>
                <textarea
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={{ width: "100%", padding: "8px 10px", borderRadius: "6px", border: "1px solid #d1d5db", boxSizing: "border-box" }}
                />
              </div>

              <div style={{ display: "flex", gap: "12px", marginBottom: "14px" }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", fontWeight: "600", marginBottom: "6px" }}>Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    style={{ width: "100%", padding: "8px 10px", borderRadius: "6px", border: "1px solid #d1d5db" }}
                  >
                    <option value="to-do">to-do</option>
                    <option value="in progress">in progress</option>
                    <option value="done">done</option>
                  </select>
                </div>

                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", fontWeight: "600", marginBottom: "6px" }}>Prioritas</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    style={{ width: "100%", padding: "8px 10px", borderRadius: "6px", border: "1px solid #d1d5db" }}
                  >
                    <option value="low">low</option>
                    <option value="medium">medium</option>
                    <option value="high">high</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontWeight: "600", marginBottom: "6px" }}>Deadline</label>
                <input
                  type="date"
                  required
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  style={{ width: "100%", padding: "8px 10px", borderRadius: "6px", border: "1px solid #d1d5db", boxSizing: "border-box" }}
                />
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setIsModalOpen(false);
                  }}
                  style={{
                    flex: 1,
                    padding: "10px",
                    backgroundColor: "#dc2626",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    padding: "10px",
                    backgroundColor: "#2563eb",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                >
                  Tambah
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
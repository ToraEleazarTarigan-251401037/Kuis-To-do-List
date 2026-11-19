import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function TodoDetailPage({ todos, onUpdateTodo }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const todo = todos.find((item) => String(item.id) === String(id));

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("to-do");
  const [priority, setPriority] = useState("low");
  const [deadline, setDeadline] = useState("");

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description);
      setStatus(todo.status);
      setPriority(todo.priority);
      setDeadline(todo.deadline);
    }
  }, [todo]);

  if (!todo) {
    return (
      <div style={{ textAlign: "center", marginTop: "80px", fontFamily: "sans-serif" }}>
        <h2>Tugas tidak ditemukan</h2>
        <button
          onClick={() => navigate("/")}
          style={{
            marginTop: "12px",
            backgroundColor: "#dc2626",
            color: "#fff",
            border: "none",
            padding: "8px 16px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Kembali
        </button>
      </div>
    );
  }

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!title.trim() || !deadline) return;

    onUpdateTodo({
      ...todo,
      title: title.trim(),
      description: description.trim() || "-",
      status,
      priority,
      deadline,
    });

    setIsModalOpen(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        fontFamily: "sans-serif",
      }}
    >
      {/* Kartu Detail Todo */}
      <div
        style={{
          width: "100%",
          maxWidth: "640px",
          border: "1px solid #e5e7eb",
          borderRadius: "10px",
          padding: "28px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.06)",
          display: "flex",
          gap: "24px",
          justifyContent: "space-between",
          backgroundColor: "#fff",
        }}
      >
        {/* Kolom Kiri */}
        <div style={{ flex: 2 }}>
          <div style={{ marginBottom: "18px" }}>
            <h3 style={{ margin: "0 0 6px 0", fontSize: "16px" }}>Judul</h3>
            <p style={{ margin: 0, color: "#374151" }}>{todo.title}</p>
          </div>

          <div>
            <h3 style={{ margin: "0 0 6px 0", fontSize: "16px" }}>Deskripsi</h3>
            <div
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: "6px",
                padding: "12px",
                minHeight: "80px",
                color: "#374151",
                fontSize: "14px",
              }}
            >
              {todo.description}
            </div>
          </div>
        </div>

        {/* Kolom Kanan */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div style={{ marginBottom: "12px" }}>
              <h4 style={{ margin: "0 0 4px 0", fontSize: "15px" }}>Status</h4>
              <span style={{ color: "#374151", fontSize: "14px" }}>{todo.status}</span>
            </div>

            <div style={{ marginBottom: "12px" }}>
              <h4 style={{ margin: "0 0 4px 0", fontSize: "15px" }}>Prioritas</h4>
              <span style={{ color: "#374151", fontSize: "14px" }}>{todo.priority}</span>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <h4 style={{ margin: "0 0 4px 0", fontSize: "15px" }}>Deadline</h4>
              <span style={{ color: "#374151", fontSize: "14px" }}>{todo.deadline}</span>
            </div>
          </div>

          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={() => navigate("/")}
              style={{
                flex: 1,
                backgroundColor: "#dc2626",
                color: "#fff",
                border: "none",
                padding: "8px 12px",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              Kembali
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              style={{
                flex: 1,
                backgroundColor: "#2563eb",
                color: "#fff",
                border: "none",
                padding: "8px 12px",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              Update
            </button>
          </div>
        </div>
      </div>

      {/* Modal Update Todo */}
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
              Update Todo
            </h2>
            <form onSubmit={handleUpdate}>
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
                  onClick={() => setIsModalOpen(false)}
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
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
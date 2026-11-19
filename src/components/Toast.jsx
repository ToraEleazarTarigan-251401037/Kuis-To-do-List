export default function Toast({ message, onClose }) {
  if (!message) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        backgroundColor: "#1e293b",
        color: "#ffffff",
        padding: "12px 20px",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        zIndex: 1000,
        fontSize: "14px",
      }}
    >
      <span>{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          style={{
            background: "transparent",
            border: "none",
            color: "#94a3b8",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          ✕
        </button>
      )}
    </div>
  );
}
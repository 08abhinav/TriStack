import { useState } from "react";

const TodoItem = ({ todo, onDelete, onToggle, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.task);

  const handleUpdate = () => {
    if (!editText.trim()) return;
    onUpdate(todo._id, editText);
    setIsEditing(false);
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        alignItems: "center",
        marginBottom: "10px",
        padding: "10px",
        border: "1px solid #ccc",
      }}
    >
      {isEditing ? (
        <>
          <input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <button onClick={handleUpdate}>Save</button>
        </>
      ) : (
        <>
          <span
            style={{
              textDecoration: todo.status ? "line-through" : "none",
              flex: 1,
            }}
          >
            {todo.task}
          </span>

          <button onClick={() => onToggle(todo)}>
            {todo.status ? "Undo" : "Complete"}
          </button>

          <button onClick={() => setIsEditing(true)}>Edit</button>

          <button onClick={() => onDelete(todo._id)}>Delete</button>
        </>
      )}
    </div>
  );
};

export default TodoItem;
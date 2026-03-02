import TodoItem from "./TodoItem";

const TodoList = ({ todos, onDelete, onToggle, onUpdate }) => {
  return (
    <div>
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onDelete={onDelete}
          onToggle={onToggle}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};

export default TodoList;

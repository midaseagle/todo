import React, { useState } from 'react';

const TodoItem = ({ todo, updateTodo, deleteTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(todo.name);

  const handleUpdate = () => {
    updateTodo(todo._id, { ...todo, name: editedName });
    setIsEditing(false);
  };

  const toggleCompletion = () => {
    updateTodo(todo._id, { ...todo, isCompleted: !todo.isCompleted });
  };

  return (
    <li>
      {isEditing ? (
        <>
          <input 
            type="text" 
            value={editedName} 
            onChange={e => setEditedName(e.target.value)} 
          />
          <button onClick={handleUpdate}>Save</button>
        </>
      ) : (
        <>
          <span 
            style={{ textDecoration: todo.isCompleted ? 'line-through' : 'none' }}
            onClick={toggleCompletion}
          >
            {todo.name}
          </span>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => deleteTodo(todo._id)}>Delete</button>
        </>
      )}
    </li>
  );
};

export default TodoItem;
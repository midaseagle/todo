import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';

const API_URL = '';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    axios.get(API_URL)
      .then(response => setTodos(response.data))
      .catch(error => console.error('Error fetching data: ', error));
  }, []);

  const addTodo = () => {
    const todo = { name: newTodo, isCompleted: false };
    axios.post(API_URL, todo)
      .then(response => {
        setTodos([...todos, response.data]);
        setNewTodo('');
      })
      .catch(error => console.error('Error adding todo: ', error));
  };

  const updateTodo = (id, updatedTodo) => {
    axios.put(`${API_URL}/${id}`, updatedTodo)
      .then(response => {
        setTodos(todos.map(todo => (todo._id === id ? response.data : todo)));
      })
      .catch(error => console.error('Error updating todo: ', error));
  };

  const deleteTodo = id => {
    axios.delete(`${API_URL}/${id}`)
      .then(() => {
        setTodos(todos.filter(todo => todo._id !== id));
      })
      .catch(error => console.error('Error deleting todo: ', error));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input 
        type="text" 
        value={newTodo} 
        onChange={e => setNewTodo(e.target.value)} 
        placeholder="Add a new task" 
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(todo => (
          <TodoItem 
            key={todo._id} 
            todo={todo} 
            updateTodo={updateTodo} 
            deleteTodo={deleteTodo} 
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
import React, { useEffect, useRef, useState } from 'react';
import todoicon from '../assets/todo_icon.png';
import ToDoitems from './ToDoitems';
import './styles.css'

const ToDo = () => {
  const [todoList, setToDoList] = useState(
    localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : []
  );
  const [filter, setFilter] = useState('all');
  const inputRef = useRef();

  const add = () => {
    const inputText = inputRef.current.value.trim();

    if (inputText === '') {
      return null;
    }

    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
      isPriority: false,
    };

    setToDoList((prev) => [...prev, newTodo]);
    inputRef.current.value = '';
  };

  const deleteTodo = (id) => {
    setToDoList((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const toggle = (id) => {
    setToDoList((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
      )
    );
  };

  const togglePriority = (id) => {
    setToDoList((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isPriority: !todo.isPriority } : todo
      )
    );
  };

  const editTodo = (id, newText) => {
    setToDoList((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todoList));
  }, [todoList]);

  const filteredTodos = todoList.filter((todo) => {
    if (filter === 'completed') return todo.isComplete;
    if (filter === 'pending') return !todo.isComplete;
    if (filter === 'priority') return todo.isPriority;
    return true;
  });

  return (
    <div className='todoapp bg-white place-self-center w-11/12 flex flex-col py-5 px-7 h-10/12 rounded-xl shadow-lg border border-gray-100'>
      <div className='flex items-center my-3 py-1 gap-2'>
        <img className='w-8' src={todoicon} alt='To-Do Icon' />
        <h1 className='text-3xl font-semibold pb-1'>To-Do List</h1>
      </div>
      <div className='flex items-center my-1 bg-gray-200 rounded-full'>
        <input
          ref={inputRef}
          className='pallete bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600'
          type='text'
          placeholder='Add your task . . .'
          onKeyDown={(e) => { if (e.key === 'Enter') { add(); } }}
        />
        <button
          onClick={add}
          className='add-button border-none rounded-full bg-orange-600 w-14 h-14 text-white text-3xl pb-2 font-medium cursor-pointer'
        >
          +
        </button>
      </div>
      <div className='filtersbox flex justify-between my-5'>
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-full ${
            filter === 'all' ? 'bg-orange-600 text-white' : 'bg-gray-200 text-black'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-4 py-2 rounded-full ${
            filter === 'completed' ? 'bg-orange-600 text-white' : 'bg-gray-200 text-black'
          }`}
        >
          Completed
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={`px-4 py-2 rounded-full ${
            filter === 'pending' ? 'bg-orange-600 text-white' : 'bg-gray-200 text-black'
          }`}
        >
          Pending
        </button>
        <button
          onClick={() => setFilter('priority')}
          className={`px-4 py-2 rounded-full ${
            filter === 'priority' ? 'bg-orange-600 text-white' : 'bg-gray-200 text-black'
          }`}
        >
          Priority
        </button>
      </div>
      <div className='overflow-y-auto flex-1 px-4 mb-2'>
        {filteredTodos.map((item) => (
          <ToDoitems
            key={item.id}
            text={item.text}
            id={item.id}
            isComplete={item.isComplete}
            isPriority={item.isPriority}
            deleteTodo={deleteTodo}
            toggle={toggle}
            togglePriority={togglePriority}
            editTodo={editTodo}
          />
        ))}
      </div>
    </div>
  );
};

export default ToDo;

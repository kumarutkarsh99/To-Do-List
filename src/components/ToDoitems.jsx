import React, { useState } from 'react';
import tick from '../assets/tick.png';
import not_tick from '../assets/not_tick.png';
import delete_icon from '../assets/delete.png';
import star from '../assets/star.png'; 
import not_star from '../assets/not_star.png'; 
import edit_icon from '../assets/edit.png'; 
import save_icon from '../assets/save.png'; 
import './styles.css';

const ToDoitems = ({ text, id, isComplete, isPriority, deleteTodo, toggle, togglePriority, editTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);

  const handleSave = () => {
    if (editedText.trim()) {
      editTodo(id, editedText.trim());
      setIsEditing(false);
    }
  };

  return (
    <div className='flex items-center my-3 gap-2'>
      <div
        onClick={() => toggle(id)}
        className='flex flex-1 items-center cursor-pointer'
      >
        <img
          src={isComplete ? tick : not_tick}
          className='w-7'
          alt='Complete Task Icon'
        />
        {isEditing ? (
          <input
            type='text'
            className='tasktext ml-4 text-[17px] flex-1 border border-gray-300 rounded-md px-2 py-1'
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
        ) : (
          <p
            className={`tasktext ml-4 text-[17px] break-words whitespace-normal ${
              isComplete ? 'line-through text-gray-500' : 'text-slate-700'
            }`}
          >
            {text}
          </p>
        )}
      </div>
      <img
        onClick={() => togglePriority(id)}
        src={isPriority ? star : not_star}
        className='my-1.5 w-5 h-5 cursor-pointer'
        alt='Priority Task Icon'
      />
      {isEditing ? (
        <img
          onClick={handleSave}
          src={save_icon}
          className='my-1.5 ml-2 w-5 h-5 cursor-pointer'
          alt='Save Task Icon'
        />
      ) : (
        <img
          onClick={() => setIsEditing(true)}
          src={edit_icon}
          className='my-1.5 ml-2 w-5 h-5 cursor-pointer'
          alt='Edit Task Icon'
        />
      )}
      <img
        onClick={() => deleteTodo(id)}
        src={delete_icon}
        className='my-1.5 ml-2 w-4 h-4 cursor-pointer'
        alt='Delete Task Icon'
      />
    </div>
  );
};

export default ToDoitems;

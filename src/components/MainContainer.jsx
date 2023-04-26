/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

export default function MainContainer () {
  const [currentUser, setCurrentUser] = useState('725543eb-8fd4-4e43-b5ac-2374c16900ef');
  const [currentTask, setCurrentTask] = useState('');

  const handleInput = () => {
    const reqOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    };
    fetch(`api/${currentUser}/${currentTask.replace(' ', '_')}`, reqOptions);
  };

  const handleComplete = () => {
    if (currentTask !== '') {
      const reqOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' }
      };
      fetch(`api/${currentUser}`, reqOptions);
    };
  };

  const handleDelete = () => {
    if (currentTask !== '') {
      const reqOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      };
      fetch(`api/${currentUser}`, reqOptions);
    }
  };

  const handleGet = () => {
    const reqOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };
    fetch(`api/${currentUser}`, reqOptions);
  };

  return (
    <>
    <div>hello there!</div>
    <input placeholder='text goes here' minLength={1} maxLength ={35} onChange={e => setCurrentTask(e.target.value)}></input>
    <button onClick={() => handleInput()}>Submit</button>
    <button onClick={() => handleComplete()}>Completed</button>
    <button onClick={() => handleDelete()}>Delete</button>
    <button onClick={() => handleGet()}>GETdb</button>
    </>
  );
}

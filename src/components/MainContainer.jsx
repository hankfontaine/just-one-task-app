import React, { useState } from 'react';

export default function MainContainer () {
  const userId = '725543eb-8fd4-4e43-b5ac-2374c16900ef';

  const [currentTask, setCurrentTask] = useState('');

  const handleInput = () => {
    console.log('current task: ' + currentTask);

    const reqOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'test' })
    };
    fetch(`http://localhost:3000/${userId}/${currentTask.replace(' ', '_')}`, reqOptions)
      .then(console.log('success'));
  };

  return (
    <>
    <div>hello there!</div>
    <input placeholder='text goes here' onChange={e => setCurrentTask(e.target.value)}></input>
    <button onClick={() => handleInput()}>Click me</button>
    </>
  );
}

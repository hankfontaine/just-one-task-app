/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import InputContainer from './InputContainer';

export default function FormContainer (props) {
  return (
    <main className="cursor-pointer main italic font-bold">
      <div className='drop-shadow-xl'>
      <input className='italic text-9xl font-extrabold
            bg-gradient-to-r bg-clip-text  text-transparent
            from-indigo-500 via-purple-500 to-indigo-500
            animate-text' aria-label='input' placeholder='I want to...' minLength={1} maxLength ={35} value={props.currentTask} onChange={e => { props.setCurrentTask(e.target.value); props.setUserNotification('submit'); }}></input>
      </div>
    <div className='mt-20 ...'>
    <button className='hover:text-lime-800' onClick={() => props.handleComplete()}>{props.userNotification}</button>
    </div>
    <div>
    <button className='hover:text-orange-800 font-light' onClick={() => props.handleDelete()} >✗</button>
    </div>
    <div>
    <button className='hover:text-orange-800 font-light' onClick={() => props.handleGet()}>accomplishments</button>
    </div>
    </main>
  );
}

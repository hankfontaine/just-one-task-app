/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import InputContainer from './InputContainer';

export default function FormContainer (props) {
  return (
    <main>
      <input aria-label='input' placeholder='text goes here' minLength={1} maxLength ={35} value={props.currentTask} onChange={e => { props.setCurrentTask(e.target.value); }}></input>
    <div>
    <button onClick={() => props.handleInput()}>--SUBMIT TASK--</button>
    </div>
    <div>
    <button onClick={() => props.handleComplete()}>--SET CURRENT TASK TO COMPLETED--</button>
    </div>
    <div>
    <button onClick={() => props.handleDelete()}>--DELETE CURRENT TASK--</button>
    </div>
    <div>
    <button onClick={() => props.handleGet()}>--DISPLAY DB OF PAST TASKS--</button>
    </div>
    </main>
  );
}

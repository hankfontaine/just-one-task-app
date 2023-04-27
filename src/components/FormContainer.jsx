/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import InputContainer from './InputContainer';

export default function FormContainer (props) {
  return (
    <main>
      <input aria-label='input' placeholder='my one thing...' minLength={1} maxLength ={35} value={props.currentTask} onChange={e => { props.setCurrentTask(e.target.value); }}></input>
    {/* <div>
    <button onClick={() => props.handleInput()}>--SUBMIT TASK--</button>
    </div> */}
    <div>
    <button onClick={() => props.handleComplete()}>{props.userNotification}</button>
    </div>
    <div>
    <button onClick={() => props.handleDelete()}>x</button>
    </div>
    <div>
    <button onClick={() => props.handleGet()}>accomplishments</button>
    </div>
    </main>
  );
}

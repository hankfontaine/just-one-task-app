/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import InputContainer from './InputContainer';

export default function FormContainer (props) {
  return (
    <main>
      <input aria-label='input' placeholder='I want to...' minLength={1} maxLength ={35} value={props.currentTask} onChange={e => { props.setCurrentTask(e.target.value); props.setUserNotification('submit'); }}></input>
    <div>
    <button onClick={() => props.handleComplete()}>{props.userNotification}</button>
    </div>
    <div>
    <button onClick={() => props.handleDelete()}>✗</button>
    </div>
    <div>
    <button onClick={() => props.handleGet()}>accomplishments</button>
    </div>
    </main>
  );
}

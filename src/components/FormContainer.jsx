/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import InputContainer from './InputContainer';

export default function FormContainer (props) {
  return (
    <main>
    <InputContainer aria-label='input-container' currentTask={props.currentTask} setCurrentTask={props.setCurrentTask} />
    <button onClick={() => props.handleInput()}>Submit</button>
    <button onClick={() => props.handleComplete()}>Completed</button>
    <button onClick={() => props.handleDelete()}>Delete</button>
    <button onClick={() => props.handleGet()}>GETdb</button>
    </main>
  );
}

/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import InputContainer from './InputContainer';

export default function FormContainer (props) {
  return (
    <main>
    <InputContainer aria-label='input-container' currentTask={props.currentTask} setCurrentTask={props.setCurrentTask} />
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

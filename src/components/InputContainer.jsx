/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

export default function InputContainer (props) {
  return (
    <>
<input aria-label='input' placeholder='text goes here' minLength={1} maxLength ={35} value={props.currentTask} onChange={e => { props.setCurrentTask(e.target.value); }}></input>
    </>
  );
}

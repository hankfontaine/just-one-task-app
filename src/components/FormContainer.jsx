/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

export default function FormContainer (props) {
  return (
    <>
    <button onClick={() => props.handleInput()}>Submit</button>
    <button onClick={() => props.handleComplete()}>Completed</button>
    <button onClick={() => props.handleDelete()}>Delete</button>
    <button onClick={() => props.handleGet()}>GETdb</button>
    </>
  );
}

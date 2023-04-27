/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

export default function TasksListContainer (props) {
  const propsArr = [];

  for (let i = 0; i < props.tasksArr.length; i++) {
    propsArr.push(<li className='italic' >{props.tasksArr[i]}</li>);
  }

  return (
    <div className='#334155 tasks-container'>
    <ol className='taskList'>{propsArr}</ol>
    </div>
  );
}

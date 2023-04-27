/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

export default function TasksListContainer (props) {
  const propsArr = [];

  for (let i = 0; i < props.tasksArr.length; i++) {
    propsArr.push(<li>{props.tasksArr[i]}</li>);
  }

  return (
    <ol className='taskList'>{propsArr}</ol>
  );
}

/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

export default function TasksListContainer (props) {
  return (
    <ol>{props.tasksArr}</ol>
  );
}

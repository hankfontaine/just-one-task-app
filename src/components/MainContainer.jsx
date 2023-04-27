/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import InputContainer from './InputContainer';
import TasksListContainer from './TasksListContainer';
import FormContainer from './FormContainer';

export default function MainContainer () {
  const [currentUser, setCurrentUser] = useState('725543eb-8fd4-4e43-b5ac-2374c16900ef');
  const [currentTask, setCurrentTask] = useState('');
  const [currentTaskComplete, setCurrentTaskComplete] = useState(true);
  const [tasksArr, setTasksArr] = useState([]);
  const [userNotification, setUserNotification] = useState('.');

  const handleInput = () => {
    setTasksArr('');
    const reqOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    };
    fetch(`api/${currentUser}/${currentTask.replace(' ', '_')}`, reqOptions)
      .then(setCurrentTaskComplete(false));
    setUserNotification('input recieved');
  };

  const handleComplete = () => {
    setTasksArr('');
    if (currentTask !== '' && currentTaskComplete === false) {
      const reqOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' }
      };
      fetch(`api/${currentUser}`, reqOptions).then(setCurrentTaskComplete(true)).then(setCurrentTask(''));
      setUserNotification('objective completed');
    };
  };

  const handleDelete = () => {
    setTasksArr('');
    if (currentTask !== '' && currentTaskComplete === false) {
      const reqOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      };
      fetch(`api/${currentUser}`, reqOptions).then(setCurrentTaskComplete(true)).then(setCurrentTask(''));
      setUserNotification('objective deleted');
    }
  };

  const handleGet = () => {
    setTasksArr('');
    const reqOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };
    setUserNotification('retrieving data...');
    fetch(`api/${currentUser}`, reqOptions)
      .then((data) => data.json())
      .then((data) => {
        setTasksArr(data);
      }).then(setUserNotification('.'));
  };

  return (
    <>
    <Header userNotification={userNotification}/>
    <FormContainer
      currentUser={currentUser}
      setCurrentUser={setCurrentUser}
      currentTask={currentTask}
      setCurrentTask={setCurrentTask}
      tasksArr={tasksArr}
      setTasksArr={setTasksArr}
      userNotification={userNotification}
      setUserNotification={setUserNotification}
      handleInput={handleInput}
      handleComplete={handleComplete}
      handleDelete={handleDelete}
      handleGet={handleGet}
    />
    <TasksListContainer tasksArr={tasksArr}/>
    <Footer />
    </>
  );
}

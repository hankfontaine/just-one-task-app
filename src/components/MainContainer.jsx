/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import InputContainer from './InputContainer';
import TasksListContainer from './TasksListContainer';
import FormContainer from './FormContainer';

export default function MainContainer () {
  const [currentUser, setCurrentUser] = useState(localStorage.getItem('currentUser') || '725543eb-8fd4-4e43-b5ac-2374c16900ef');
  const [currentTask, setCurrentTask] = useState(localStorage.getItem('currentTask') || '');
  const [currentTaskComplete, setCurrentTaskComplete] = useState(localStorage.getItem('currentTaskComplete') === 'true' || true);
  const [tasksArr, setTasksArr] = useState([]);
  const [userNotification, setUserNotification] = useState('.');

  useEffect(() => {
    localStorage.setItem('currentUser', currentUser);
    localStorage.setItem('currentTask', currentTask);
    localStorage.setItem('currentTaskComplete', currentTaskComplete);
  }, [currentUser, currentTask, currentTaskComplete]);

  if (localStorage.getItem('currentTask')) {
    console.log('task? ' + currentTask);
    // const curr = localStorage.getItem('currentTask');
    // setCurrentTask(curr);
    // return;
  }

  const handleInput = () => {
    if (currentTaskComplete === true && currentTask.replace(/\s/g, '').length) { // check if input is empty string or overwrite
      console.log('current task: ' + currentTask);
      setTasksArr('');
      const reqOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      };
      fetch(`api/${currentUser}/${currentTask.replace(' ', '_')}`, reqOptions)
        .then(setCurrentTaskComplete(false));
      setUserNotification('input recieved: ' + currentTask);
    }
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
        if (currentTaskComplete === true) setTasksArr(data);
        else setTasksArr(data.slice(0, -1));
      }).then(setUserNotification('.'));
  };

  currentTask ? handleInput() : console.log('no task in state');

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

/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import TasksListContainer from './TasksListContainer';
import FormContainer from './FormContainer';

export default function MainContainer () {
  const [currentUser, setCurrentUser] = useState(localStorage.getItem('currentUser') || '725543eb-8fd4-4e43-b5ac-2374c16900ef');
  const [currentTask, setCurrentTask] = useState(localStorage.getItem('currentTask') || '');
  const [currentTaskComplete, setCurrentTaskComplete] = useState(localStorage.getItem('currentTaskComplete') === 'true' || true);
  const [tasksArr, setTasksArr] = useState([]);
  const [userNotification, setUserNotification] = useState('submit');
  const [hiddenTaskbox, setHiddenTaskbox] = useState(false);

  useEffect(() => {
    localStorage.setItem('currentUser', currentUser);
    localStorage.setItem('currentTask', currentTask);
    localStorage.setItem('currentTaskComplete', currentTaskComplete);
  }, [currentUser, currentTask, currentTaskComplete]);

  const handleInput = () => {
    if (currentTaskComplete === true && currentTask.replace(/\s/g, '').length) { // check if input is empty string or overwrite
      setTasksArr('');
      const reqOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      };
      fetch(`api/${currentUser}/${currentTask.replace(' ', '_')}`, reqOptions);
      setUserNotification('input recieved: "' + currentTask + '" click when done.');
      setHiddenTaskbox(true);
      console.log(setHiddenTaskbox);
    }
  };

  const handleComplete = () => {
    if (currentTaskComplete === true && currentTask.replace(/\s/g, '').length) { // check if input is empty string or overwrite
      setTasksArr('');
      const reqOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      };
      fetch(`api/${currentUser}/${currentTask.replace(' ', '_')}`, reqOptions)
        .then(setCurrentTaskComplete(false));
      setUserNotification('✓: ' + currentTask);
      setHiddenTaskbox(true);
    } else {
      setTasksArr('');
      if (currentTask !== '' && currentTaskComplete === false) {
        const reqOptions = {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' }
        };
        fetch(`api/${currentUser}`, reqOptions).then(setCurrentTaskComplete(true)).then(setCurrentTask(''));
        setUserNotification('objective completed');
        setHiddenTaskbox(false);
      };
    }
  };

  const handleDelete = () => {
    setTasksArr('');
    if (currentTask !== '' && currentTaskComplete === false) {
      const reqOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      };
      fetch(`api/${currentUser}`, reqOptions).then(setCurrentTaskComplete(true)).then(setCurrentTask(''));
      setUserNotification('objective deleted. enter new task');
      setHiddenTaskbox(false);
    }
  };

  const handleGet = () => {
    setTasksArr('');
    const reqOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };
    // setUserNotification('retrieving data...');
    fetch(`api/${currentUser}`, reqOptions)
      .then((data) => data.json())
      .then((data) => {
        if (currentTaskComplete === true) setTasksArr(data);
        else setTasksArr(data.slice(0, -1));
      });
    // .then(setUserNotification('submit'));
  };

  console.log('current task: ' + currentTask, 'is it complete? ' + currentTaskComplete);
  // currentTask ? handleInput() : console.log('no task in state');

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

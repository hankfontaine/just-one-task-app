/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

export default function Header (props) {
  return (
    <header>
      header
      <div>
      {props.userNotification}
      </div>
      </header>
  );
}

import React from 'react';

import Message from '../Message';
import { useSelector } from 'react-redux';

import './styles.css';

export default function Messages() {
  const { messages } = useSelector((state) => state.msg);
  return (
    <div className='messages'>
      {messages.map((msg, index) => (
        <Message key={index} message={msg} />
      ))}
    </div>
  );
}

import React from 'react';

const Notification = ({ message, type }) => {
  if (!message) {
    return null;
  }

  return (
    <div
      className={`text-white text-lg p-4 ${
        type === 'error' ? 'bg-red-700' : 'bg-green-700'
      }`}
    >
      {message}
    </div>
  );
};

export default Notification;

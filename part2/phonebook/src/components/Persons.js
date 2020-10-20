import React from 'react';

const Persons = ({ name, number }) => {
  return (
    <p>
      <span>{name} </span>
      <span>{number}</span>
    </p>
  );
};

export default Persons;

import React from 'react';

const Persons = ({ id, name, number, deletePerson }) => {
  return (
    <div>
      <span>{name} </span>
      <span>{number} </span>
      <button data-id={id} data-name={name} onClick={deletePerson}>
        delete
      </button>
    </div>
  );
};

export default Persons;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then((response) => {
      setPersons(response.data);
    });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
  };

  const nameAlreadyExists = persons.some(
    (eachPerson) => eachPerson.name === newName
  );

  const addPerson = (event) => {
    event.preventDefault();

    if (nameAlreadyExists) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const newPersonObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };
      setPersons(persons.concat(newPersonObject));
      setNewName('');
      setNewNumber('');
    }
  };

  const searchedPersons = persons.filter((eachPerson) => {
    const trimString = (inputString) => {
      return inputString.trim().toLowerCase().replace(/\s+/g, '');
    };

    const trimmedName = trimString(eachPerson.name);
    const trimmedInput = trimString(searchValue);

    // If search field is not empty and has a value that matches a name
    return trimmedName.includes(trimmedInput);
  });

  return (
    <div>
      <div>
        <h2>Phonebook</h2>
        <Filter handleSearch={handleSearch} />
      </div>

      <div>
        <h3>add a new</h3>
        <PersonForm
          addPerson={addPerson}
          newName={newName}
          handleNameChange={handleNameChange}
          newNumber={newNumber}
          handleNumberChange={handleNumberChange}
        />
      </div>

      <div>
        <h3>Numbers</h3>
        {searchedPersons.map((eachPerson) => (
          <Persons
            name={eachPerson.name}
            number={eachPerson.number}
            key={eachPerson.id}
          />
        ))}
      </div>
    </div>
  );
};

export default App;

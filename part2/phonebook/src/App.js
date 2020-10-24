import React, { useState, useEffect } from 'react';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

import personsHttpServices from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    personsHttpServices
      .getAll()
      .then((returnedPersons) => setPersons(returnedPersons));
  }, []);

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleSearch = (event) => setSearchValue(event.target.value);

  /* Default value (empty string) set for inputString. 
    Prevents errors that fire before data loads */
  const trimString = (inputString = '') =>
    inputString.trim().toLowerCase().replace(/\s+/g, '');

  const nameAlreadyExists = persons.some(
    (eachPerson) => trimString(eachPerson.name) === trimString(newName)
  );

  const addPerson = (event) => {
    event.preventDefault();

    if (nameAlreadyExists) {
      const numberReplacementConfirmed = window.confirm(
        `${newName} is already added to phonebook, replace old number with a new one?`
      );
      const existentPerson = persons.find(
        (eachPerson) => trimString(eachPerson.name) === trimString(newName)
      );
      const id = existentPerson.id;
      const changedPerson = { ...existentPerson, number: newNumber };

      if (numberReplacementConfirmed) {
        personsHttpServices
          .update(id, changedPerson)
          .then((returnedPerson) =>
            setPersons(
              persons.map((eachPerson) =>
                trimString(eachPerson.name) !== trimString(newName)
                  ? eachPerson
                  : returnedPerson
              )
            )
          );
      }

      setNewName('');
      setNewNumber('');
    } else {
      const newPersonObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };

      personsHttpServices.add(newPersonObject).then((returnedPersons) => {
        return setPersons(persons.concat(returnedPersons));
      });

      setNewName('');
      setNewNumber('');
    }
  };

  const deletePerson = (event) => {
    const name = event.target.getAttribute('data-name');
    const id = parseInt(event.target.getAttribute('data-id'));

    const deletionConfirmed = window.confirm(`Delete ${name}?`);

    if (deletionConfirmed) {
      personsHttpServices.del(id).then(() => {
        setPersons(persons.filter((eachPerson) => eachPerson.id !== id));
      });
    }
  };

  const searchedPersons = persons.filter((eachPerson) => {
    const trimmedName = trimString(eachPerson.name);
    const trimmedInput = trimString(searchValue);
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
            id={eachPerson.id}
            deletePerson={deletePerson}
          />
        ))}
      </div>
    </div>
  );
};

export default App;

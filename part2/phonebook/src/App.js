import React, { useState, useEffect } from 'react';

import Filter from './components/Filter';
import Notification from './components/Notification';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

import personsHttpServices from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationType, setNotificationType] = useState('confirmation');

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
          .then((returnedPerson) => {
            setPersons(
              persons.map((eachPerson) =>
                trimString(eachPerson.name) !== trimString(newName)
                  ? eachPerson
                  : returnedPerson
              )
            );
            // Display message for a limited time
            setNotificationMessage(
              `${newName}'s number has now been replaced.`
            );
            setNotificationType('confirmation');
          })
          .catch((error) => {
            setNotificationMessage(
              `Information of ${newName} has already been removed from server.`
            );
            setNotificationType('error');
          });
      }

      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);

      setNewName('');
      setNewNumber('');
    } else {
      const newPersonObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };

      console.log(newPersonObject);

      personsHttpServices.add(newPersonObject).then((returnedPersons) => {
        console.log(returnedPersons);
        return setPersons(returnedPersons);
      });

      // Display message for a limited time
      setNotificationMessage(`Added ${newName}`);
      setNotificationType('confirmation');
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);

      setNewName('');
      setNewNumber('');
    }
  };

  const deletePerson = (event) => {
    const name = event.target.getAttribute('data-name');
    const id = parseInt(event.target.getAttribute('data-id'));

    const deletionConfirmed = window.confirm(`Delete ${name}?`);

    if (deletionConfirmed) {
      personsHttpServices
        .del(id)
        .then(() => {
          setPersons(persons.filter((eachPerson) => eachPerson.id !== id));
        })
        .catch((error) => {
          /* This one size fits all message isn't always right. 
          It displays, for example, if the server is offline.*/
          setNotificationMessage(
            `It appears that this person's info has already been removed from server. Refresh the page to confirm.`
          );
          setNotificationType('error');
        });
    }

    setTimeout(() => {
      setNotificationMessage(null);
    }, 3000);
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
        <Notification type={notificationType} message={notificationMessage} />
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

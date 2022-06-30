import React from "react";

import services from "./services/persons";
import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Message from "./components/Message";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState({ color: "green" });

  useEffect(() => {
    console.log("effect");
    services.getAll().then((response) => setPersons(response));
  }, []);
  console.log("render", persons.length, "persons");

  const handleDelete = (id) => {
    if (window.confirm(`Delete ${persons.find((p) => p.id === id).name} ?`)) {
      services.discard(id).then(() => {
        setPersons(persons.filter((person) => !(person.id === id)));
      });
    }
  };

  const resetInput = () => {
    setNewName("");
    setNewNumber("");
  };

  const displayMessage = (mssg, type) => {
    if (type === "fail") {
      setMessageType({ color: "red" });
    }
    setMessage(mssg);
    setTimeout(() => {
      if (type === "fail") {
        setMessageType({ color: "green" });
      }
      setMessage(null);
    }, 5000);
  };

  const addPerson = (event) => {
    event.preventDefault();

    let newObj = {};
    const target = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );
    if (target) {
      if (
        window.confirm(
          `${target.name} is already added in phonebook, replace the old number with a new one?`
        )
      ) {
        newObj = { name: newName, number: newNumber };
        services
          .update(target.id, newObj)
          .then((res) => {
            setPersons(
              persons.map((person) =>
                person.id === target.id
                  ? { ...person, number: newNumber }
                  : person
              )
            );
            displayMessage(`${newName}s number was updated`);
          })
          .catch((error) => {
            console.log("put failed...");
            displayMessage(
              `Information of ${newName} has already been removed from the server`,
              "fail"
            );
            setPersons(
              persons.filter(
                (person) => person.name.toLowerCase() !== newName.toLowerCase()
              )
            );
          });
        resetInput();
      } else {
        alert(`${target.name} already exists.`);
        resetInput();
      }
    } else {
      newObj = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };
      services.add(newObj).then((res) => {
        console.log(res);
        setPersons(persons.concat(newObj));
        setMessage(`Added ${newName}`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      });
      resetInput();
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filterPhonebook = () =>
    persons.filter((person) =>
      person.name.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div>
      <h2>Phonebook</h2>
      <Message message={message} type={messageType} />
      <Filter search={search} handleSearch={handleSearch} />
      <h3>add new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons filter={filterPhonebook} handleDelete={handleDelete} />
    </div>
  );
};

export default App;

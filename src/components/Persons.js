import React from "react";

const Persons = ({ filter, handleDelete }) => {
  return (
    <div>
      {filter().map((result) => (
        <div key={result.id}>
          {result.name} {result.number}
          <button onClick={() => handleDelete(result.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Persons;

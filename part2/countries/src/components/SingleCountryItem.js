import React from 'react';

const SingleCountryItem = ({ eachCountry, handleClick }) => {
  return (
    <div>
      <span>{eachCountry.name} </span>
      <button data-name={eachCountry.name} onClick={handleClick}>
        show
      </button>
    </div>
  );
};

export default SingleCountryItem;

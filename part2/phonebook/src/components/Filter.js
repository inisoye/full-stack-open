import React from 'react';

const Filter = ({ handleSearch }) => {
  return (
    <>
      filter shown with <input type='search' onChange={handleSearch} />
    </>
  );
};

export default Filter;

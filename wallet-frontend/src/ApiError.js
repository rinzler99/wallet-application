import React from 'react';

const ApiError = ({ error }) => {
  return (
    <div className="api-error">
      <p>Error: {error}</p>
    </div>
  );
};

export default ApiError;

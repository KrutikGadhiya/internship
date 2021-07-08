import React from 'react';

function ErrorMessage({ error, visible }) {
  if (!visible || !error) return null;

  return (
    <p
      style={{
        color: '#DC143C',
        fontSize: '0.8em',
        fontWeight: '700',
        marginTop: '-15px',
        marginBottom: '10px',
      }}
    >
      {error}
    </p>
  );
}

export default ErrorMessage;

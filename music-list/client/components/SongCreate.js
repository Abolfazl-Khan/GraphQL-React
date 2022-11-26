import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function SongCreate() {
  const [title, setTitle] = useState('');

  const onSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className='container'>
      <Link to='/'>Back</Link>
      <h3>Create a New Song</h3>
      <form onSubmit={onSubmit}>
        <label>Song Title:</label>
        <input
          onChange={(event) => setTitle(event.target.value)}
          value={title}
        />
      </form>
    </div>
  );
}

export default SongCreate;

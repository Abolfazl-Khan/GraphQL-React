import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import query from '../queries/fetchSongs';

const ADD_SONG = gql`
  mutation AddSong($title: String!) {
    addSong(title: $title) {
      id
      title
    }
  }
`;

function SongCreate() {
  const [title, setTitle] = useState('');
  const [addSong] = useMutation(ADD_SONG, {
    refetchQueries: [{ query }],
  });

  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();

    addSong({ variables: { title }, onCompleted: () => navigate('/') });
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

import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const ADD_LYRIC_TO_SONG = gql`
  mutation AddLyricToSong($content: String, $songId: ID!) {
    addLyricToSong(content: $content, songId: $songId) {
      id
      lyrics {
        id
        content
        likes
      }
    }
  }
`;

function LyricCreate(props) {
  const [content, setContent] = useState('');
  const [AddLyricToSong] = useMutation(ADD_LYRIC_TO_SONG);

  const onSubmit = (event) => {
    event.preventDefault();
    AddLyricToSong({
      variables: { content, songId: props.songId },
      onCompleted: () => setContent(''),
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <label>Add a Lyric</label>
      <input
        value={content}
        onChange={(event) => setContent(event.target.value)}
      />
    </form>
  );
}

export default LyricCreate;

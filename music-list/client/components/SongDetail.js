import React from 'react';
import { useQuery } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';
import fetchSong from '../queries/fetchSong';

function SongDetail() {
  let { id } = useParams();
  const { loading, data } = useQuery(fetchSong, {
    variables: { id },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Link to='/'>Back</Link>
      <h3>{data.song.title}</h3>
    </div>
  );
}

export default SongDetail;

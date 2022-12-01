import React from 'react';
import { useQuery } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';
import fetchSong from '../queries/fetchSong';
import LyricCreate from './LyricCreate';
import LyricList from './LyricList';

function SongDetail() {
  let { id } = useParams();
  const { loading, data } = useQuery(fetchSong, {
    variables: { id },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container'>
      <Link to='/'>Back</Link>
      <h3>{data.song.title}</h3>
      <LyricList lyrics={data.song.lyrics} />
      <LyricCreate songId={id} />
    </div>
  );
}

export default SongDetail;

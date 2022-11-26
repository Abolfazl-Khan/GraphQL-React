import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';

const FETCH_SONGS = gql`
  {
    songs {
      id
      title
    }
  }
`;

function SongList() {
  const { loading, data } = useQuery(FETCH_SONGS);
  const renderSongs = () => {
    return data?.songs?.map(({ id, title }) => {
      return (
        <li key={id} className='collection-item'>
          {title}
        </li>
      );
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container'>
      <ul className='collection'>{renderSongs()}</ul>
      <Link to='/songs/new' className='btn-floating btn-large red right'>
        <i className='material-icons'>add</i>
      </Link>
    </div>
  );
}

export default SongList;

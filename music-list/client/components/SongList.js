import React from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import query from '../queries/fetchSongs';

const DELETE_SONG = gql`
  mutation DeleteSong($id: ID!) {
    deleteSong(id: $id)
  }
`;

function SongList() {
  const { loading, data } = useQuery(query);
  const [deleteSong] = useMutation(DELETE_SONG, {
    refetchQueries: [{ query }],
  });

  const renderSongs = () => {
    return data?.songs?.map(({ id, title }) => {
      return (
        <li key={id} className='collection-item'>
          {title}
          <i
            className='material-icons'
            onClick={() => deleteSong({ variables: { id } })}
          >
            delete
          </i>
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

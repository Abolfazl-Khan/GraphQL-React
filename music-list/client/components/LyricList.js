import React from 'react';
import { useMutation, gql } from '@apollo/client';

const LIKE_LYRIC = gql`
  mutation LikeLyric($id: ID!) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`;

function LyricList(props) {
  const [likeLyric] = useMutation(LIKE_LYRIC);

  const onLike = (id) => {
    likeLyric({ variables: { id } });
  };

  const renderLyrics = () =>
    props.lyrics?.map(({ id, content, likes }) => {
      return (
        <li key={id} className='collection-item'>
          {content}
          <div className='vote-box'>
            <i className='material-icons' onClick={() => onLike(id)}>
              thumb_up
            </i>
            {likes}
          </div>
        </li>
      );
    });

  return <ul className='collection'>{renderLyrics()}</ul>;
}

export default LyricList;

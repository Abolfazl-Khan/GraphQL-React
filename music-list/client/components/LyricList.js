import React from 'react';

function LyricList(props) {
  const renderLyrics = () =>
    props.lyrics?.map(({ id, content, likes }) => {
      return (
        <li key={id} className='collection-item'>
          {content}
          <div className='vote-box'>
            <i className='material-icons'>thumb_up</i>
            {likes}
          </div>
        </li>
      );
    });

  return <ul className='collection'>{renderLyrics()}</ul>;
}

export default LyricList;
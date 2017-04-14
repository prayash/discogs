import React from 'react';

const Release = ({release}) => {
  return (
    <li className='release'>
      <div className='title'>{release.basic_information.title}</div>
      <div className='artist'>{release.basic_information.artists[0].name}</div>
    </li>
  )
}

export default Release;

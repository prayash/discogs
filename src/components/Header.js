import React from 'react';
import logo from '../../public/img/discogs-logo.svg';

const Header = () => {
  return (
    <div id='header'>
      <div className='flex-header'>
        <div className='logo-wrapper'>
          <a href="http://discogs.com" className='logo'>
            <img src={logo} alt='discogs logo' />
          </a>
        </div>
        <div className='search-wrapper'>
          <input type='text' name='search' placeholder='Search user...' />
          <span className='icon-magnifier'></span>
        </div>
      </div>
    </div>
  )
}

export default Header;

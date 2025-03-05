import React from 'react';
import './../App.css';
import Logo from './../logo.svg';
import Menu from './Menu';

function Header() {
  return (

    <header className='header'> 
      <div className='logo'>
        <a href='/'> 
          <img src={Logo} alt="Logo" />
        </a>        
      </div>
      <Menu></Menu>
    </header>
  );
}

export default Header;

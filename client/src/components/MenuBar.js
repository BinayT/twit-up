import React, { useState, useContext } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/auth';

const MenuBar = () => {
  const { user, logout } = useContext(AuthContext);

  const pathName = window.location.pathname;
  const path = pathName === '/' ? 'home' : pathName.substr(1);
  const [activeItem, setActiveItem] = useState(path);

  const [hover, setHover] = useState(false);

  const handleItemClick = (_, { name }) => setActiveItem(name);

  const menuBar = user ? (
    <Menu pointing secondary size='massive' color='teal'>
      <Menu.Item
        name='home'
        active
        onClick={handleItemClick}
        as={Link}
        to='/'
      />

      <Menu.Menu position='right'>
        <Menu.Item name={`Welcome ${user.username}`} />
        <Menu.Item
          name='logout'
          onClick={logout}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className={hover ? 'active item' : ''}
        />
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu pointing secondary size='massive' color='teal'>
      <Menu.Item
        name='home'
        active={activeItem === 'home'}
        onClick={handleItemClick}
        as={Link}
        to='/'
      />

      <Menu.Menu position='right'>
        <Menu.Item
          name='login'
          active={activeItem === 'login'}
          onClick={handleItemClick}
          as={Link}
          to='/login'
        />
        <Menu.Item
          name='register'
          active={activeItem === 'register'}
          onClick={handleItemClick}
          as={Link}
          to='/register'
        />
      </Menu.Menu>
    </Menu>
  );
  return menuBar;
};

export default MenuBar;

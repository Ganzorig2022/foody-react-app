import React from 'react';
import MenuItems from '../components/menu/MenuItems';
import { Login } from '../pages/Login';

export const Menu = () => {
  return (
    <div style={{ margin: '60px 0' }}>
      <Login />
      <MenuItems />
    </div>
  );
};

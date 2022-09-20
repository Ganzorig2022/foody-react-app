import React from 'react';
import MenuOrder from './MenuOrder';
import MenuTabs from './MenuTabs';
import MenuList from './MenuList';

const MenuItems = () => {
  return (
    <div>
      <MenuTabs />
      <MenuOrder />
      <MenuList />
    </div>
  );
};

export default MenuItems;

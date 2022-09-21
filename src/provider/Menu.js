import { useState, createContext, useContext } from 'react';

const MenuContext = createContext();

export const MenuProvider = (props) => {
  const { children } = props;

  const [recipesData, setRecipesData] = useState({
    name: '',
    amountType: '',
  });
  const [addedFood, setAddedFood] = useState({
    name: '',
    desription: '',
    price: '',
    category: '',
    portion: '',
    recipes: [],
  });
  const [allMenu, setAllMenu] = useState([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const state = {
    recipesData,
    setRecipesData,
    addedFood,
    setAddedFood,
    allMenu,
    setAllMenu,
    isSpinning,
    setIsSpinning,
    isDownloaded,
    setIsDownloaded,
    isLoggedIn,
    setIsLoggedIn,
    openLogin,
    setOpenLogin,
  };
  return <MenuContext.Provider value={state}>{children}</MenuContext.Provider>;
};

export const useMenuContext = () => useContext(MenuContext);

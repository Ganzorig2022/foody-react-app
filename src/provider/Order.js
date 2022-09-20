import { useState, createContext, useContext } from 'react';

const OrderContext = createContext();

export const OrderProvider = (props) => {
  const { children } = props;
  const [packedFood, setPackedFood] = useState({
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
  });
  const [deliveredFood, setDeliveredFood] = useState({
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
  });

  const state = {
    packedFood,
    setPackedFood,
    deliveredFood,
    setDeliveredFood,
  };
  return (
    <OrderContext.Provider value={state}>{children}</OrderContext.Provider>
  );
};

export const useOrderContext = () => useContext(OrderContext);

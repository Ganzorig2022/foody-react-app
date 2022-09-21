import { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from '@mui/material';
import _ from 'lodash';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import PackedOrder from './DeliveredOrder';
import DeliveredOrder from './DeliveredOrder';
import styles from '../order/Accordion.module.css';
import { OrderSVG } from '../../assets/svg/OrderSVG';
import orders from '../../data/order.json';
import dayNameEng from '../../data/dayNameEng.json';
import dayNameMgl from '../../data/dayNameMgl.json';
import { useOrderContext } from '../../provider/Order';

const AccordionComp = () => {
  const { packedFood, setPackedFood } = useOrderContext();
  const [orderData, setOrderData] = useState([]);
  const [expanded, setExpanded] = useState(false);

  //==========0. Get user order data from local folder once==========
  useEffect(() => {
    const getOrderData = () => {
      setOrderData([...orders]);
    };
    getOrderData();
  }, []);

  //===========1. Handler function for which dropdown should be expanded================
  const handleDropDown = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  //===========2. Handler function for which select->option has been selected================
  const handleSelect = (event, orderObj, day, dayIndex, orderIndex) => {
    const value = event.target.value;
    if (value === 'packed') getOrderFromSelect(orderObj, day);
    removeOrder(dayIndex, orderIndex);
  };

  //==============3. Remove order from selected day's orders=============
  const removeOrder = (dayIndex, orderIndex) => {
    //1. selected day's orders
    const currentDayOrders = orderData[dayIndex];

    //2. remove selected order from day's orders
    const filtered = currentDayOrders.filter(
      (order, orderIdx) => orderIdx !== orderIndex
    );

    //3. set updated order for re-rendering
    orderData[dayIndex] = filtered;
    setOrderData([...orderData]);
  };

  //===========4. Function for setting packed food order================
  const getOrderFromSelect = (orderObj, day) => {
    setPackedFood({
      ...packedFood,
      [day]: [...packedFood[day], orderObj],
    });
  };

  return (
    <div className={styles.mainContainer}>
      {/* ==============1. ALL ORDER RENDERING============ */}
      <div className={styles.wrapper}>
        {_.map(orderData, (orders, dayIndex) => {
          return (
            <div className={styles.container} key={dayIndex}>
              <div className={styles.header}>
                <Typography variant='bold600'>
                  {dayNameMgl[dayIndex]}
                </Typography>
                <div className={styles.orderNum}>
                  <OrderSVG color='secondary.grey' />
                  <Typography color='secondary.grey'>
                    {orders.length}
                  </Typography>
                </div>
              </div>
              {orders.map((order, orderIndex) => {
                const ID = order.id;
                return (
                  <div className={styles.accord} key={orderIndex}>
                    <Accordion
                      expanded={expanded === `panel${ID}`}
                      onChange={handleDropDown(`panel${ID}`)}
                      my={(5, 0)}
                      sx={{
                        borderRadius: '8px',
                        border: '1px solid #DFE0EB',
                      }}
                    >
                      <AccordionSummary
                        id='panel1-header'
                        aria-controls='panel1-content'
                        expandIcon={<ExpandMoreIcon />}
                        sx={{ borderBottom: '1px solid #DFE0EB' }}
                      >
                        <Typography
                          variant='bold600'
                          color='secondary.darkBlue'
                        >
                          {order.orderID}
                          <small
                            style={{
                              paddingLeft: '10px',
                              color: '#A0A2A8',
                              fontWeight: '400',
                            }}
                          >
                            {order.day}
                          </small>
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        {/* ==============Food order info================ */}
                        <Box>
                          <div
                            style={{
                              borderBottom: '2px dashed #DFE0EB',
                              paddingBottom: '10px',
                            }}
                          >
                            {_.map(order.food, (food, key) => {
                              return (
                                <div
                                  key={key}
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                  }}
                                >
                                  <div>
                                    {'-'}
                                    {food.name}
                                  </div>
                                  <div style={{ color: '#000723' }}>
                                    {'x'}
                                    {food.amount}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                          <Typography
                            color='secondary.darkBlue'
                            variant='font14'
                            mt={2.5}
                          >
                            {
                              <LocationOnOutlinedIcon
                                color='primary'
                                my={2.5}
                                sx={{
                                  width: '1rem',
                                }}
                              />
                            }
                            {order.address}
                          </Typography>
                          <br />
                          <Typography
                            color='secondary.darkBlue'
                            variant='font14'
                            mt={2.5}
                          >
                            {
                              <CallOutlinedIcon
                                color='primary'
                                mr={2.5}
                                sx={{
                                  width: '1rem',
                                }}
                              />
                            }
                            {order.phone}
                          </Typography>
                        </Box>
                        {/* ==============Order Button================ */}
                        <div key={orderIndex} className={styles.selectWrapper}>
                          <select
                            id={ID}
                            className={styles.select}
                            onChange={(event) =>
                              handleSelect(
                                event,
                                order,
                                dayNameEng[dayIndex],
                                dayIndex,
                                orderIndex
                              )
                            }
                          >
                            <option className={styles.option} value={''}>
                              Захиалга
                            </option>
                            <option className={styles.option} value={'packed'}>
                              Савласан
                            </option>
                            <option
                              className={styles.option}
                              value={'delivered'}
                            >
                              Хүргэсэн
                            </option>
                            <option className={styles.option} value={'error'}>
                              Алдаатай
                            </option>
                          </select>
                        </div>
                      </AccordionDetails>
                    </Accordion>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      {/* ==============2. ALL PACKED ORDER RENDERING============ */}
      <PackedOrder packedData={packedFood} />
      {/* ==============3. ALL DELIVERED ORDER RENDERING============ */}
      <DeliveredOrder packedData={packedFood} />
    </div>
  );
};

export default AccordionComp;

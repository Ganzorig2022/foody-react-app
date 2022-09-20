import { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from '@mui/material';
import styles from '../components/accordion.module.css';
import { OrderSVG } from '../assets/svg/OrderSVG';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import dayNameEng from '../data/dayNameEng.json';
import { useOrderContext } from '../provider/Order';

const PackedOrder = ({ packedData }) => {
  const title = ['САВЛАСАН', '', '', '', '', '', ''];
  const { packedFood, setPackedFood, deliveredFood, setDeliveredFood } =
    useOrderContext();
  const ordersArr = Object.values(packedFood);
  const [expanded, setExpanded] = useState(false);

  //===========1. Handler function for which dropdown should be expanded================
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  //===========2. Handler function for which select->option has been selected================
  const handleSelect = (event, orderObj, day, dayIndex, orderIndex) => {
    const value = event.target.value;
    if (value === 'delivered') getOrderFromSelect(orderObj, day);
    removeOrder(dayIndex, orderIndex, day);
  };

  //==============3. Remove order from selected day's orders=============
  const removeOrder = (dayIndex, orderIndex, day) => {
    //1. selected day's orders
    const currentDayOrders = ordersArr[dayIndex];

    //2. remove selected order from day's orders
    const filtered = currentDayOrders.filter(
      (order, orderIdx) => orderIdx !== orderIndex
    );

    //3. set updated order for re-rendering
    // ordersArr[dayIndex] = filtered;
    setPackedFood({ ...packedFood, [day]: [...filtered] });
    // setOrderData([...orderData]);
  };

  //===========4. Function for setting delivered food order================
  const getOrderFromSelect = (orderObj, day) => {
    setDeliveredFood({
      ...deliveredFood,
      [day]: [...deliveredFood[day], orderObj],
    });
  };

  return (
    <div className={styles.wrapper} style={{ marginTop: '0' }}>
      {ordersArr.map((orders, dayIndex) => {
        return (
          <div
            className={styles.container}
            style={{ background: '#FFF9F1' }}
            key={dayIndex}
          >
            <div className={styles.header}>
              <Typography variant='bold600'>{title[dayIndex]}</Typography>
              <div className={styles.orderNum}>
                <OrderSVG />
                <Typography color='secondary.grey'>{orders.length}</Typography>
              </div>
            </div>
            {orders.map((order, orderIndex) => {
              const ID = order.id;
              return (
                <div className={styles.accord} key={orderIndex}>
                  <Accordion
                    expanded={expanded === `panel${ID}`}
                    onChange={handleChange(`panel${ID}`)}
                    mx={(5, 0)}
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
                      <Typography color='secondary.darkBlue' variant='bold600'>
                        {order.orderID}
                        <Typography ml={2.5} variant='font16Bold500Grey'>
                          {order.day}
                        </Typography>
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
                          {order.foods.map((food, i) => {
                            return (
                              <div
                                key={i}
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
                        <Typography variant='font14DarkBLue' mr={2.5}>
                          {
                            <LocationOnOutlinedIcon
                              mr={1.25}
                              color='primary'
                              sx={{
                                width: '1rem',
                              }}
                            />
                          }{' '}
                          {order.address}
                        </Typography>{' '}
                        <br />
                        <Typography variant='font14DarkBLue' mr={2.5}>
                          {
                            <CallOutlinedIcon
                              mr={2.5}
                              color='primary'
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
                          <option className={styles.option} value={'delivered'}>
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
  );
};

export default PackedOrder;

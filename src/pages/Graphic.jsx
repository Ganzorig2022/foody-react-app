import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Stack } from '@mui/material';
import orderData from '../data/order.json';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'Захиалганы тоо (7 хоногийн өдрөөр)',
    },
  },
};

const labels = ['Даваа', 'Мягмар', 'Лхагва', 'Пүрэв', 'Баасан', 'Бямба', 'Ням'];
const shadow = {
  boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
};
export const data = {
  labels,
  datasets: [
    {
      label: 'Нийт тоо',
      data: orderData.map((order, idx) => order.length),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};
export const Graphic = () => {
  return (
    <Stack sx={{ marginTop: '100px' }}>
      <Bar
        options={options}
        data={data}
        style={{ margin: 20, borderRadius: '8px', padding: '20px', boxShadow: shadow.boxShadow }}
      />
      ;
    </Stack>
  );
};

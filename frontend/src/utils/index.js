import { io } from 'socket.io-client';

export const formatMoney = (price) =>
  String(price.toString().replace(/(.)(?=(\d{3})+$)/g, '$1,'));

export const counterProductInCart = (cart = []) => {
  return Object.values(cart).reduce((acc, item) => {
    return acc + parseInt(item.quantity);
  }, 0);
};

export const countTotalPriceInCart = (cart = []) => {
  return Object.values(cart).reduce((acc, item) => {
    return acc + parseInt(item.quantity * item.price);
  }, 0);
};

export const randomColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
};



export const socket = io('http://localhost:8080');

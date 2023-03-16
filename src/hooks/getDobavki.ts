import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../components/redux/store';
import { iProduct } from '../interfaces/Iproduct';

export function UseDobavki() {
  const tovars = useSelector((state: RootState) => state.counter.tovars);
  const [pizzaDobavki, setPizzaDobavki] = useState([]);
  const [pizzas, setPizzas] = useState<any>([]);
  console.log('kek', pizzas);
  const [dough, setDough] = useState('итальянское');
  const [portionz, setPortions] = useState(4);
  async function getDobavki() {
    if (tovars.menyType === 'пицца') {
      try {
        const response = await axios.get(
          `https://629d9d56c6ef9335c0a10fed.mockapi.io/products?menyType=`,
        );
        setPizzas(
          response.data.filter(
            (item: iProduct) =>
              item.category.includes(dough) &&
              item.portions === portionz &&
              item.title.includes(tovars.title),
          ),
        );
      } catch (error) {}
      try {
        const response = await axios.get('/pizzaDobavki.json');
        setPizzaDobavki(response.data);
        console.log('pizzadobavki', pizzaDobavki);
      } catch (error) {}
    } else {
      if (tovars.menyType?.includes('шаурма') || tovars.menyType?.includes('аппетайзеры')) {
        try {
          const response = await axios.get(
            `https://629d9d56c6ef9335c0a10fed.mockapi.io/products?type=2`,
          );
          setPizzas(
            response.data.filter(
              (item: iProduct) =>
                item.title.includes(tovars.title) && item.category.includes(dough),
            ),
          );
          console.log('appet', pizzas);
        } catch (error) {}
        try {
          const response = await axios.get('/shaurmaDobavki.json');
          setPizzaDobavki(response.data);
          console.log('shaurma', pizzaDobavki);
        } catch (error) {}
      }
    }
  }
  useEffect(() => {
    getDobavki();
  }, [dough, portionz]);
  return { pizzas, pizzaDobavki, dough, portionz, tovars };
}

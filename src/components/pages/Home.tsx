import Menu from '../Menu';
import Slider from '../Slider';
import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import Popular from '../Product';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import {
  addDough,
  addPopup,
  // addPopup,
  addtoCart,
  addTovar,
  limitTovar,
  PlustovarInCart,
} from '../redux/Slices/CounterSlice';
import Popup from '../Popup';
import { useProducts } from '../../hooks/getProducts';
import Loading from './Loading';
import { iProduct } from '../../interfaces/Iproduct';
import Tovar from './Tovar';
import React from 'react';

const Home: React.FC = () => {
  const [active, setActive] = useState(false);
  const [popup, setPopup] = useState(false);
  const count = useSelector((state: RootState) => state.counter.value);
  const { products, isLoading, isError } = useProducts();
  const dispatch = useDispatch();

  const tovars: iProduct = useSelector((state: RootState) => state.counter.tovars);
  const popular = products.map((value: iProduct) => (
    <Popular
      key={Math.random()}
      id={Math.random()}
      title={value.title}
      price={value.price}
      imageUrl={value.imageUrl}
      description={value.description}
      openPopup={() => [setPopup(true), dispatch(addTovar(value)), setActive(true)]}
      addtoCart={() => [
        value.menyType === 'пицца' || value.menyType?.includes('шаурма')
          ? [setPopup(true)]
          : [
              // dispatch(addTovar(value)),
              dispatch(addtoCart(value)),
              dispatch(PlustovarInCart(value)),
            ],
      ]}
      weight={0}
      count={0}
      category={value.category}
      composition={value.composition}
    />
  ));
  useEffect(() => {
    popup ? (document.body.style.overflow = 'hidden') : (document.body.style.overflow = 'unset');
  }, [popup]);
  return (
    <div className="wrapper">
      <Menu />
      {count === 'популярное' ? <Slider /> : ''}
      <div className={count === 'популярное' ? 'populars' : 'tovars'}>
        {isLoading && <Loading />}
        {count === 'популярное' ? (
          popular
        ) : (
          <Tovar
            id={0}
            title={''}
            price={0}
            imageUrl={''}
            description={''}
            count={0}
            weight={0}
            category={[]}
            composition={[]}
          />
        )}

        {isError && <div>{isError}</div>}
        {popup && (
          <Popup
            close={() => [
              setPopup(false),
              setActive(false),
              (document.body.style.overflow = 'auto'),
            ]}
            addtoCart={() => [
              setPopup(false),
              setActive(false),
              dispatch(addtoCart(tovars)),
              dispatch(PlustovarInCart(tovars)),
              (document.body.style.overflow = 'auto'),
            ]}
          />
        )}
      </div>
    </div>
  );
};

export default Home;

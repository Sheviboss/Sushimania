import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { iProduct } from '../../../interfaces/Iproduct';
import Menu from '../../Menu';
import Popup from '../../Popup';
//import { productApi } from '../../redux/services/productService';
import {
  addtoCart,
  removeFromCart,
  removeTovar,
  PlustovarInCart,
  addTovar,
  setChangeFromCart,
  clearCart,
  setChangeTovar,
} from '../../redux/Slices/CounterSlice';
import { RootState } from '../../redux/store';

import CartEmpty from './CartEmpty';
import CartItem from './CartItem';

const Cart: React.FC = () => {
  const popup1 = useSelector((state: RootState) => state.counter.popup);
  const cart = useSelector((state: RootState) => state.counter.cart);
  const auth = useSelector((state: RootState) => state.auth.auth);
  const cartLength = useSelector((state: RootState) => state.counter.count);
  const totalPrice = useSelector((state: RootState) => state.counter.price);
  const userLogin = useSelector((state: RootState) => state.auth.login);
  const tovars = useSelector((state: RootState) => state.counter.tovars);
  const totalPricePizza1 = useSelector((state: RootState) => state.counter.totalPricePizza);
  // const change = useSelector((state: RootState) => state.counter.changeTovar);
  // const tovars: iProduct = useSelector((state: RootState) => state.counter.tovars);
  const dispatch = useDispatch();
  const [buy, setByu] = useState(false);
  const [popup, setPopup] = useState(false);
  const [id1, setid1] = useState<any>(0);
  console.log('id1', id1);
  const [change, setChange] = useState<any>([]);
  const createdAt = new Date();
  const adtoUserHistory = (e: React.FormEvent) => {
    e.preventDefault();
    if (auth) {
      axios
        .get(`https://629d9d56c6ef9335c0a10fed.mockapi.io/users?login=${userLogin}`)
        .then(function (response) {
          const id = response.data[0].id;
          console.log(response.data);
          axios.post(`https://629d9d56c6ef9335c0a10fed.mockapi.io/history?login=${userLogin}`, {
            login: userLogin,
            history: cart,
            createdAt: createdAt.toLocaleString(),
            totalPrice: totalPrice,
          });
        });
      setByu(true);
      dispatch(clearCart());
    } else {
      <Link to="/login"></Link>;
    }
  };
  // const title = useSelector((state: RootState) => state.counter.dough);
  // const { data: posts } = productApi.useFetchAllProductsQuery(title);
  return (
    <>
      <Link to="/">
        <Menu />
      </Link>
      <div className="cart">
        <h1 className="cart-tittle">Моя корзина</h1>
        {popup && <Popup close={() => setPopup(false)} addtoCart={() => console.log('added')} />}
        {buy ? (
          <div>спасибо за заказ</div>
        ) : cartLength > 0 ? (
          cart.map((value: iProduct, i: number) => (
            <CartItem
              id={value.id}
              id1={value.id1}
              key={i}
              title={value.title}
              description={value.description}
              imageUrl={value.imageUrl}
              count={value.count}
              price={value.price}
              TotalCategoryPrice={value.price * value.count}
              menyType={value.menyType}
              addtoCart={() => [
                dispatch(addtoCart(value)),
                dispatch(PlustovarInCart(value)),
                dispatch(addTovar(value)),
              ]}
              removeFromCart={() => dispatch(removeFromCart(value))}
              removeTovar={() => {
                dispatch(removeTovar(value));
              }}
              weight={0}
              category={value.category}
              composition={[]}
              dobavki={
                value.menyType === 'пицца' ||
                value.menyType === 'pizza' ||
                value.menyType === 'шаурма, For vegan'
                  ? value.dobavki
                  : []
              }
              dough={value.menyType === 'пицца' || value.menyType === 'pizza' ? value.category : []}
              diameter={
                value.menyType === 'пицца' || value.menyType === 'pizza' ? value.diameter : ''
              }
            />
          ))
        ) : (
          <CartEmpty />
        )}

        {cartLength > 0 ? (
          <>
            <div className="zakaz-price">
              Сумма заказа: <span>{totalPrice} Р</span>
            </div>
            <form onSubmit={adtoUserHistory}>
              {buy ? (
                ''
              ) : (
                <button className={auth ? 'zakaz-order' : 'zakaz-order-disabled'} type="submit">
                  Оформить заказ
                </button>
              )}
            </form>
          </>
        ) : (
          ''
        )}
      </div>
    </>
  );
};

export default Cart;

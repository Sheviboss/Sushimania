import axios, { AxiosError } from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PizzaPortions } from '../../consts/FilterPizza';
import useOnClickOutside from '../../hooks/Modal';
import { iProduct } from '../../interfaces/Iproduct';
import {
  addDough,
  addtoCart,
  PlustovarInCart,
  plus,
  minus,
  setChangeFromCart,
  setChangeTovar,
  addTovar,
} from '../redux/Slices/CounterSlice';
import { setFilterPizzaDobavki } from '../redux/Slices/CounterSlice';
import { RootState } from '../redux/store';
type PopupProps = {
  close: () => void;
  addtoCart: () => void;
};

const Popup: React.FC<PopupProps> = ({ close }) => {
  const dispatch = useDispatch();
  const tovars = useSelector((state: RootState) => state.counter.tovars);
  const totalPrice = useSelector((state: RootState) => state.counter.totalPricePizza);
  const menyType = useSelector((state: RootState) => state.counter.value);
  const changeSostav = useSelector((state: RootState) => state.counter.changeTovar);
  const ref = useRef<HTMLHeadingElement>(null);
  const [buttonActive, setButtonActive] = useState(1);
  const [pizzaDobavki, setPizzaDobavki] = useState([]);
  const [checkedItems, setCheckedItems] = useState<any>([]);
  const [dough, setDough] = useState('');
  const [portionz, setPortions] = useState(4);
  const [pizzas, setPizzas] = useState<any>([]);
  useOnClickOutside(ref, () => close());
  async function getDobavki() {
    if (tovars.menyType === 'пицца' || tovars.menyType === 'pizza') {
      try {
        const response = await axios.get(`https://629d9d56c6ef9335c0a10fed.mockapi.io/products`);
        setPizzas(
          response.data.filter(
            (item: iProduct) =>
              item.category.includes(dough) &&
              item.portions === portionz &&
              item.title.includes(tovars.title),
          ),
        );
      } catch (e: unknown) {
        const error = e as AxiosError;
        console.log(error);
      }
      try {
        const response = await axios.get('https://api.npoint.io/b546c1365f198c0be428');
        setPizzaDobavki(response.data);
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
        } catch (e: unknown) {
          const error = e as AxiosError;
          console.log(error);
        }
        try {
          const response = await axios.get('https://api.npoint.io/16f343291757ac5abf14');
          setPizzaDobavki(response.data);
        } catch (e: unknown) {
          const error = e as AxiosError;
          console.log(error);
        }
      }
    }
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    if (checked) {
      setCheckedItems((prev: string[]) => [...prev, e.target.name]);
    } else {
      setCheckedItems((prev: string[]) => prev.filter((x: string) => x !== e.target.name));
    }
  };
  useEffect(() => {
    getDobavki();
  }, [dough, portionz]);
  return (
    <div>
      {pizzas.length > 0 ? (
        pizzas.map((value: iProduct, i: number) => (
          <div ref={ref} className="popup" key={i}>
            <div className="popup_wrapper">
              <div className="popup_image">
                <img src={value.imageUrl} />
              </div>
              <div className="popup_right">
                <h2 className="popup_title">{value.title}</h2>
                <div className="popup_description">{value.description}</div>
                {tovars.dough ? (
                  <div className="popup_dough">
                    <span>{menyType === 'аппетайзеры' ? 'Соус' : 'Тесто'}</span>
                    {tovars.category.map((value: string, i: number) => (
                      <div
                        className={buttonActive === i ? 'changeDough_active' : 'changeDough'}
                        key={i}
                        onClick={() => [
                          setButtonActive(i),
                          setDough(value),
                          dispatch(addDough(value)),
                          getDobavki(),
                          setPortions(4),
                        ]}>
                        {value}
                      </div>
                    ))}
                    {dough === 'пушинское' ? (
                      <div className="popup_portions">
                        <span>Порции</span>
                        <div className="popoup_portions-value">
                          {PizzaPortions.map((value: any, i: number) => (
                            <button
                              className={
                                portionz === value ? 'changePortions_active' : 'changePortions'
                              }
                              key={i}
                              onClick={() => [setPortions(value), getDobavki()]}>
                              {value}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                ) : (
                  ''
                )}
                <div className="popup_info">
                  <div className="popup_weight">
                    <span>Вес:</span>
                    {value.weight} грамм
                  </div>
                  {value.diameter ? (
                    <div className="popup_diameter">
                      <span>Диаметр:</span>
                      {value.diameter} см
                    </div>
                  ) : (
                    ''
                  )}
                </div>
                {tovars.type === 1 ? (
                  <div className="pizza-dobavki">
                    {pizzaDobavki.map((value: any, i: number) => (
                      <div
                        onClick={() =>
                          dispatch(
                            checkedItems.includes(value.title + '=' + value.price + ' Р')
                              ? minus(value.price)
                              : plus(value.price),
                          )
                        }
                        className={
                          checkedItems.includes(value.title + '=' + value.price + ' Р')
                            ? 'dobavki_item_active'
                            : 'dobavki_item'
                        }>
                        <img src={value.imageUrl} />
                        <input
                          type="checkbox"
                          className="dobavki_active"
                          name={value.title + '=' + value.price + ' Р'}
                          checked={checkedItems[value]}
                          onChange={handleChange}
                        />
                        <label>{value.title}</label>
                        <div>{value.price} р.</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  ''
                )}
              </div>

              {changeSostav === true ? (
                <button
                  className="popup_button"
                  onClick={() => [
                    dispatch(setChangeFromCart(value)),
                    dispatch(setChangeTovar(false)),
                    dispatch(addTovar(value)),
                    close(),
                  ]}>
                  <div className="popup_price">Изменить состав {value.price + totalPrice} Р</div>
                </button>
              ) : (
                <button
                  className="popup_button"
                  onClick={() => [
                    dispatch(setFilterPizzaDobavki(checkedItems)),
                    dispatch(addtoCart(value)),
                    dispatch(PlustovarInCart(value)),
                    dispatch(setChangeTovar(false)),
                    dispatch(addTovar(value)),
                    close(),
                  ]}>
                  <div className="popup_price">
                    Добавить в корзину за {value.price + totalPrice} Р
                  </div>
                </button>
              )}
              <button className="popup_close" onClick={close}>
                <svg
                  version="1.1"
                  id="图层_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 40 40"
                  enable-background="new 0 0 40 40"
                  xmlSpace="preserve">
                  <g>
                    <g>
                      <g>
                        <path
                          fill="#231815"
                          d="M25,25.5c-0.1,0-0.3,0-0.4-0.1l-10-10c-0.2-0.2-0.2-0.5,0-0.7s0.5-0.2,0.7,0l10,10c0.2,0.2,0.2,0.5,0,0.7
				C25.3,25.5,25.1,25.5,25,25.5z"
                        />
                      </g>
                      <g>
                        <path
                          fill="#231815"
                          d="M15,25.5c-0.1,0-0.3,0-0.4-0.1c-0.2-0.2-0.2-0.5,0-0.7l10-10c0.2-0.2,0.5-0.2,0.7,0s0.2,0.5,0,0.7l-10,10
				C15.3,25.5,15.1,25.5,15,25.5z"
                        />
                      </g>
                    </g>
                  </g>
                </svg>
              </button>
            </div>
          </div>
        ))
      ) : (
        <div ref={ref} className="popup">
          <div className="popup_wrapper">
            <div className="popup_image">
              <img src={tovars.imageUrl} />
            </div>
            <div className="popup_right">
              <h2 className="popup_title">{tovars.title}</h2>
              <div className="popup_description">{tovars.description}</div>
              {tovars.dough ? (
                <div className="popup_dough">
                  <span>{menyType === 'аппетайзеры' ? 'Соус' : 'Тесто'}</span>
                  {tovars.category.map((value: string, i: number) => (
                    <div
                      className={buttonActive === i ? 'changeDough_active' : 'changeDough'}
                      key={i}
                      onClick={() => [
                        setButtonActive(i),
                        setDough(value),
                        dispatch(addDough(value)),
                        getDobavki(),
                      ]}>
                      {value}
                    </div>
                  ))}
                </div>
              ) : (
                ''
              )}
              <div className="popup_info">
                <div className="popup_weight">
                  <span>Вес:</span>
                  {tovars.weight} грамм
                </div>
              </div>
              <div className="pizza-dobavki">
                {tovars.type === 1
                  ? pizzaDobavki.map((value: any, i: number) => (
                      <div
                        onClick={() =>
                          dispatch(
                            checkedItems.includes(value.title + '=' + value.price + ' Р')
                              ? minus(value.price)
                              : plus(value.price),
                          )
                        }
                        className={
                          checkedItems.includes(value.title + '=' + value.price + ' Р')
                            ? 'dobavki_item_active'
                            : 'dobavki_item'
                        }>
                        <img src={value.imageUrl} />
                        <input
                          type="checkbox"
                          className="dobavki_active"
                          name={value.title + '=' + value.price + ' Р'}
                          checked={checkedItems[value]}
                          onChange={handleChange}
                        />
                        <label>{value.title}</label>
                        <div>{value.price} р.</div>
                      </div>
                    ))
                  : ''}
              </div>
            </div>
            {changeSostav === true ? (
              <button
                className="popup_button"
                onClick={() => [
                  dispatch(setFilterPizzaDobavki(checkedItems)),
                  dispatch(setChangeFromCart(tovars)),
                  dispatch(setChangeTovar(false)),
                  //dispatch(addTovar(posts)),
                  close(),
                ]}>
                <div className="popup_price">изменить состав {tovars.price + totalPrice} Р</div>
              </button>
            ) : (
              <button
                className="popup_button"
                onClick={() => [
                  dispatch(setFilterPizzaDobavki(checkedItems)),
                  dispatch(addtoCart(tovars)),
                  dispatch(PlustovarInCart(tovars)),
                  dispatch(setFilterPizzaDobavki([])),
                  dispatch(setChangeTovar(false)),
                  dispatch(addTovar(tovars)),
                  close(),
                ]}>
                <div className="popup_price">
                  Добавить в корзину за {tovars.price + totalPrice} Р
                </div>
              </button>
            )}
            <button className="popup_close" onClick={close}>
              <svg
                version="1.1"
                id="图层_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 40 40"
                enable-background="new 0 0 40 40"
                xmlSpace="preserve">
                <g>
                  <g>
                    <g>
                      <path
                        fill="#231815"
                        d="M25,25.5c-0.1,0-0.3,0-0.4-0.1l-10-10c-0.2-0.2-0.2-0.5,0-0.7s0.5-0.2,0.7,0l10,10c0.2,0.2,0.2,0.5,0,0.7
  C25.3,25.5,25.1,25.5,25,25.5z"
                      />
                    </g>
                    <g>
                      <path
                        fill="#231815"
                        d="M15,25.5c-0.1,0-0.3,0-0.4-0.1c-0.2-0.2-0.2-0.5,0-0.7l10-10c0.2-0.2,0.5-0.2,0.7,0s0.2,0.5,0,0.7l-10,10
  C15.3,25.5,15.1,25.5,15,25.5z"
                      />
                    </g>
                  </g>
                </g>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Popup;

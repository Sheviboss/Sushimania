import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth, setLog, setPass } from '../../redux/Slices/AuthSlice';
import { RootState } from '../../redux/store';
import Home from '../Home';
import User from './user';
import { profile } from '../../../consts/Profile';
import UserHistory from './user/userHistory';
import { setCategory } from '../../redux/Slices/ProfileSlice';
import { Link } from 'react-router-dom';
import Menu from '../../Menu';

const Profile: React.FC = () => {
  const auth = useSelector((state: RootState) => state.auth.auth);
  const category = useSelector((state: RootState) => state.profile.category);
  const userLogin = useSelector((state: RootState) => state.auth.login);
  const userPass = useSelector((state: RootState) => state.auth.password);
  const totalPrice = useSelector((state: RootState) => state.counter.price);
  const dispatch = useDispatch();
  const [user, setUser] = useState([]);
  const [history, setHistory] = useState([]);
  const [isError, setisError] = useState('');

  async function getUser() {
    try {
      const response = await axios.get(
        `https://629d9d56c6ef9335c0a10fed.mockapi.io/users?login=${userLogin}&password=${userPass}`,
      );
      setUser(response.data);
    } catch (e: unknown) {
      const error = e as AxiosError;
      setisError(error.message);
    }

    try {
      const response1 = await axios.get(
        `https://629d9d56c6ef9335c0a10fed.mockapi.io/history?login=${userLogin}`,
      );
      setHistory(response1.data);
    } catch (e: unknown) {
      const error = e as AxiosError;
      setisError(error.message);
    }
  }
  useEffect(() => {
    getUser();
  }, [userLogin]);
  return (
    <div className="profile">
      <Link to="/">
        <Menu />
      </Link>
      {auth ? (
        <>
          <ul className="categorys_profile">
            {profile.map((item: string, i: number) => (
              <li className="category_profile" onClick={() => dispatch(setCategory(i))}>
                {item}
              </li>
            ))}
            <Link to="/">
              <button
                className="button-exit"
                onClick={() => [
                  dispatch(setAuth(false)),
                  dispatch(setLog('')),
                  dispatch(setPass('')),
                  dispatch(setCategory(-1)),
                ]}>
                Выход
              </button>
            </Link>
          </ul>
          {category === 0
            ? user.map((value: any, i: number) => (
                <User
                  key={i}
                  name={value.name}
                  avatar={value.avatar}
                  login={value.login}
                  password={value.password}
                  id={0}
                  exit={() => [
                    dispatch(setAuth(false)),
                    dispatch(setLog('')),
                    dispatch(setPass('')),
                    dispatch(setCategory(-1)),
                  ]}
                />
              ))
            : ''}
          {category === 1 ? (
            <div className="history">
              <div>история заказов:</div>
              <div className="history-wrapper">
                {history.map((value: any, i: number) => (
                  <div className="item-border">
                    <div className="item-border_wrapper">
                      <div>дата заказа: {value.createdAt}</div>
                      <UserHistory
                        key={i}
                        history={value.history.map((item: any) => (
                          <div className="history-item">
                            <div className="history-item_wrapper">
                              <div className="history-item_title">
                                {item.title} {item.count}шт.
                                <div className="history-item_image">
                                  <img src={item.imageUrl} />
                                </div>
                              </div>
                              <div className="history-item_price">
                                цена за шт:{item.price}Р
                                <div className="history-item_totalPrice">
                                  общая сумма: {item.price * item.count}Р
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      />
                      <div className="totalPrice">
                        <span>общая сумма заказа:</span> {value.totalPrice}Р.
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            ''
          )}
          {category == 2 ? <div className="favorites">favorites</div> : ''}
        </>
      ) : (
        ''
      )}
    </div>
  );
};
export default Profile;

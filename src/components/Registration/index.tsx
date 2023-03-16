import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth, setLog, setPass, setName } from '../redux/Slices/AuthSlice';
import { RootState } from '../redux/store';

const Registration = () => {
  const userLogin = useSelector((state: RootState) => state.auth.login);
  const userPass = useSelector((state: RootState) => state.auth.password);
  const userName = useSelector((state: RootState) => state.auth.name);
  const auth = useSelector((state: RootState) => state.auth.auth);
  const dispatch = useDispatch();
  const registration = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .get(`https://629d9d56c6ef9335c0a10fed.mockapi.io/users`)
      .then(function (response) {
        console.log(response.data);

        if (response.data.find((el: any) => el.login === userLogin)) {
          alert('пользователь с таким логином уже существует');
        } else {
          if (userLogin.length > 0 && userPass.length > 0 && userName.length > 0) {
            axios.post('https://629d9d56c6ef9335c0a10fed.mockapi.io/users', {
              login: userLogin,
              password: userPass,
              name: userName,
            });
            dispatch(setAuth(true));
          } else {
            alert('вы ввели не все данные');
          }
        }
      })
      .catch(function (error) {
        alert(error as AxiosError);
      });
  };
  return (
    <>
      {auth ? (
        <div>Регистрация прошла успешно</div>
      ) : (
        <form onSubmit={registration}>
          <input
            type="text"
            id="login"
            placeholder="Логин"
            value={userLogin}
            onChange={(e) => {
              dispatch(setLog(e.target.value));
            }}
          />
          <input
            type="pasword"
            id="password"
            placeholder="Пароль"
            value={userPass}
            onChange={(e) => {
              dispatch(setPass(e.target.value));
            }}
          />
          <input
            type="text"
            id="name"
            placeholder="Имя пользователя"
            value={userName}
            onChange={(e) => {
              dispatch(setName(e.target.value));
            }}
          />
          <button type="submit">зарегистрироваться</button>
        </form>
      )}
    </>
  );
};
export default Registration;

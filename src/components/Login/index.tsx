import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setAuth, setLog, setPass } from '../redux/Slices/AuthSlice';
import Registration from '../Registration';
import useOnClickOutside from '../../hooks/Modal';

interface iReg {
  close: () => void;
}

const Login: React.FC<iReg> = ({ close }) => {
  const [reg, setReg] = useState(false);
  const [user, setUser] = useState<any>([]);
  const userLogin = useSelector((state: RootState) => state.auth.login);
  const userPass = useSelector((state: RootState) => state.auth.password);
  const auth = useSelector((state: RootState) => state.auth.auth);
  const dispatch = useDispatch();
  const ref = React.useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => close());
  function LoginIn(e: any) {
    e.preventDefault();
    axios
      .get(
        `https://629d9d56c6ef9335c0a10fed.mockapi.io/users?login=${userLogin}&password=${userPass}`,
      )
      .then(function (response) {
        setUser(response.data);
        const userLogPass = response.data.find(
          (el: any) => el.login === userLogin && el.password === userPass,
        );
        if (userLogPass) {
          dispatch(setAuth(true));
        } else {
          alert('неверный логин или пароль');
        }
      })
      .catch(function (error) {
        alert(error as AxiosError);
      });
  }
  return (
    <>
      <div className="login" ref={ref}>
        <div className="login_wrapper">
          {auth ? (
            <div>добро пожаловать {userLogin}</div>
          ) : reg ? (
            <Registration />
          ) : (
            <>
              <h1>Вход</h1>
              <form action="profile" onSubmit={LoginIn}>
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
                  type="password"
                  id="password"
                  placeholder="Пароль"
                  value={userPass}
                  onChange={(e) => {
                    dispatch(setPass(e.target.value));
                  }}
                />
                <button type="submit">Enter</button>
                <p>
                  нет акккаунта? пройдите <span onClick={() => setReg(true)}>регистрацию</span>
                </p>
              </form>
            </>
          )}

          <button className="popup_close" type="button" onClick={close}>
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
    </>
  );
};

export default Login;

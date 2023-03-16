import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { iUser } from '../../../../interfaces/iUser';
import { RootState } from '../../../redux/store';
import UserHistory from './userHistory';

const User: React.FC<iUser> = ({ createdAt, name, avatar, login, password, id, exit }) => {
  const [isError, setisError] = useState('');
  const [hustory, setHistory] = useState([]);
  const userLogin = useSelector((state: RootState) => state.auth.login);
  async function getHistory() {
    try {
      const response = await axios.get(
        `https://629d9d56c6ef9335c0a10fed.mockapi.io/history?login=${userLogin}`,
      );
      setHistory(response.data);
      console.log(response.data);
    } catch (e: unknown) {
      const error = e as AxiosError;
      setisError(error.message);
    }
  }
  useEffect(() => {
    getHistory();
  }, [userLogin]);
  return (
    <div className="user">
      <div className="user-info">
        <div className="user-img">
          <img src={avatar} />
        </div>
        <div className="user-about">
          <div className="user-name">{name}</div>
          <div className="user-login">Логин: {login}</div>
          <button className="exit-button" onClick={exit}>
            Exit
          </button>
        </div>
      </div>
    </div>
  );
};

export default User;

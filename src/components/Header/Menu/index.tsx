import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Login from '../../Login/';
import { RootState } from '../../redux/store';
import Header_Search from './Header_search/Header_search';
import useOnClickOutside from '../../../hooks/Modal';

const Menu: React.FC = () => {
  const [active, setActive] = useState(false);
  const { auth } = useSelector((state: RootState) => state.auth);
  const [registr, setRegistr] = useState(false);
  const ref = useRef<HTMLHeadingElement>(null);
  useOnClickOutside(ref, () => setActive(false));
  useEffect(() => {
    registr ? (document.body.style.overflow = 'hidden') : (document.body.style.overflow = 'unset');
  }, [registr]);
  return (
    <div className="menu" ref={ref}>
      <Header_Search />
      <button
        onClick={() => {
          setActive(!active);
        }}
        className={active ? 'burger--active' : 'burger'}>
        <span className="burger__line"></span>
      </button>
      <ul className={active ? 'submenu-active' : 'submenu'}>
        <li>Акции</li>
        <li>Доставка</li>
        <li>Оплата</li>
        <li>Контакты</li>
        <li>О нас</li>
      </ul>
      {auth ? (
        <Link to="/Profile">
          <button className="lk">Профиль</button>
        </Link>
      ) : (
        <button className="lk" onClick={() => setRegistr(true)}>
          Войти
        </button>
      )}

      {registr && <Login close={() => setRegistr(false)} />}
    </div>
  );
};

export default Menu;

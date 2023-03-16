import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../redux/store';

const Cart_button = () => {
  const cart = useSelector((state: RootState) => state.counter.count);

  return (
    <Link to="/cart">
      <button className="cart_button">
        Корзина
        <span>{cart}</span>
      </button>
    </Link>
  );
};

export default Cart_button;

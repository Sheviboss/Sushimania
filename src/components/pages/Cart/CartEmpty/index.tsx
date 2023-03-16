import { Link } from 'react-router-dom';

const CartEmpty = () => {
  return (
    <div className="cart-empty">
      <div>Твоя корзина пуста...</div>
      <div>...закажи что-нибудь!</div>
      <Link to="/">
        <button>вернуться в меню</button>
      </Link>
    </div>
  );
};

export default CartEmpty;

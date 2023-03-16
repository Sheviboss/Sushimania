import { useDispatch, useSelector } from 'react-redux';
import { iProduct } from '../../../../interfaces/Iproduct';
import { RootState } from '../../../redux/store';
import { setChangeTovar } from '../../../redux/Slices/CounterSlice';

const CartItem: React.FC<iProduct> = ({
  imageUrl,
  title,
  description,
  count,
  price,
  TotalCategoryPrice,
  dough,
  dobavki,
  diameter,
  category,
  menyType,
  addtoCart,
  removeFromCart,
  removeTovar,
  changeSostav,
  id,
}) => {
  return (
    <div className="cart-item">
      <div className="cart-item_inner">
        <div className="cart-item_image">
          <img src={imageUrl} />
          <div className="cart-item_bout">
            <h1 className="cart-item_tittle">{title}</h1>
            {category.length > 0 ? (
              <div className="cart_item-_pizza-dough">
                {menyType === 'appet' ? <span>Соус</span> : ''}
                {menyType === 'pizza' ? <span>Тесто</span> : ''}
                {menyType === 'пицца' ? <span>Тесто</span> : ''}
                {menyType?.includes('pizza') ||
                menyType?.includes('пицца') ||
                menyType?.includes('appet') ? (
                  <div>{category}</div>
                ) : (
                  ''
                )}
              </div>
            ) : (
              ''
            )}

            {diameter ? (
              <div className="cart_item-_pizza-diameter">
                <span>Димаетр:</span>
                <div>{diameter} см</div>
              </div>
            ) : (
              ''
            )}
            <div className="cart-item_subtittle">
              {description ? (
                <>
                  <span>Состав:</span>
                  <div className="descr">{description}</div>
                </>
              ) : (
                ''
              )}
            </div>
            {dobavki && dobavki.length > 0 ? (
              <div className="pizza-dobavki">
                <span>Добавки:</span>
                <div className="dobavki">
                  {dobavki?.map((value: any, i: number) => (
                    <div key={i}>{value}</div>
                  ))}
                </div>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
        <div className="cart-item_info">
          <div className="cart-item_count">
            <div className="cart-item_count_inner">
              <button onClick={removeFromCart}>-</button>
              {count}
              <button onClick={addtoCart}>+</button>
            </div>
          </div>
          <div className="cart-item_price">
            <div className="cart-item_price_one">{price} Р за шт.</div>
            <div className="cart-item_price_one_totalPrice">={TotalCategoryPrice}Р</div>
          </div>
          <button className="cart-item-delete" onClick={removeTovar}>
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="grey"
              xmlns="http://www.w3.org/2000/svg">
              <circle cx="13.125" cy="12.8159" r="12.5"></circle>
              <path
                d="M17.987 7.25941H15.4403V6.79636C15.4403 6.0304 14.8171 5.40723 14.0512 5.40723H12.199C11.433 5.40723 10.8098 6.0304 10.8098 6.79636V7.25941H8.26308C7.62477 7.25941 7.10547 7.77872 7.10547 8.41702V10.0377C7.10547 10.2934 7.3128 10.5007 7.56851 10.5007H7.82157L8.22161 18.9016C8.25695 19.6435 8.86643 20.2247 9.60916 20.2247H16.641C17.3837 20.2247 17.9932 19.6435 18.0285 18.9016L18.4286 10.5007H18.6816C18.9373 10.5007 19.1447 10.2934 19.1447 10.0377V8.41702C19.1447 7.77872 18.6254 7.25941 17.987 7.25941ZM11.7359 6.79636C11.7359 6.54105 11.9437 6.33332 12.199 6.33332H14.0512C14.3065 6.33332 14.5142 6.54105 14.5142 6.79636V7.25941H11.7359V6.79636ZM8.03156 8.41702C8.03156 8.28937 8.13543 8.1855 8.26308 8.1855H17.987C18.1147 8.1855 18.2186 8.28937 18.2186 8.41702V9.57464C18.0759 9.57464 8.6229 9.57464 8.03156 9.57464V8.41702ZM17.1035 18.8576C17.0917 19.1049 16.8885 19.2986 16.641 19.2986H9.60916C9.36157 19.2986 9.15841 19.1049 9.14666 18.8576L8.7487 10.5007H17.5014L17.1035 18.8576Z"
                fill="#FFF"></path>
              <path
                d="M13.1252 18.3724C13.3809 18.3724 13.5882 18.1651 13.5882 17.9094V11.8898C13.5882 11.6341 13.3809 11.4268 13.1252 11.4268C12.8694 11.4268 12.6621 11.6341 12.6621 11.8898V17.9094C12.6621 18.1651 12.8694 18.3724 13.1252 18.3724Z"
                fill="#FFF"></path>
              <path
                d="M15.4406 18.3724C15.6963 18.3724 15.9036 18.1651 15.9036 17.9094V11.8898C15.9036 11.6341 15.6963 11.4268 15.4406 11.4268C15.1849 11.4268 14.9775 11.6341 14.9775 11.8898V17.9094C14.9775 18.1651 15.1848 18.3724 15.4406 18.3724Z"
                fill="#FFF"></path>
              <path
                d="M10.8097 18.3724C11.0654 18.3724 11.2728 18.1651 11.2728 17.9094V11.8898C11.2728 11.6341 11.0654 11.4268 10.8097 11.4268C10.554 11.4268 10.3467 11.6341 10.3467 11.8898V17.9094C10.3467 18.1651 10.554 18.3724 10.8097 18.3724Z"
                fill="#FFF"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

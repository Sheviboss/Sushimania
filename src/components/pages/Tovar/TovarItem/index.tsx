import { useState } from 'react';
import { iProduct } from '../../../../interfaces/Iproduct';

const TovarItem: React.FC<iProduct> = ({
  openPopup,
  addtoCart,
  id,
  title,
  price,
  imageUrl,
  description,
}) => {
  const [favorites, setFavorites] = useState(false);
  return (
    <div className="product_item">
      <div className="product_image">
        <div
          className={favorites ? 'svg-favorites' : 'svg'}
          onClick={() => setFavorites(!favorites)}>
          <svg
            width="27"
            height="24"
            viewBox="0 0 27 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12.7903 5.09795C12.9657 5.41856 13.302 5.61793 13.6675 5.61793C14.033 5.61794 14.3693 5.41858 14.5448 5.09798C15.6605 3.05904 17.5199 1.62488 19.6996 1.62488C22.9697 1.62488 25.536 4.28692 25.536 8.04005C25.536 10.0159 24.7565 11.7204 23.2389 13.5517C21.696 15.4135 19.4687 17.3159 16.6705 19.7004L16.6705 19.7005L16.6697 19.7011C15.7635 20.4734 14.737 21.3482 13.6675 22.2817C12.5989 21.3489 11.5729 20.4746 10.6677 19.7032L10.6652 19.701L10.6651 19.7009C7.86664 17.3161 5.63917 15.4136 4.09616 13.5517C2.57849 11.7204 1.79901 10.0159 1.79901 8.04005C1.79901 4.28692 4.3653 1.62488 7.6354 1.62488C9.81507 1.62488 11.6746 3.05904 12.7903 5.09795Z"
              stroke="#bc002d"
              stroke-width="2"
              stroke-linejoin="round"></path>
          </svg>
        </div>
        <img src={imageUrl} onClick={openPopup} />
      </div>
      <div className="product_info">
        <div className="product_title" onClick={openPopup}>
          {title}
        </div>
        <div className="product_description">{description}</div>
        <div className="product_price">
          <div>{price} Р</div>
          <button onClick={addtoCart} className="product_button">
            Хочу
          </button>
        </div>
      </div>
    </div>
  );
};

export default TovarItem;

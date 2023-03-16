import { Autoplay, Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';

export default () => {
  const count = useSelector((state: RootState) => state.counter.value);
  return (
    <div className="slider-wrapper">
      <Swiper
        // install Swiper modules
        modules={[Autoplay, Navigation, Pagination, Scrollbar, A11y]}
        autoplay={{ delay: 3000 }}
        loop={true}
        breakpoints={{
          // when window width is >= 640px
          320: {
            slidesPerView: 1,
            spaceBetween: 50,
          },
          // when window width is >= 768px
          768: {
            spaceBetween: 50,
            slidesPerView: 1,
          },
        }}>
        <SwiperSlide>
          <img src={require('../../teampale/slider/slider_dr.jpeg')} />
        </SwiperSlide>
        <SwiperSlide>
          <a>
            <img src={require('../../teampale/slider/slider_busines_lunch.jpg')} />
          </a>
        </SwiperSlide>
        <SwiperSlide>
          <a>
            <img src={require('../../teampale/slider/slider_happy_time.jpeg')} />
          </a>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

import './style.scss';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { incrementByAmount } from '../../redux/Slices/CounterSlice';
import { setCategory } from '../../redux/Slices/ProfileSlice';
import { setSearchValue, setSearch } from '../../redux/Slices/SearchSlice';

const Logo: React.FC = () => {
  const dispatch = useDispatch();
  return (
    <div className="logo">
      <Link to="/">
        <img
          onClick={() => [
            dispatch(incrementByAmount('популярное')),
            dispatch(setCategory(-1)),
            dispatch(setSearchValue('')),
            dispatch(setSearch(false)),
          ]}
          src="https://xn--80apboguo4b3d.xn--p1ai/local/templates/sushimania_mobile/img/logo.svg"
        />
      </Link>
    </div>
  );
};

export default Logo;

import { useState } from 'react';
import { category } from '../../consts/category';
import { categorys_more } from '../../consts/category';
import Cart_button from './Cart_button';
import Search from './Search';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../components/redux/store';
import { incrementByAmount } from '../redux/Slices/CounterSlice';
import { setSearchValue } from '../redux/Slices/SearchSlice';
import {
  setFilterMinPriceValue,
  setFilterMaxPriceValue,
  setFilterMinWeight,
  setFilterMaxWeight,
  setFilterCheeze,
  setFilterNoCheeze,
  setFilterRolls,
  setFilterRollsComposition,
  setFilterPizzaPortions,
  setFilterPizzaDobavki,
} from '../redux/Slices/FilterSlice';

const Menu: React.FC = () => {
  const [toggle, setToggle] = useState(false);
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();
  return (
    <ul className="categorys">
      <div className="categorys_inner">
        {category.map((value, i) => (
          <li
            className={count === value ? 'category-active' : 'category'}
            key={i}
            onClick={() => [
              dispatch(incrementByAmount(value)),
              dispatch(setSearchValue('')),
              dispatch(setFilterRolls([])),
              dispatch(setFilterRollsComposition([])),
              dispatch(setFilterMinPriceValue(0)),
              dispatch(setFilterMaxPriceValue(5000)),
              dispatch(setFilterMinWeight(0)),
              dispatch(setFilterMaxWeight(5000)),
              dispatch(setFilterCheeze(true)),
              dispatch(setFilterNoCheeze(true)),
              dispatch(setFilterPizzaPortions([])),
              dispatch(setFilterPizzaDobavki([])),
            ]}>
            {value}
          </li>
        ))}
        <div className="menu-toggle" onClick={() => setToggle(!toggle)}>
          еще
          <ul className={toggle ? 'categorys_more-active' : 'categorys_more'}>
            {categorys_more.map((value, i) => (
              <li
                key={i}
                className={count === value ? 'more-active' : 'more'}
                onClick={() => [
                  dispatch(incrementByAmount(value)),
                  dispatch(setSearchValue('')),
                  dispatch(setFilterRolls([])),
                  dispatch(setFilterRollsComposition([])),
                  dispatch(setFilterMinPriceValue(0)),
                  dispatch(setFilterMaxPriceValue(5000)),
                  dispatch(setFilterMinWeight(0)),
                  dispatch(setFilterMaxWeight(5000)),
                  dispatch(setFilterCheeze(true)),
                  dispatch(setFilterNoCheeze(true)),
                  dispatch(setFilterPizzaPortions([])),
                  dispatch(setFilterPizzaDobavki([])),
                ]}>
                {value}
              </li>
            ))}
          </ul>
        </div>
        <Search />
        <Cart_button />
      </div>
    </ul>
  );
};

export default Menu;

import { useDispatch, useSelector } from 'react-redux';
import { useProducts } from '../../../../hooks/getProducts';
import { iProduct } from '../../../../interfaces/Iproduct';
import { setFilterMaxPriceValue, setFilterMinPriceValue } from '../../../redux/Slices/FilterSlice';
import { RootState } from '../../../redux/store';

const FilterForm: React.FC = () => {
  const tovars: iProduct = useSelector((state: RootState) => state.counter.tovars);
  const dispatch = useDispatch();
  const priceMin = useSelector((state: RootState) => state.filter.minPrice);
  const priceMax = useSelector((state: RootState) => state.filter.maxPrice);
  return (
    <div className="filter-form">
      <h3>фильтры</h3>
      <div className="price">
        <h4>Розничная цена</h4>
        <div>
          <span>от</span>
          <input
            type="number"
            value={priceMin}
            onChange={(e) => dispatch(setFilterMinPriceValue(Number(e.target.value)))}></input>
          <span>до</span>
          <input
            type="number"
            value={priceMax}
            onChange={(e) => dispatch(setFilterMaxPriceValue(Number(e.target.value)))}></input>
        </div>
      </div>
    </div>
  );
};

export default FilterForm;

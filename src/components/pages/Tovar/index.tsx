import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useProducts } from '../../../hooks/getProducts';
import { iProduct } from '../../../interfaces/Iproduct';
import Popup from '../../Popup';
import {
  addTovar,
  PlustovarInCart,
  addtoCart,
  limitTovar,
  addPopup,
  //addPopup,
} from '../../redux/Slices/CounterSlice';
import {
  setFilterMaxPriceValue,
  setFilterMinPriceValue,
  setFilterMinWeight,
  setFilterMaxWeight,
  setFilterCheeze,
  setFilterNoCheeze,
  setFilterRolls,
  setFilterRollsComposition,
  setFilterPizzaPortions,
} from '../../redux/Slices/FilterSlice';
import { RootState } from '../../redux/store';
import TovarItem from './TovarItem';
import { RangeSlider } from 'next-range-slider';
import { FilterRolls, CompositionRolls } from '../../../consts/FilterRolls';
import { FilterSushi } from '../../../consts/FilterSushi';
import CheckBox from '../Checkbox/Checkbox';
import { FilterSets } from '../../../consts/FilterSets';
import { FilterPizza, Filterdough, FilterPortions } from '../../../consts/FilterPizza';
import { FilterShaurma } from '../../../consts/FilterShaurma';
import { FilterNoodles } from '../../../consts/FilterNoodles';

const Tovar: React.FC<iProduct> = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const value = useSelector((state: RootState) => state.search.search);
  const {
    products,
    isLoading,
    isError,
    defaultMinPrice,
    defaultMaxPrice,
    defaultMinWeight,
    defaultMaxWeight,
    chezze,
    Nocheeze,
  } = useProducts();
  const [open, setOpen] = useState(false);
  const [openType, setOpenType] = useState(false);
  const [openComposition, setOpenComposition] = useState(false);
  const [openCheeze, setOpenCheeze] = useState(false);
  const [openPortions, setOpenPortions] = useState(false);
  const [showMoreType, setShowMoreType] = useState(false);
  const [ShowMoreComposition, setShowMoreComposition] = useState(false);
  const [active, setActive] = useState(false);
  const [activeFilterMobile, setActiveFilterMobile] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [minWeight, setMinWeight] = useState(0);
  const [maxWeight, setMaxWeight] = useState(0);
  const [checkedItems, setCheckedItems] = useState<any>([]);
  const [checkedItemsComposition, setCheckedItemsComposition] = useState<any>([]);
  const [checkedItemsPortions, setCheckedItemsPortions] = useState<any>([]);
  const [chez, setChez] = useState(false);
  const [nochez, setNoChez] = useState(false);
  const [popup, setPopup] = useState(false);
  const tovars: iProduct = useSelector((state: RootState) => state.counter.tovars);
  const dispatch = useDispatch();
  const clearFilter = () => {
    setMinPrice(defaultMinPrice);
    setMaxPrice(defaultMaxPrice);
    setMinWeight(defaultMinWeight);
    setMaxWeight(defaultMaxWeight);
    dispatch(setFilterMinPriceValue(0));
    dispatch(setFilterMaxPriceValue(5000));
    dispatch(setFilterMinWeight(0));
    dispatch(setFilterMaxWeight(5000));
    dispatch(setFilterNoCheeze(false));
    dispatch(setFilterCheeze(false));
    dispatch(setFilterRolls([]));
    dispatch(setFilterRollsComposition([]));
    setCheckedItemsComposition([]);
    setOpenType(false);
    setShowMoreType(false);
    setShowMoreComposition(false);
    setOpenComposition(false);
  };
  function chengeCheckboxchez() {
    setChez(!chez);
    if (nochez) {
      setNoChez(!nochez);
    }
  }
  function chengeCheckboxNochez() {
    setNoChez(!nochez);
    if (chez) {
      setChez(!chez);
    }
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    if (checked) {
      setCheckedItems((prev: string[]) => [...prev, e.target.name]);
    } else {
      setCheckedItems((prev: string[]) => prev.filter((x: string) => x !== e.target.name));
    }
  };
  const handleChangeComposition = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    if (checked) {
      setCheckedItemsComposition((prev: string[]) => [...prev, e.target.name]);
    } else {
      setCheckedItemsComposition((prev: string[]) =>
        prev.filter((x: string) => x !== e.target.name),
      );
    }
  };
  const handleChangePortions = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    if (checked) {
      setCheckedItemsPortions((prev: string[]) => [...prev, e.target.name]);
    } else {
      setCheckedItemsPortions((prev: string[]) => prev.filter((x: string) => x !== e.target.name));
    }
  };
  useEffect(() => {
    setMinPrice(defaultMinPrice);
    setMaxPrice(defaultMaxPrice);
    setMinWeight(defaultMinWeight);
    setMaxWeight(defaultMaxWeight);
    setChez(chezze);
    setNoChez(Nocheeze);
    popup ? (document.body.style.overflow = 'hidden') : (document.body.style.overflow = 'unset');
  }, [
    defaultMinPrice,
    defaultMaxPrice,
    defaultMinWeight,
    defaultMaxWeight,
    chezze,
    Nocheeze,
    checkedItems,
    checkedItemsComposition,
    popup,
    checkedItemsPortions,
  ]);
  return (
    <ul>
      <div className="tovar-page">
        <div className={activeFilterMobile ? 'filter-form-mobile' : 'filter-form'}>
          <button
            className="filter-form-mobile_exit"
            onClick={() => [
              setActiveFilterMobile(false),
              setOpenType(false),
              setShowMoreType(false),
              setShowMoreComposition(!ShowMoreComposition),
              setOpenComposition(false),
            ]}></button>
          <h3>фильтры</h3>
          <div className="filterValue">
            <li className="changeValue">
              <h4 className="tittle-default">Розничная цена</h4>
              <div className="changeValue_inner">
                <span>От</span>
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(Number(e.target.value))}></input>
                <span>До</span>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}></input>
              </div>
              <div className="changeValue_inner_price">
                <RangeSlider
                  min={defaultMinPrice}
                  max={defaultMaxPrice}
                  step={1}
                  options={{
                    leftInputProps: {
                      value: minPrice,
                      onChange: (e) => setMinPrice(Number(e.target.value)),
                    },
                    rightInputProps: {
                      value: maxPrice,
                      onChange: (e) => setMaxPrice(Number(e.target.value)),
                    },
                  }}
                />
              </div>
            </li>
            {count === 'ролы' ||
            count === 'суши' ||
            count === 'сеты' ||
            count === 'пицца' ||
            count === 'шаурма' ||
            count === 'лапаша/рис' ? (
              <li className="typeOfRolls">
                <h4
                  className={
                    openComposition ? 'tittle-default-open-active_type' : 'tittle-default-open_type'
                  }
                  onClick={() => setOpenComposition(!openComposition)}>
                  Состав
                </h4>
                <div
                  className={
                    openComposition
                      ? 'changeValue_inner-open-active_type'
                      : 'changeValue_inner-open_type'
                  }>
                  {count === 'ролы' ? (
                    <>
                      {CompositionRolls.map((value) => (
                        <div
                          className={
                            ShowMoreComposition ? 'checkbox-wrapper_active' : 'checkbox-wrapper'
                          }>
                          <CheckBox
                            key={value}
                            checked={checkedItemsComposition[value]}
                            name={value}
                            label={value}
                            onChange={handleChangeComposition}
                          />
                        </div>
                      ))}
                      <li
                        className="showMoreTypes"
                        onClick={() => setShowMoreComposition(!ShowMoreComposition)}>
                        {ShowMoreComposition
                          ? `скрыть ${CompositionRolls.length - 5}`
                          : `показать еще  ${CompositionRolls.length - 5}`}
                      </li>
                    </>
                  ) : (
                    ''
                  )}
                  {count === 'суши' ? (
                    <>
                      {FilterSushi.map((value) => (
                        <div
                          className={
                            ShowMoreComposition ? 'checkbox-wrapper_active' : 'checkbox-wrapper'
                          }>
                          <CheckBox
                            key={value}
                            checked={checkedItemsComposition[value]}
                            name={value}
                            label={value}
                            onChange={handleChangeComposition}
                          />
                        </div>
                      ))}
                      <li
                        className="showMoreTypes"
                        onClick={() => setShowMoreComposition(!ShowMoreComposition)}>
                        {ShowMoreComposition
                          ? `скрыть ${FilterSushi.length - 5}`
                          : `показать еще  ${FilterSushi.length - 5}`}
                      </li>
                    </>
                  ) : (
                    ''
                  )}
                  {count === 'сеты' ? (
                    <>
                      {FilterSets.map((value) => (
                        <div
                          className={
                            ShowMoreComposition ? 'checkbox-wrapper_active' : 'checkbox-wrapper'
                          }>
                          <CheckBox
                            key={value}
                            checked={checkedItemsComposition[value]}
                            name={value}
                            label={value}
                            onChange={handleChangeComposition}
                          />
                        </div>
                      ))}
                      <li
                        className="showMoreTypes"
                        onClick={() => setShowMoreComposition(!ShowMoreComposition)}>
                        {ShowMoreComposition
                          ? `скрыть ${FilterSets.length - 5}`
                          : `показать еще  ${FilterSets.length - 5}`}
                      </li>
                    </>
                  ) : (
                    ''
                  )}
                  {count === 'пицца' ? (
                    <>
                      {FilterPizza.map((value) => (
                        <div
                          className={
                            ShowMoreComposition ? 'checkbox-wrapper_active' : 'checkbox-wrapper'
                          }>
                          <CheckBox
                            key={value}
                            checked={checkedItemsComposition[value]}
                            name={value}
                            label={value}
                            onChange={handleChangeComposition}
                          />
                        </div>
                      ))}
                      <li
                        className="showMoreTypes"
                        onClick={() => setShowMoreComposition(!ShowMoreComposition)}>
                        {ShowMoreComposition
                          ? `скрыть ${FilterPizza.length - 5}`
                          : `показать еще  ${FilterPizza.length - 5}`}
                      </li>
                    </>
                  ) : (
                    ''
                  )}
                  {count === 'шаурма' ? (
                    <>
                      {FilterShaurma.map((value) => (
                        <div
                          className={
                            ShowMoreComposition ? 'checkbox-wrapper_active' : 'checkbox-wrapper'
                          }>
                          <CheckBox
                            key={value}
                            checked={checkedItemsComposition[value]}
                            name={value}
                            label={value}
                            onChange={handleChangeComposition}
                          />
                        </div>
                      ))}
                      <li
                        className="showMoreTypes"
                        onClick={() => setShowMoreComposition(!ShowMoreComposition)}>
                        {ShowMoreComposition
                          ? `скрыть ${FilterShaurma.length - 5}`
                          : `показать еще  ${FilterShaurma.length - 5}`}
                      </li>
                    </>
                  ) : (
                    ''
                  )}
                  {count === 'лапаша/рис' ? (
                    <>
                      {FilterNoodles.map((value) => (
                        <div
                          className={
                            ShowMoreComposition ? 'checkbox-wrapper_active' : 'checkbox-wrapper'
                          }>
                          <CheckBox
                            key={value}
                            checked={checkedItemsComposition[value]}
                            name={value}
                            label={value}
                            onChange={handleChangeComposition}
                          />
                        </div>
                      ))}
                      <li
                        className="showMoreTypes"
                        onClick={() => setShowMoreComposition(!ShowMoreComposition)}>
                        {ShowMoreComposition
                          ? `скрыть ${FilterNoodles.length - 5}`
                          : `показать еще  ${FilterNoodles.length - 5}`}
                      </li>
                    </>
                  ) : (
                    ''
                  )}
                </div>
              </li>
            ) : (
              ''
            )}
            {count === 'напитки' ||
            count === 'суши' ||
            count === 'шаурма' ||
            count === 'Сертификаты' ? (
              ''
            ) : (
              <li className="changeValue-weight">
                <h4
                  className={open ? 'tittle-default-open-active' : 'tittle-default-open'}
                  onClick={() => setOpen(!open)}>
                  Вес
                </h4>
                <div className="changeValue-weight_inner">
                  <div
                    className={open ? 'changeValue_inner-open-active' : 'changeValue_inner-open'}>
                    <span>От</span>
                    <input
                      type="number"
                      value={minWeight}
                      onChange={(e) => setMinWeight(Number(e.target.value))}></input>
                    <span>До</span>
                    <input
                      type="number"
                      value={maxWeight}
                      onChange={(e) => setMaxWeight(Number(e.target.value))}></input>
                  </div>
                  {open ? (
                    <RangeSlider
                      min={defaultMinWeight}
                      max={defaultMaxWeight}
                      step={1}
                      options={{
                        leftInputProps: {
                          value: minWeight,
                          onChange: (e) => setMinWeight(Number(e.target.value)),
                        },
                        rightInputProps: {
                          value: maxWeight,
                          onChange: (e) => setMaxWeight(Number(e.target.value)),
                        },
                      }}
                    />
                  ) : (
                    ''
                  )}
                </div>
              </li>
            )}
            {count === 'ролы' ? (
              <>
                <li className="typeOfRolls">
                  <h4
                    className={
                      openType ? 'tittle-default-open-active_type' : 'tittle-default-open_type'
                    }
                    onClick={() => setOpenType(!openType)}>
                    Тип
                  </h4>
                  <div
                    className={
                      openType
                        ? 'changeValue_inner-open-active_type'
                        : 'changeValue_inner-open_type'
                    }>
                    {FilterRolls.map((value) => (
                      <div
                        className={showMoreType ? 'checkbox-wrapper_active' : 'checkbox-wrapper'}>
                        <CheckBox
                          key={value}
                          checked={checkedItems[value]}
                          name={value}
                          label={value}
                          onChange={handleChange}
                        />
                      </div>
                    ))}
                    <li className="showMoreTypes" onClick={() => setShowMoreType(!showMoreType)}>
                      {showMoreType
                        ? `скрыть ${FilterRolls.length - 5}`
                        : `показать еще  ${FilterRolls.length - 5}`}
                    </li>
                  </div>
                </li>
                <li className="cheeze">
                  <h4
                    className={openCheeze ? 'tittle-default-open-active' : 'tittle-default-open'}
                    onClick={() => setOpenCheeze(!openCheeze)}>
                    Сыр филадельфия
                  </h4>
                  <div
                    className={
                      openCheeze
                        ? 'changeValue_inner-open-chezze-active'
                        : 'changeValue_inner-open-chezze'
                    }>
                    <div className="check">
                      <input
                        type="checkbox"
                        className="checkbox"
                        checked={chez}
                        onChange={chengeCheckboxchez}
                      />
                      <span></span>
                      <label>есть</label>
                    </div>
                    <div className="check">
                      <input
                        type="checkbox"
                        className="checkbox"
                        checked={nochez}
                        onChange={chengeCheckboxNochez}
                      />
                      <span></span>
                      <label>нет</label>
                    </div>
                  </div>
                </li>
              </>
            ) : (
              ''
            )}
            {count === 'пицца' ? (
              <>
                <li className="cheeze">
                  <h4
                    className={openCheeze ? 'tittle-default-open-active' : 'tittle-default-open'}
                    onClick={() => setOpenCheeze(!openCheeze)}>
                    Тесто
                  </h4>
                  <div
                    className={
                      openCheeze
                        ? 'changeValue_inner-open-chezze-active'
                        : 'changeValue_inner-open-chezze'
                    }>
                    {Filterdough.map((value) => (
                      <div
                        className={
                          ShowMoreComposition ? 'checkbox-wrapper_active' : 'checkbox-wrapper'
                        }>
                        <CheckBox
                          key={value}
                          checked={checkedItems[value]}
                          name={value}
                          label={value}
                          onChange={handleChange}
                        />
                      </div>
                    ))}
                  </div>
                </li>
                <li className="cheeze">
                  <h4
                    className={openPortions ? 'tittle-default-open-active' : 'tittle-default-open'}
                    onClick={() => setOpenPortions(!openPortions)}>
                    Порции
                  </h4>
                  <div
                    className={
                      openPortions
                        ? 'changeValue_inner-open-chezze-active'
                        : 'changeValue_inner-open-chezze'
                    }>
                    {FilterPortions.map((value) => (
                      <div
                        className={
                          ShowMoreComposition ? 'checkbox-wrapper_active' : 'checkbox-wrapper'
                        }>
                        <CheckBox
                          key={value}
                          checked={checkedItemsPortions[value]}
                          name={value}
                          label={value}
                          onChange={handleChangePortions}
                        />
                      </div>
                    ))}
                  </div>
                </li>
              </>
            ) : (
              ''
            )}
          </div>
          <div className="filter-buttons">
            <button
              className="showFilter"
              onClick={() => [
                dispatch(setFilterMinPriceValue(minPrice)),
                dispatch(setFilterMaxPriceValue(maxPrice)),
                dispatch(setFilterMinWeight(minWeight)),
                dispatch(setFilterMaxWeight(maxWeight)),
                dispatch(setFilterCheeze(chez)),
                dispatch(setFilterNoCheeze(nochez)),
                dispatch(setFilterRolls(checkedItems)),
                dispatch(setFilterRollsComposition(checkedItemsComposition)),
                dispatch(setFilterPizzaPortions(checkedItemsPortions)),
                setCheckedItemsComposition([]),
                setCheckedItems([]),
                setActiveFilterMobile(false),
                setShowMoreComposition(false),
                setOpenComposition(false),
              ]}>
              Показать({products.length})
            </button>
            <button className="clearFilter" onClick={() => [clearFilter()]}></button>
          </div>
        </div>
        <div className="products-block">
          <button
            className="mobile_filter_toggle"
            onClick={() => setActiveFilterMobile(!activeFilterMobile)}>
            <svg
              width="16"
              height="19"
              viewBox="0 0 16 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M2.03186 0.814697H1.15295V12.1272H0.274048V14.9397H1.15295V16.8147H2.03186V14.9397H2.91077V12.1272H2.03186V0.814697ZM2.03186 14.0022H1.15295V13.0647H2.03186V14.0022Z"
                fill="#BC002D"
              />
              <path
                d="M12.3971 0.814697H11.5182V7.7522H10.6393V10.5647H11.5182V16.8147H12.3971V10.5647H13.276V7.7522H12.3971V0.814697ZM12.3971 9.6272H11.5182V8.6897H12.3971V9.6272Z"
                fill="#BC002D"
              />
              <path
                d="M7.21448 0.814697H6.33557V2.49132H5.45667V5.30382H6.33557V16.8147H7.21448V5.30382H8.09338V2.49132H7.21448V0.814697ZM7.21448 4.36632H6.33557V3.42882H7.21448V4.36632Z"
                fill="#BC002D"
              />
            </svg>
            Фильтры
          </button>
          {products.length > 0 ? (
            products.map((value: iProduct) => (
              <TovarItem
                key={value.id}
                id={value.id}
                title={value.title}
                price={value.price}
                imageUrl={value.imageUrl}
                description={value.description}
                openPopup={() => [
                  setPopup(true),
                  dispatch(addTovar(value)),
                  dispatch(addPopup(value)),
                  setActive(true),
                ]}
                addtoCart={() => [
                  value.menyType === 'пицца' || value.menyType?.includes('шаурма')
                    ? [setPopup(true), dispatch(addTovar(value)), dispatch(addPopup(value))]
                    : [
                        setPopup(false),
                        dispatch(addTovar(value)),
                        dispatch(addPopup(value)),
                        dispatch(addtoCart(value)),
                        dispatch(PlustovarInCart(value)),
                      ],
                ]}
                weight={0}
                count={0}
                category={value.category}
                composition={value.composition}
              />
            ))
          ) : (
            <div className="noTovars">Товаров не найдено</div>
          )}

          {popup && (
            <Popup
              close={() => [
                setPopup(false),
                setActive(false),
                (document.body.style.overflow = 'auto'),
              ]}
              addtoCart={() => [
                setPopup(false),
                setActive(false),
                dispatch(addtoCart(tovars)),
                dispatch(PlustovarInCart(tovars)),
                (document.body.style.overflow = 'auto'),
              ]}
            />
          )}
          {isError && <div>{isError}</div>}
          <button
            className={count === 'популярное' ? 'more-hide' : 'more'}
            onClick={() => dispatch(limitTovar(12))}>
            Показать еще
          </button>
        </div>
      </div>
    </ul>
  );
};
export default Tovar;

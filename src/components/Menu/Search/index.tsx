import { useDispatch, useSelector } from 'react-redux';
import { setSearch, setSearchValue } from '../../redux/Slices/SearchSlice';
import { RootState } from '../../redux/store';

const Search = () => {
  const value = useSelector((state: RootState) => state.search.search);
  const search = useSelector((state: RootState) => state.search.setSearch);
  const dispatch = useDispatch();
  return (
    <div className="search-form">
      {search === true ? (
        <>
          <input
            className="input-serach"
            type="text"
            value={value}
            placeholder="Поиск"
            onChange={(e) => dispatch(setSearchValue(e.target.value))}></input>
          <button className="input-search_close" onClick={() => dispatch(setSearch(false))}>
            ×
          </button>
        </>
      ) : (
        <div className="search" onClick={() => dispatch(setSearch(true))}>
          <svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              d="m16.9994 16.2923 3.8542 3.8541c.1952.1953.1952.5119 0 .7072-.1953.1952-.5119.1952-.7072 0l-3.8541-3.8542c-1.4103 1.2451-3.2631 2.0006-5.2923 2.0006-4.41828 0-8-3.5817-8-8 0-4.41828 3.58172-8 8-8 4.4183 0 8 3.58172 8 8 0 2.0292-.7555 3.882-2.0006 5.2923zm-5.9994 1.7077c3.866 0 7-3.134 7-7 0-3.86599-3.134-7-7-7-3.86599 0-7 3.13401-7 7 0 3.866 3.13401 7 7 7z"
              fill="rgb(0,0,0)"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default Search;

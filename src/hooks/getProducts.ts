import axios, { AxiosError } from 'axios';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../components/redux/store';
import { iProduct } from '../interfaces/Iproduct';

export function useProducts() {
  const [products, setProducts] = useState<any>([{}]);
  const [isLoading, setisLoading] = useState(false);
  const [isError, setisError] = useState('');
  const [defaultMinPrice, setDefaultMinPrice] = useState(0);
  const [defaultMaxPrice, setDefaultMaxPrice] = useState(0);
  const [defaultMinWeight, setDefaultMinWeight] = useState(0);
  const [defaultMaxWeight, setDefaultMaxWeight] = useState(0);
  const [chezze, setCheeze] = useState(false);
  const value = useSelector((state: RootState) => state.search.search);
  const count = useSelector((state: RootState) => state.counter.value);
  const limitTovar = useSelector((state: RootState) => state.counter.limit);
  const priceMin = useSelector((state: RootState) => state.filter.minPrice);
  const priceMax = useSelector((state: RootState) => state.filter.maxPrice);
  const weightMin = useSelector((state: RootState) => state.filter.minWeight);
  const weightMax = useSelector((state: RootState) => state.filter.maxWeight);
  const cheeze = useSelector((state: RootState) => state.filter.cheeze);
  const Nocheeze = useSelector((state: RootState) => state.filter.nocheeze);
  const rols = useSelector((state: RootState) => state.filter.rolls);
  const rolsComposition = useSelector((state: RootState) => state.filter.rollsComposition);
  const pizzaPortions = useSelector((state: RootState) => state.filter.pizzaPortions);
  const search = useSelector((state: RootState) => state.search.setSearch);

  async function getProducts() {
    const contains = (where: string | any[], what: string | any[]) => {
      for (var i = 0; i < what.length; i++) {
        if (where.indexOf(what[i]) == -1) return false;
      }
      return true;
    };
    if (count === 'популярное') {
      if (search === true) {
        try {
          const response = await axios.get(
            `https://629d9d56c6ef9335c0a10fed.mockapi.io/products?search=${value}`,
          );
          setProducts(response.data);
        } catch (error) {}
      } else {
        try {
          setisLoading(true);
          const response = await axios.get(
            `https://629d9d56c6ef9335c0a10fed.mockapi.io/products?page=1&limit=12&type=0`,
          );
          setProducts(response.data);
          setisLoading(false);
        } catch (e: unknown) {
          const error = e as AxiosError;
          setisError(error.message);
        }
      }
    } else {
      if (search === true) {
        try {
          const response = await axios.get(
            `https://629d9d56c6ef9335c0a10fed.mockapi.io/products?search=${value}&menyType=${count}`,
          );
          setProducts(response.data);
        } catch (error) {}
      } else {
        try {
          const response = await axios.get(
            `https://629d9d56c6ef9335c0a10fed.mockapi.io/products?menyType=${count}&page=1&limit=${limitTovar}`,
          );
          setProducts(
            response.data.filter(
              (item: iProduct) =>
                item.price >= priceMin &&
                item.price <= priceMax &&
                item.weight >= weightMin &&
                item.weight <= weightMax,
            ),
          );

          setDefaultMinPrice(
            response.data.length > 1 ? Math.min(...response.data.map((e: iProduct) => e.price)) : 0,
          );

          setDefaultMaxPrice(
            response.data.length > 1
              ? Math.max(...response.data.map((e: iProduct) => e.price))
              : 1000,
          );
          setDefaultMinWeight(
            response.data.length > 1
              ? Math.min(...response.data.map((e: iProduct) => e.weight))
              : 0,
          );
          setDefaultMaxWeight(
            response.data.length > 1
              ? Math.max(...response.data.map((e: iProduct) => e.weight))
              : 1000,
          );

          //philadelphia
          if (count === 'ролы') {
            if (cheeze === true && Nocheeze === false) {
              setProducts(
                response.data.filter(
                  (item: iProduct) =>
                    item.description.includes('сыр филадельфия') &&
                    item.price >= priceMin &&
                    item.price <= priceMax &&
                    item.weight >= weightMin &&
                    item.weight <= weightMax &&
                    contains(item.category, rols) &&
                    contains(item.composition, rolsComposition),
                ),
              );
            } else if (Nocheeze === true && cheeze === false) {
              setProducts(
                response.data.filter(
                  (item: iProduct) =>
                    !item.description.includes('сыр филадельфия') &&
                    item.price >= priceMin &&
                    item.price <= priceMax &&
                    item.weight >= weightMin &&
                    item.weight <= weightMax &&
                    contains(item.category, rols) &&
                    contains(item.composition, rolsComposition),
                ),
              );
            } else
              setProducts(
                response.data.filter(
                  (item: iProduct) =>
                    item.price >= priceMin &&
                    item.price <= priceMax &&
                    item.weight >= weightMin &&
                    item.weight <= weightMax &&
                    contains(item.category, rols) &&
                    contains(item.composition, rolsComposition),
                ),
              );
          } else {
            setProducts(
              response.data.filter(
                (item: iProduct) =>
                  item.price >= priceMin &&
                  item.price <= priceMax &&
                  item.weight >= weightMin &&
                  item.weight <= weightMax &&
                  contains(item.portions, pizzaPortions) &&
                  contains(item.composition, rolsComposition) &&
                  contains(item.category, rols),
              ),
            );
          }
        } catch (e: unknown) {
          const error = e as AxiosError;
          setisError(error.message);
        }
      }
    }
  }
  useEffect(() => {
    getProducts();
  }, [
    count,
    value,
    limitTovar,
    priceMax,
    priceMin,
    weightMin,
    weightMax,
    cheeze,
    Nocheeze,
    rols,
    rolsComposition,
    pizzaPortions,
    search,
  ]);
  return {
    products,
    isLoading,
    isError,
    weightMin,
    weightMax,
    defaultMinPrice,
    defaultMaxPrice,
    defaultMinWeight,
    defaultMaxWeight,
    chezze,
    Nocheeze,
    rolsComposition,
  };
}

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { iProduct } from '../../../interfaces/Iproduct';
import axios from 'axios';

export interface CounterState {
  limit: number;
  count: number;
  price: number;
  value: string;
  dough: string;
  pizzaDoavki: any;
  tovars: {
    id: number;
    title: string;
    price: number;
    imageUrl: string;
    description: string;
    diameter?: string;
    composition: string[];
    weight: number;
    count: number;
    category: string[];
    dough?: any;
    menyType?: string;
    type?: number;
  };
  popup: {
    id: number;
    title: string;
    price: number;
    imageUrl: string;
    description: string;
    diameter?: string;
    composition: string[];
    weight: number;
    count: number;
    category: string[];
    dough?: any;
    menyType?: string;
    type?: number;
  };
  cart:
    | [
        {
          id: number;
          title: string;
          price: number;
          imageUrl: string;
          description: string;
          composition: string[];
          weight: number;
          count: number;
          dobavki?: string[];
          category: string[];
        },
      ]
    | any;
  tovarInCart: [] | any;
  tottalPrice: number;
  totalPricePizza: number;
  changeTovar: boolean;
}

const initialState: CounterState = {
  limit: 12,
  value: 'популярное',
  dough: '',
  pizzaDoavki: [{}],
  tovars: {
    id: Math.random(),
    title: '',
    price: 0,
    imageUrl: '',
    description: '',
    diameter: '',
    composition: [],
    weight: 0,
    count: 0,
    category: [],
    dough: [],
    type: 0,
  },
  popup: {
    id: Math.random(),
    title: '',
    price: 0,
    imageUrl: '',
    description: '',
    diameter: '',
    composition: [],
    weight: 0,
    count: 0,
    category: [],
    dough: [],
    type: 0,
  },
  cart: [
    {
      id: Math.random(),
      title: '',
      price: 0,
      imageUrl: '',
      description: '',
      composition: [],
      weight: 0,
      count: 0,
      category: '',
      dobavki: [],
    },
  ],
  tovarInCart: [],
  tottalPrice: 0,
  totalPricePizza: 0,
  count: 0,
  price: 0,
  changeTovar: false,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    incrementByAmount: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
    plus: (state, action: PayloadAction<number>) => {
      state.totalPricePizza += action.payload;
    },
    minus: (state, action: PayloadAction<number>) => {
      state.totalPricePizza -= action.payload;
    },
    addTovar: (state, action: PayloadAction<iProduct>) => {
      state.tovars = action.payload;
      state.dough = action.payload.title;
      // state.pizzaDoavki = [];
    },
    addPopup: (state, action: PayloadAction<iProduct>) => {
      state.popup = action.payload;
    },
    addDough: (state, action: PayloadAction<string>) => {
      state.dough = state.tovars.title + ' ' + action.payload;
    },
    addtoCart: (state, action: PayloadAction<iProduct>) => {
      // state.cart.splice(0, state.cart.length);
      const del = state.cart.find((obj: iProduct) => obj.title === '');
      const findItem = state.cart.find(
        (obj: iProduct) => obj.title === action.payload.title && obj.price === action.payload.price,
      );
      state.count += 1;
      state.price += action.payload.price + state.totalPricePizza;
      if (findItem) {
        findItem.count++;
      } else {
        if (del) {
          state.cart.splice(0, 1);
          state.cart.push({
            ...action.payload,
            count: 1,
            dobavki: state.pizzaDoavki,
            price: state.totalPricePizza + action.payload.price,
            id: Math.random(),
          });
        } else {
          state.cart.push({
            ...action.payload,
            count: 1,
            dobavki: state.pizzaDoavki,
            price: state.totalPricePizza + action.payload.price,
            id: Math.random(),
          });
        }
      }
    },
    PlustovarInCart: (state, action: PayloadAction<iProduct>) => {
      state.tovarInCart.push({ ...action.payload });
    },
    removeFromCart: (state, action) => {
      const findItem = state.cart.find((obj: iProduct) => obj.id === action.payload.id);
      if (findItem.count > 1) {
        findItem.count -= 1;
        state.count -= 1;
        state.price -= action.payload.price;
      } else {
        //state.tovarInCart.splice(0, 1); // удаляем один элемент(любой) чтобы подсчитать кол-во элементов в массиве
        //  state.cart = state.cart.filter((obj: iProduct) => obj.count !== 0); //если count = 0, то удаляем объект из массива
      }
    },
    removeTovar: (state, action: PayloadAction<iProduct>) => {
      const findItem = state.cart.find((obj: iProduct) => obj.id === action.payload.id);
      state.count = state.count - action.payload.count;
      state.price = state.price - action.payload.price * action.payload.count;
      if (findItem) {
        state.cart = state.cart.filter((obj: iProduct) => obj.id !== action.payload.id);
        state.tovarInCart = state.tovarInCart.filter(
          (obj: iProduct) => obj.id !== action.payload.id, //удаляем если id совпадает
        );
      }
    },
    limitTovar: (state, action: PayloadAction<number>) => {
      state.limit = state.limit + 12;
    },
    setFilterPizzaDobavki: (state, action: PayloadAction<string[]>) => {
      state.pizzaDoavki = action.payload;
    },
    setChangeFromCart: (state, action) => {
      const findItem = state.cart.find((obj: iProduct) => obj.id1 === action.payload.id1);
      const index = state.cart.indexOf(findItem);
      if (index !== -1) {
        state.cart[index] = action.payload;
        console.log(action.payload);
        //state.cart[index].count = state.tovars.count;
        state.cart[index].price = action.payload.price + state.totalPricePizza;
        state.cart[index].dobavki = state.pizzaDoavki;
        console.log('find', index);
      }
      // findItem.dobavki = action.payload;
      // findItem.id = action.payload.id;
    },
    clearCart: (state) => {
      state.cart = [];
      state.count = 0;
      state.price = 0;
    },
    setChangeTovar: (state, action) => {
      state.totalPricePizza = 0;
      state.changeTovar = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  incrementByAmount,
  addTovar,
  addtoCart,
  PlustovarInCart,
  removeFromCart,
  removeTovar,
  limitTovar,
  addDough,
  setFilterPizzaDobavki,
  plus,
  minus,
  setChangeFromCart,
  clearCart,
  setChangeTovar,
  addPopup,
} = counterSlice.actions;

export default counterSlice.reducer;

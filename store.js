import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './src/features/rootReducer';

const store = configureStore({
  reducer: { root: rootReducer },
});

export default store;

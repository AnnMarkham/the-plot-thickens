import React, { createContext, useContext } from 'react';
import { useItemReducer } from './reducers';

const StoreContext = createContext();
const { Provider } = StoreContext;

const StoreProvider = ({ ...props }) => {
  const [state, dispatch] = useItemReducer({
    stories: [],
    notes: [],

  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => useContext(StoreContext);

export { StoreProvider, useStoreContext };
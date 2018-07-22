import React from 'react';
import cloneDeep from 'lodash/cloneDeep';

const contextValue = {
  user: {
    _data: null,
    getData() {
      return cloneDeep(this._data);
    },
    setData(newData) {
      this._data = newData;
    },
  },
};

const GlobalContext = React.createContext();

export default GlobalContext;
export { contextValue };

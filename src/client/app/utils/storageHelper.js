const itemKey = 'globalData';

const storageHelper = {
  getData() {
    return JSON.parse(window.localStorage.getItem(itemKey));
  },
  setData(data) {
    window.localStorage.setItem(itemKey, JSON.stringify(data));
  },
  removeData() {
    window.localStorage.removeItem(itemKey);
  },
};

export default storageHelper;

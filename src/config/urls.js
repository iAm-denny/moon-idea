const apis = {
  url: process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_API : process.env.REACT_APP_PROD_API,
};

export default apis;

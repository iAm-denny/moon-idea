/* eslint-disable no-unused-vars */
export default () => {
  const request = window.indexedDB.open('shapes', 1);
  request.onerror = (e) => {
    // console.log('The database is opened failed');
  };
  request.onsuccess = (e) => {
    // console.log('Database Opened');
  };

  request.onupgradeneeded = (e) => {
    const db = e.target.result;
    db.createObjectStore('shapes', { keyPath: 'id' });
  };
  return request;
};

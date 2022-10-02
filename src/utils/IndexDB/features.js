/* eslint-disable import/prefer-default-export */
import DB from './database';

const onRequestError = (e) => {
  // eslint-disable-next-line no-console
  console.log('Database Error [TERNAK]', e);
};

export const get = (callback) => {
  const request = DB();

  request.onerror = onRequestError;

  request.onsuccess = (e) => {
    const db = e.target.result;
    const transaction = db.transaction(['shapes'], 'readonly');
    const store = transaction.objectStore('shapes');
    store.getAll().onsuccess = (ev) => {
      callback(ev.target.result);
    };
  };
};

export const add = (data) => {
  const request = DB();

  request.onerror = onRequestError;

  request.onsuccess = (e) => {
    const db = e.target.result;
    const transaction = db.transaction(['shapes'], 'readwrite');
    const store = transaction.objectStore('shapes');
    store.add({ id: data.id, ...data });
  };
};

export const searchbyId = (searchVal, callback) => {
  if (searchVal) {
    const request = DB();

    request.onerror = onRequestError;

    request.onsuccess = async (e) => {
      const db = e.target.result;
      const transaction = db.transaction(['shapes'], 'readonly');

      const store = transaction.objectStore('shapes');
      store.get(searchVal).onsuccess = (ev) => callback(ev.target.result);
      return undefined;
    };
  }
  return undefined;
};

export const dropDB = () => {
  const DBDeleteRequest = window.indexedDB.deleteDatabase('shapes');
  DBDeleteRequest.onerror = (event) => {
    console.error('Error deleting database.', event);
  };

  DBDeleteRequest.onsuccess = (event) => {
    console.log('Database deleted successfully');

    console.log(event.result); // should be undefined
  };
};

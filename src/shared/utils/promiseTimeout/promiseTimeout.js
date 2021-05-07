import TimeoutError from './TimeoutError';

const promiseTimeout = function(promise, timeoutMillis) {
  const error = new TimeoutError();
  let timeout;

  return Promise.race([
    promise,
    new Promise((resolve, reject) => {
      timeout = setTimeout(() => {
        reject(error);
      }, timeoutMillis);
    })
  ]).then(v => {
    clearTimeout(timeout);
    return v;
  }, err => {
    clearTimeout(timeout);
    throw err;
  });
};

export default promiseTimeout;

// Goal of the file : contain a few of fn that is reused again

import { TIME_OUT_DELAY } from './config.js';



const handleTimeout = function (delay) {
  return new Promise(function (_, reject) {
    setTimeout(() => {
      reject(new Error('Took a long time to get data.Please try again'));
    }, delay * 1000);
  });
};



export const AJAXRequest = async function (URL, uploadedData = null) {
  try {
    const fetchRequest = uploadedData
      ? fetch(URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadedData),
        })
      : fetch(URL);

    const response = await Promise.race([
      fetchRequest,
      handleTimeout(TIME_OUT_DELAY),
    ]);
    const data = await response.json();
    if (!response.ok) throw new Error(`${data.message} ${response.status}`);
    return data
  } catch (error) {
    throw error
  }
};

export const getID = _ => window.location.hash.slice(1);



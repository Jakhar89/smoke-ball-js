const { httpGet } = require("./mock-http-interface");

//MOCK call
const callApi = (url) => {
  return httpGet(url);
};

const getArnieQuotes = async (urls) => {
  const apiPromises = [];
  for (url of urls) {
    const api = callApi(url);
    const gen = api.then((val) => generateResObj(val));
    apiPromises.push(gen);
  }
  //Reply Promise to send as response
  let reply = new Promise((res, rej) => res(Promise.all(apiPromises))).catch(
    (err) => console.error(err)
  );
  return reply;
};

//Destruct object
const generateResObj = async (el) => {
  const status = el.status;
  const body = JSON.parse(el.body);
  switch (status) {
    case 200:
      return { "Arnie Quote": body.message };
    case 500:
      return { FAILURE: "Your request has been terminated" };
  }
};

module.exports = {
  getArnieQuotes,
};

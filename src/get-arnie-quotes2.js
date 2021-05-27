const { httpGet } = require("./mock-http-interface");

//MOCK call
const callApi = (url) => {
  return httpGet(url);
};

const getArnieQuotes = async (urls) => {
  const apiPromises = [];
  for (url of urls) {
    const api = callApi(url);
    apiPromises.push(api);
  }
  //Reply Promise to send as response
  const reply = await generateReplyPromise(apiPromises);
  return reply;
};

//Generate Reply promise
const generateReplyPromise = (promises) =>
  new Promise((res, rej) => {
    const arr = Promise.all(promises).then((val) =>
      val.map((el) => {
        return generateResObj(el);
      })
    );
    res(arr);
  }).catch((error)=>console.error(error));

//Destruct object
const generateResObj = (el) => {
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

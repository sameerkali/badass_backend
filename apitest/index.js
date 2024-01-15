const axios = require("axios");

const searchOptions = {
  method: "GET",
  url: "https://jsearch.p.rapidapi.com/search",
  params: {
    query: "Python developer in Texas, USA",
    page: "1",
    num_pages: "1"
  },
  headers: {
    "X-RapidAPI-Key": "abdadc3626msh49731b1f60aa1a7p1bfde0jsn50efd52cef66",
    "X-RapidAPI-Host": "jsearch.p.rapidapi.com"
  }
};

const makeAPICall = async (options) => {
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error; // Rethrow the error for handling at the higher level if needed
  }
};

const api_test = async () => {
  try {
    const searchData = await makeAPICall(searchOptions);
    console.log(searchData);
  } catch (error) {
    console.log(error)
  }
};

api_test();

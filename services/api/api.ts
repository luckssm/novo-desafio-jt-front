import axios from "axios";

const API_BASE_URL = "https://65b98494b71048505a8aea91.mockapi.io/api/v1/";

const API = axios.create({
  baseURL: API_BASE_URL,
});

// const API = async (body) => {
//   try {
//     const result = await axios.post(API_BASE_URL, body);
//     return result;
//   } catch (err) {
//     console.error("error: ", err);
//   }
// };

export default API;

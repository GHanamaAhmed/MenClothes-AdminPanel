import axios from "axios";
const Axios = axios.create({
  baseURL: "https://api.fri7a.com",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
export { Axios };

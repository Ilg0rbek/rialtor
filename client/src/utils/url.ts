import axios from "axios";
export const fetch = axios.create({
  baseURL: "http://localhost:4040/",
});

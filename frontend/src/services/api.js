import axios from "axios";

const API = axios.create({
  baseURL: "https://zoo-management-system-1-0x98.onrender.com",
});

export default API;
import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:5000/api",
  responseType: "json",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

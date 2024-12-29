import axios from "axios";

const axiosIn = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

export default axiosIn;

import axios from "axios";

const api = axios.create({
  //baseURL: "http://18.191.178.251:3000",
  baseURL: "https://api.fmlrifas.com.br",
});

export default api;

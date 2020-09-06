import axios from "axios";

axios.defaults.baseURL = "https://api.hgbrasil.com";

axios.defaults.timeout = 1 * 60 * 60 * 10000;

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  baseURL: axios.defaults.baseURL
};

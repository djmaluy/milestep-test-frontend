import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
const { REACT_APP_LOCAL_URL } = process.env;
// const { REACT_APP_PROD_URL } = process.env;
export default axios.create({
  baseURL: REACT_APP_LOCAL_URL,
});

import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
export default axios.create({
  baseURL: "http://localhost:3000",
});

// "http://localhost:3000"
// https://milestep-test-task-backend.herokuapp.com

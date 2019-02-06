import axios from "axios";
import {API_ROOT} from "./constants";

export default axios.create({
  baseURL: API_ROOT
});
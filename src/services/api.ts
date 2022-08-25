import axios from "axios";
import { host } from "../../host";

const api = axios.create({
  baseURL: `http://${host}:3333`,
});

export { api };

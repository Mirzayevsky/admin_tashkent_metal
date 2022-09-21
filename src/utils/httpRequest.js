import axios from "axios";
import { BASE_URL } from "../constants/link";

const httpRequest = ({ method, data, path, params }) => {
  const token = localStorage.getItem("token");
  return axios({
    method,
    data,
    url: `${BASE_URL}/${path}`,
    params,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export default httpRequest;

import actionTypes from "../../constants/actionTypes";
import httpRequest from "../../utils/httpRequest";

export const getClients = () => ({
  type: actionTypes.GET_CLIENTS,
  payload: httpRequest({
    method: "GET",
    path: "client",
  }),
});

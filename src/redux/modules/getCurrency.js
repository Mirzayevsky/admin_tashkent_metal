import actionTypes from "../../constants/actionTypes";
import httpRequest from "../../utils/httpRequest";

export const getCurrencyAction = () => ({
  type: actionTypes.GET_CURRENCY,
  payload: httpRequest({ method: "GET", path: `currency/USD` }),
});

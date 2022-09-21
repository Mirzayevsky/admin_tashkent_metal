import actionTypes from "../../constants/actionTypes";
import httpRequest from "../../utils/httpRequest";

export const getSuppliersAction = () => ({
  type: actionTypes.GET_SUPPLIERS,
  payload: httpRequest({
    method: "GET",
    path: "supplier",
  }),
});

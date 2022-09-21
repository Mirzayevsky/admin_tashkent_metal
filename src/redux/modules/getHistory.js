import actionTypes from "../../constants/actionTypes";
import httpRequest from "../../utils/httpRequest";

export const getHistoryAction = (page, size, canceled, startDate, endDate) => ({
  type: actionTypes.GET_HISTORY,
  payload: httpRequest({
    method: "GET",
    path: "orders/history",
    params: { page, size, canceled, startDate, endDate },
  }),
});

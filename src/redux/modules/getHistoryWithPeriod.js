import actionTypes from "../../constants/actionTypes";
import httpRequest from "../../utils/httpRequest";

export const getHistoryWithPeriod = (startDate, endDate) => ({
  type: actionTypes.GET_HISTORY_PERIOD,
  payload: httpRequest({
    method: "GET",
    path: "orders/history-for-csv",
    params: {
      canceled: false,
      startDate: `${startDate?.format("yyyy-MM-DD")} 00:00:00`,
      endDate: `${endDate?.format("yyyy-MM-DD")} 23:59:59`,
    },
  }),
});

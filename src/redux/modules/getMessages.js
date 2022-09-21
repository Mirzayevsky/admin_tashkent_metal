import actionTypes from "../../constants/actionTypes";
import httpRequest from "../../utils/httpRequest";

export const getMessages = () => ({
  type: actionTypes.GET_MESSAGES,
  payload: httpRequest({
    method: "GET",
    path: "messages",
  }),
});

import actionTypes from "../../constants/actionTypes";
import httpRequest from "../../utils/httpRequest";

export const getMe = () => ({
  type: actionTypes.GET_ME,
  payload: httpRequest({
    method: "GET",
    path: "system-users/me",
  }),
});

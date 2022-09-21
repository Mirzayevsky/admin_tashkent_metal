import actionTypes from "../../constants/actionTypes";
import httpRequest from "../../utils/httpRequest";

export const getSystemUsersAction = () => ({
  type: actionTypes.GET_SYSTEM_USERS,
  payload: httpRequest({
    method: "GET",
    path: "system-users",
  }),
});

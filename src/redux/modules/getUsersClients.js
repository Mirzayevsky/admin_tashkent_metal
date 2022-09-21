import actionTypes from "../../constants/actionTypes";
import httpRequest from "../../utils/httpRequest";

export const getUsersClients = () => ({
  type: actionTypes.GET_USERS_CLIENTS,
  payload:httpRequest({
      method:"GET",
      path:"dashboard/users-clients"
  })
});

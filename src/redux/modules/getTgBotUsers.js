import actionTypes from "../../constants/actionTypes";
import httpRequest from "../../utils/httpRequest";

export const getTgBotUsersAction = ({ page, size }) => ({
  type: actionTypes.GET_TG_BOT_USERS,
  payload: httpRequest({
    method: "GET",
    path: "tg-bot-users",
    params: {
      page,
      size,
    },
  }),
});

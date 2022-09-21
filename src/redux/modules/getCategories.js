import actionTypes from "../../constants/actionTypes";
import httpRequest from "../../utils/httpRequest";

export const getCategoriesAction = () => ({
  type: actionTypes.GET_CATEGORIES,
  payload: httpRequest({
    method: "GET",
    path: "category",
  }),
});

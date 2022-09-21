import actionTypes from "../../constants/actionTypes";
import httpRequest from "../../utils/httpRequest";

export const getProductsByIdsAction = (ids) => ({
  type: actionTypes.GET_PRODUCTS_BY_IDS,
  payload: httpRequest({
    method: "GET",
    path: "product/ids",
    params: {
      ids: ids.join(","),
    },
  }),
});

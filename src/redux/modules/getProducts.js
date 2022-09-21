import actionTypes from "../../constants/actionTypes";
import httpRequest from "../../utils/httpRequest";

export const getProductsAction = (page, size, category, name) => ({
  type: actionTypes.GET_PRODUCTS,
  payload: httpRequest({
    method: "GET",
    path: "product",
    params: { page, size, category: category.join(","), name },
  }),
});

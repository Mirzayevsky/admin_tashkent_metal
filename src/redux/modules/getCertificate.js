import actionTypes from "../../constants/actionTypes";
import httpRequest from "../../utils/httpRequest";

export const getCertificate = () => ({
  type: actionTypes.GET_CERTIFICATES,
  payload: httpRequest({
    method: "GET",
    path: "certificate",
  }),
});

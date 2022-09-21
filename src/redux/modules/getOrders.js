import actionTypes from "../../constants/actionTypes";
import httpRequest from "../../utils/httpRequest";

export const getOrdersAction=()=>({
    type:actionTypes.GET_ORDERS,
    payload:httpRequest({method:"GET",path:"orders"})
})
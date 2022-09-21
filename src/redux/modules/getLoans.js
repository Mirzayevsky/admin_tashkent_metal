import actionTypes from "../../constants/actionTypes";
import httpRequest from "../../utils/httpRequest";

export const getLoansAction=()=>({
    type:actionTypes.GET_LOANS,
    payload:httpRequest({method:"GET",path:"orders/loans"})
})
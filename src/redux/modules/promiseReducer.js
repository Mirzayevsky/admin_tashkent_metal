import actionTypes from "../../constants/actionTypes";

const defaultState = {
  loading: false,
  success: false,
  error: false,
  data: [],
};

const promiseReducer = (state = defaultState, action, actionType) => {
  switch (action.type) {
    case `${actionType}${actionTypes.PENDING}`:
      return {
        loading: true,
        success: false,
        error: false,
        data: [],
      };
    case `${actionType}${actionTypes.FULFILLED}`:
      return {
        loading: false,
        success: true,
        error: false,
        data: action.payload.data,
      };
    case `${actionType}${actionTypes.REJECTED}`:
      const status = action?.payload?.response?.status;
      if (status === 401 || status === 403) {
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
          localStorage.removeItem("token");
          // localStorage.removeItem("refresh_token");
        }
      }
      return {
        loading: false,
        success: false,
        error: true,
        data: [],
      };
    default:
      return state;
  }
};
export default promiseReducer;

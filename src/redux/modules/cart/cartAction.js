import actionTypes from "../../../constants/actionTypes";

export const addToCart = (product) => ({
  type: actionTypes.ADD_TO_CART,
  payload: product,
});

export const removeFromCart = (productId) => ({
  type: actionTypes.REMOVE_FROM_CART,
  payload: productId,
});

export const cleanCart = () => ({
  type: actionTypes.CLEAN_CART,
});

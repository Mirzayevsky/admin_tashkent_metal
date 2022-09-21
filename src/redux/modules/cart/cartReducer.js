import actionTypes from "../../../constants/actionTypes";

const addToCart = (item) => {
  let cart;
  const { productId, amount } = item;
  try {
    cart = JSON.parse(localStorage.getItem("cart"));
    console.log(cart);
    let isChanged = false;
    cart = cart.map((cartItem) => {
      if (cartItem.productId === productId) {
        cartItem.amount = amount;
        isChanged = true;
        console.log(isChanged);
      }
      return cartItem;
    });

    console.log(isChanged, cart);

    if (!isChanged) {
      cart.push(item);
    }
  } catch (err) {
    cart = [];
    cart.push(item);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  return cart;
};

const removeFromCart = (productId) => {
  let cart;
  try {
    cart = JSON.parse(localStorage.getItem("cart"));
    cart = cart.filter((cartItem) => cartItem.productId !== productId);
  } catch (err) {
    cart = [];
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  return cart;
};

const cleanCart = () => {
  const cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  return cart;
};

const defaultValue = () => {
  console.log("defaultValue");
  let cart;
  try {
    cart = JSON.parse(localStorage.getItem("cart"));
    console.log(cart);
  } catch (err) {
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    cart = JSON.parse(localStorage.getItem("cart"));
  }
  return cart;
};

export const cartReducer = (state = defaultValue(), action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      return addToCart(action.payload);
    case actionTypes.REMOVE_FROM_CART:
      return removeFromCart(action.payload);
    case actionTypes.CLEAN_CART:
      return cleanCart();
    default:
      return state;
  }
};

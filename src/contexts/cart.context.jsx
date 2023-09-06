import { createContext, useReducer } from "react";

const addCartItem = (cartItems, productToAdd) => {
  // find if cartItems contains product
  const isProductExistInCart = cartItems.find(
    (item) => item.id === productToAdd.id
  );
  // If found, increment quantity
  if (isProductExistInCart) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  // return new array with modified cartItems / new cart Item
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  // if product quantity is 1, then remove item from cart
  if (cartItemToRemove.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }
  // return back cart items with reduced quantity
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (cartItems, cartItemToClear) => {
  const isProductExistInCart = cartItems.find(
    (item) => item.id === cartItemToClear.id
  );
  if (isProductExistInCart) {
    return cartItems.filter((item) => item.id !== cartItemToClear.id);
  }
};

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartQuantity: 0,
  cartTotal: 0,
};

const CART_ACTION_TYPES = {
  TOGGLE_IS_CART_OPEN: "TOGGLE_IS_CART_OPEN",
  SET_CART_ITEMS: "SET_CART_ITEMS",
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.TOGGLE_IS_CART_OPEN:
      return { ...state, isCartOpen: !state.isCartOpen };

    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return { ...state, ...payload };

    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartQuantity: 0,
  cartTotal: 0,
});

export const CartProvider = ({ children }) => {
  // const [isCartOpen, setIsCartOpen] = useState(false);
  // const [cartItems, setCartItems] = useState([]);
  // const [cartQuantity, setCartQuantity] = useState(0);
  // const [cartTotal, setCartTotal] = useState(0);
  const [{ isCartOpen, cartItems, cartQuantity, cartTotal }, dispatch] =
    useReducer(cartReducer, INITIAL_STATE);

  const setIsCartOpen = () =>
    dispatch({ type: CART_ACTION_TYPES.TOGGLE_IS_CART_OPEN });

  const updateCartItemsReducer = (newCartItems) => {
    let newCartQuantity = newCartItems.reduce(
      (totalQuantity, cartItem) => totalQuantity + cartItem.quantity,
      0
    );
    let newCartTotal = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );

    dispatch({
      type: CART_ACTION_TYPES.SET_CART_ITEMS,
      payload: {
        cartItems: newCartItems,
        cartQuantity: newCartQuantity,
        cartTotal: newCartTotal,
      },
    });
  };

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems)
  };

  const removeItemFromCart = (cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    updateCartItemsReducer(newCartItems)
  };

  const clearItemFromCart = (cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    updateCartItemsReducer(newCartItems)
  };

  // useEffect(() => {
  //   let calcCartQuantity = cartItems.reduce(
  //     (totalQuantity, cartItem) => totalQuantity + cartItem.quantity,
  //     0
  //   );
  //   setCartQuantity(calcCartQuantity);
  // }, [cartItems]);

  // useEffect(() => {
  //   let calcCartTotal = cartItems.reduce(
  //     (total, cartItem) => total + cartItem.quantity * cartItem.price,
  //     0
  //   );
  //   setCartTotal(calcCartTotal);
  // }, [cartItems]);

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    cartItems,
    cartQuantity,
    cartTotal,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

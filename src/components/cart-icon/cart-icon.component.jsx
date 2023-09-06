import { useSelector, useDispatch } from "react-redux";

import { CartIconContainer, ShoppingIcon, ItemCount } from "./cart-icon.styles";

import { setIsCartOpen } from "../../store/cart/cart.action";
import { selectCartCount, selectIsCartOpen } from "../../store/cart/cart.selector";

const CartIcon = () => {
  const dispatch = useDispatch()
  const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

  const isCartOpen = useSelector(selectIsCartOpen)
  const cartQuantity = useSelector(selectCartCount)

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon />
      <ItemCount>{cartQuantity}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;

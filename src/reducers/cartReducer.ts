import Cookies from "js-cookie";

export const cartInitialState = { cartList: [] };

export type CartItem = {
  id: string | number;
  name: string;
  qty: number;
  price: number;
  imgUrl?: string;
};

export type Cart = { cartList: CartItem[] };

export type cartActionType =
  | { type: "INITIAL_CART" }
  | { type: "CHANGE_CART_AMOUNT"; payload: CartItem }
  | { type: "CLEAR_CART" };

export const cartReducer = (state: Cart, action: cartActionType) => {
  switch (action.type) {
    case "INITIAL_CART":
      return {
        cartList: Cookies.get("cart") ? JSON.parse(Cookies.get("cart")!).cartList : [],
      };

    case "CHANGE_CART_AMOUNT":
      let cartList = state.cartList;
      let cartItem = action.payload;

      let exist = cartList.find((item) => item.id === cartItem.id);

      if (cartItem.qty < 1) {
        const newCartList = { cartList: cartList.filter((item) => item.id !== cartItem.id) };
        Cookies.set("cart", JSON.stringify(newCartList));
        return newCartList;
      }

      if (exist) {
        const newCartList = {
          cartList: cartList.map((item) =>
            item.id === cartItem.id ? { ...item, qty: cartItem.qty } : item
          ),
        };
        Cookies.set("cart", JSON.stringify(newCartList));
        return newCartList;
      }

      const newCartList = { cartList: [...cartList, cartItem] };
      Cookies.set("cart", JSON.stringify(newCartList));
      return newCartList;

    case "CLEAR_CART":
      Cookies.remove("cart");
      return { cartList: [] };

    default: {
      return state;
    }
  }
};

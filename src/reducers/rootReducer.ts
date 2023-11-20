import { Cart, cartActionType, cartInitialState, cartReducer } from "./cartReducer";
import { layoutActionType, layoutInitialState, layoutReducer } from "./layoutReducer";
import combineReducers from "./combineReducers";

export type rootActionType = layoutActionType | cartActionType;

type InitialState = {
  cart: Cart;
  layout: { isHeaderFixed: boolean };
};

export const initialState: InitialState = {
  layout: layoutInitialState,
  cart: cartInitialState,
};

export const rootReducer = combineReducers({
  layout: layoutReducer,
  cart: cartReducer,
});

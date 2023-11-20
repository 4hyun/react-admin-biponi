import { Reducer } from "react";

interface Reducers {
  [key: string]: Reducer<any, any>;
}

const combineReducers = (reducers: Reducers) => {
  return (state: any = {}, action: any) => {
    const newState: any = {};
    for (let key in reducers) {
      newState[key] = reducers[key](state[key], action);
    }
    return newState;
  };
};

export default combineReducers;

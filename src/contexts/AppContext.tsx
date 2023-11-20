import { createContext, FC, PropsWithChildren, useContext, useMemo, useReducer } from "react";
import { initialState, rootActionType, rootReducer } from "reducers/rootReducer";

type ContextProps = {
  state: typeof initialState;
  dispatch: (args: rootActionType) => void;
};

const AppContext = createContext<ContextProps>({
  state: initialState,
  dispatch: () => {},
});

export const AppProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext<ContextProps>(AppContext);

export default AppContext;

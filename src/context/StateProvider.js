import { createContext, useContext, useReducer } from "react";
import reducer, { initialState } from "./reducer";

export const globalState = createContext();

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <globalState.Provider value={[state, dispatch]}>
      {children}
    </globalState.Provider>
  );
};

//custom hooks

// export const useStateValue = () => {
//   const [state, dispatch] = useContext(globalState);
//   return [state, dispatch];
// };

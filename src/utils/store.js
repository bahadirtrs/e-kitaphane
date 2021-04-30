import React, { createContext, useCallback, useContext, useReducer } from "react"
import rootReducer, { rootState } from "../reducers"

const AppContext = createContext()
const asyncDispatch = (dispatch, state) => action =>
  typeof action === "function" ? action(dispatch, state) : dispatch(action)
export const useDispatch = () => {
  const { dispatch } = useContext(AppContext)
  return dispatch
}
export const useSelector = selector => {
  const { state } = useContext(AppContext)
  return selector(state)
}
const Provider = ({ children }) => {
  const [state, dispatchBase] = useReducer(rootReducer, rootState)
  const dispatch = useCallback(asyncDispatch(dispatchBase, state), [])
  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}
export default Provider

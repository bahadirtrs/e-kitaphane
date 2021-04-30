import RequestManager from "../utils/requestManager"
import { endpoints } from "../utils/constants"

export const CATEGORIES_FETCH_START = "CATEGORIES_FETCH_START"
export const CATEGORIES_REFRESHING = "CATEGORIES_REFRESHING"
export const CATEGORIES_FETCH_SUCCESS = "CATEGORIES_FETCH_SUCCESS"
export const CATEGORIES_FETCH_ERROR = "CATEGORIES_FETCH_ERROR"

export const getCategoriesAction = ({ type = "fetch" }) => async dispatch => {
  dispatch({
    type: type === "fetch" ? CATEGORIES_FETCH_START : CATEGORIES_REFRESHING,
  })
  RequestManager({
    method: endpoints.products.method,
    url: endpoints.products.path,
    auth: endpoints.products.auth,
    headers: {
      Accept: "application/json",
    },
  })
    .then(res => {
      console.log(res)
      return dispatch({
        type: CATEGORIES_FETCH_SUCCESS,
        payload: res.data,
      })
    })
    .catch(err => {
      console.log(err)
      return dispatch({
        type: CATEGORIES_FETCH_ERROR,
        error: err,
      })
    })
}

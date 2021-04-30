import RequestManager from "../utils/requestManager"
import { endpoints } from "../utils/constants"

export const PRODUCTS_FETCH_START = "PRODUCTS_FETCH_START"
export const PRODUCTS_REFRESHING = "PRODUCTS_REFRESHING"
export const PRODUCTS_FETCH_SUCCESS = "PRODUCTS_FETCH_SUCCESS"
export const PRODUCTS_FETCH_ERROR = "PRODUCTS_FETCH_ERROR"

export const getProductsAction = ({ type = "fetch", category }) => async dispatch => {
  dispatch({
    type: type === "fetch" ? PRODUCTS_FETCH_START : PRODUCTS_REFRESHING,
  })
  RequestManager({
    method: endpoints.products.method,
    url: category ? endpoints.productsByCategory.path + "/" + category : endpoints.products.path,
    auth: endpoints.products.auth,
    headers: {
      Accept: "application/json",
    },
  })
    .then(res => {
      return dispatch({
        type: PRODUCTS_FETCH_SUCCESS,
        payload: res.data,
      })
    })
    .catch(err => {
      return dispatch({
        type: PRODUCTS_FETCH_ERROR,
        error: err,
      })
    })
}

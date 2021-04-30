import { PRODUCTS_FETCH_ERROR, PRODUCTS_FETCH_START, PRODUCTS_FETCH_SUCCESS } from "../actions/getProductsAction"

export const productsInitialState = {
  fetch: {
    start: false,
    success: false,
    error: false,
  },
}

const productsReducers = (state = { ...productsInitialState }, action) => {
  switch (action.type) {
    case PRODUCTS_FETCH_START: {
      return {
        ...state,
        fetch: {
          start: true,
          success: false,
          error: false,
        },
      }
    }
    case PRODUCTS_FETCH_SUCCESS: {
      return {
        ...state,
        fetch: {
          start: false,
          success: true,
          error: false,
        },
        products: action.payload,
      }
    }

    case PRODUCTS_FETCH_ERROR: {
      return {
        ...state,
        fetch: {
          start: false,
          success: false,
          error: true,
        },
      }
    }
    default: {
      return {
        ...state,
      }
    }
  }
}
export default productsReducers

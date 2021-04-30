import productsReducer, { productsInitialState } from "./productsReducer"

export const rootState = {
  products: productsInitialState,
}

const rootReducer = (state, action) => {
  const { products } = state
  return {
    products: productsReducer(products, action),
  }
}

export default rootReducer

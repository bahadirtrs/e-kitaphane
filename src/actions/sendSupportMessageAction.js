export const USER_LOGGED_IN = "USER_LOGGED_IN"
export const USER_FETCHING = "USER_FETCHING"
export const USER_FETCH_ERROR = "USER_FETCH_ERROR"
export const USER_LOGOUT = "USER_LOGOUT"
export const USER_LOGOUT_ERROR = "USER_LOGOUT_ERROR"

const getDietitians = dispatch => {
  dispatch({
    type: USER_FETCHING,
  })
}
export { getDietitians }

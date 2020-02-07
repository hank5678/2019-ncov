import { SET_LOADING } from "../action/loading"

const DEFAULT_STATE = false

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_LOADING:
      return action.payload
    default:
      return state
  }
}

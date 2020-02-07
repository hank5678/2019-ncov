import { SET_EPIDMIC } from "../action/epidemic"
import { tify } from "chinese-conv"

const DEFAULT_STATE = []

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_EPIDMIC:
      return action.payload.map(el => ({
        key: el.provinceShortName,
        country: tify(el.country),
        provinceName: tify(el.provinceShortName),
        confirmedCount: el.confirmedCount,
        suspectedCount: el.suspectedCount,
        curedCount: el.curedCount,
        deadCount: el.deadCount,
        updateTime: el.updateTime
      }))
    default:
      return state
  }
}

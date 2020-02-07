import { SET_OVERALL } from "../action/overall"
import moment from "moment"

const DEFAULT_STATE = []

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_OVERALL:
      return action.payload
        .filter(el => el.confirmedCount !== 0)
        .sort((a, b) => a.updateTime - b.updateTime)
        .reduce((acc, cur) => {
          if (acc.some(el => moment(el.updateTime).format("YYYYMMDD") === moment(cur.updateTime).format("YYYYMMDD"))) {
            return acc.map(el => {
              if (moment(el.updateTime).format("YYYYMMDD") === moment(cur.updateTime).format("YYYYMMDD")) {
                return cur
              } else {
                return el
              }
            })
          } else {
            return [...acc, cur]
          }
        }, [])
        .map(el => ({
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

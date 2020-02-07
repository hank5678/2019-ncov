import moment from "moment"

// 傳入時間戳, 返回格式化的時間

export default function getFormattedTime(timeStamp) {
  return moment(timeStamp).format("YYYY/MM/DD HH:mm:ss")
}

import axios from "axios"

// https://lab.isaaclin.cn/nCoV/

const axiosInstance = axios.create({
  baseURL: "https://lab.ahusmart.com/nCoV/api/",
  timeout: 0
})

export default axiosInstance

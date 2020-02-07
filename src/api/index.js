import axios from "util/axios"

export const getEpidemicAsync = () =>
  axios({
    method: "get",
    url: "/area",
    params: {
      latest: 1
    }
  })

export const getOverallData = () =>
  axios({
    method: "get",
    url: "/overall",
    params: {
      latest: 0
    }
  })

export const getAreaEpidemicAsync = ({ province }) =>
  axios({
    method: "get",
    url: "/area",
    params: {
      latest: 0,
      province
    }
  })

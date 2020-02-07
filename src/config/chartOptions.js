export default {
  legend: {
    labels: {
      fontColor: "rgba(23, 248, 26, 1)"
    }
  },
  scales: {
    yAxes: [
      {
        scaleLabel: {
          display: true,
          labelString: "人數",
          fontColor: "#17f81a",
          fontFamily: "Noto Sans TC"
        },
        gridLines: {
          color: "#0C5116"
        },
        ticks: {
          fontColor: "rgba(23, 248, 26, 1)"
        }
      }
    ],
    xAxes: [
      {
        scaleLabel: {
          display: true,
          labelString: "日期",
          fontColor: "#17f81a",
          fontFamily: "Noto Sans TC"
        },
        gridLines: {
          color: "#0C5116"
        },
        ticks: {
          fontColor: "rgba(23, 248, 26, 1)"
        }
      }
    ]
  }
}

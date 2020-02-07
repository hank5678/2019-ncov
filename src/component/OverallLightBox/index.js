import React, { memo, useMemo } from "react"
import { Line } from "react-chartjs-2"
import LightBox from "../LightBox/"
import { ChartTitle } from "./styled"
import chartOptions from "config/chartOptions"
import { useSelector } from "react-redux"
import { datasetStyle1, datasetStyle2 } from "config/chartDatasetStyle"
import moment from "moment"

export default memo(function OverallLightBox({ visible, close }) {
  const overall = useSelector(state => state.overall)
  const confirmedOverallChartData = useMemo(() => {
    return {
      labels: overall.map(el => moment(el.updateTime).format("YYYY/MM/DD")),
      datasets: [
        {
          label: "確診人數",
          data: overall.map(el => el.confirmedCount),
          ...datasetStyle1
        },
        {
          label: "疑似人數",
          data: overall.map(el => el.suspectedCount),
          ...datasetStyle2
        }
      ]
    }
  }, [overall])

  const deadOverallChartData = useMemo(() => {
    return {
      labels: overall.map(el => moment(el.updateTime).format("YYYY/MM/DD")),
      datasets: [
        {
          label: "治癒人數",
          data: overall.map(el => el.curedCount),
          ...datasetStyle1
        },
        {
          label: "死亡人數",
          data: overall.map(el => el.deadCount),
          ...datasetStyle2
        }
      ]
    }
  }, [overall])

  return (
    <LightBox visible={visible} close={close}>
      <ChartTitle>疫情確診/疑似累計趨勢圖</ChartTitle>
      <Line data={confirmedOverallChartData} height={200} options={chartOptions} />
      <div style={{ marginBottom: 64 }}></div>
      <ChartTitle>疫情死亡/治癒累計趨勢圖</ChartTitle>
      <Line data={deadOverallChartData} height={200} options={chartOptions} />
    </LightBox>
  )
})

import React, { useMemo, memo } from "react"
import LightBox from "../LightBox"
import { Line } from "react-chartjs-2"
import chartOptions from "config/chartOptions"
import { datasetStyle1, datasetStyle2 } from "config/chartDatasetStyle"
import { ChartTitle, Margin } from "./styled"
import moment from "moment"

export default memo(function AreaStatisticsLightBox({ visible, close, dailyEpidemic, areaName }) {
  const confirmedChartData = useMemo(
    () => ({
      labels: dailyEpidemic.map(el => moment(el.updateTime).format("YYYY/MM/DD")),
      datasets: [
        {
          label: "確診人數",
          data: dailyEpidemic.map(el => el.confirmedCount),
          ...datasetStyle1
        }
      ]
    }),
    [dailyEpidemic]
  )

  const curedDeadChartData = useMemo(
    () => ({
      labels: dailyEpidemic.map(el => moment(el.updateTime).format("YYYY/MM/DD")),
      datasets: [
        {
          label: "治癒人數",
          data: dailyEpidemic.map(el => el.curedCount),
          ...datasetStyle1
        },
        {
          label: "死亡人數",
          data: dailyEpidemic.map(el => el.deadCount),
          ...datasetStyle2
        }
      ]
    }),
    [dailyEpidemic]
  )

  return (
    <LightBox visible={visible} close={close}>
      <ChartTitle>{areaName}疫情確診累計趨勢圖</ChartTitle>
      <Line data={confirmedChartData} height={200} options={chartOptions} />
      <Margin />
      <ChartTitle>{areaName}疫情死亡/治癒累計趨勢圖</ChartTitle>
      <Line data={curedDeadChartData} height={200} options={chartOptions} />
    </LightBox>
  )
})

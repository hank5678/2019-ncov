import React, { memo } from "react"
import LightBox from "../LightBox/"
import { Title, Time, Text, Margin } from "./styled"
import { useSelector } from "react-redux"

export default memo(function LastUpdateLightBox({ visible, close, lastUpdateInfo }) {
  const epidemic = useSelector(state => state.epidemic)

  return (
    <LightBox visible={visible} close={close}>
      <Title>最新疫情統計</Title>
      <Time>({lastUpdateInfo.time})</Time>
      <Text>確診：{lastUpdateInfo.confirmedCount}</Text>
      <Text>疑似：{lastUpdateInfo.suspectedCount}</Text>
      <Text>治癒：{lastUpdateInfo.curedCount}</Text>
      <Text>死亡：{lastUpdateInfo.deadCount}</Text>
      <Margin bottom="32" />
      <Title>各地確診總數</Title>
      <Margin />
      <ul style={{ color: "#17f81a", textAlign: "center" }}>
        {epidemic
          .sort((a, b) => b.confirmedCount - a.confirmedCount)
          .map((el, id) => {
            return (
              <li key={id} style={{ marginBottom: 4 }}>
                {el.country === "中國" && el.provinceShortName !== "台灣" ? "中國 " : ""}
                {el.provinceName} （{el.confirmedCount}）
              </li>
            )
          })}
      </ul>
    </LightBox>
  )
})

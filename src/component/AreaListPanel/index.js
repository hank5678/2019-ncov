import React, { memo } from "react"
import Scrollbar from "react-scrollbars-custom"
import { Container, InfoTitle } from "./styled"
import { useSelector } from "react-redux"

export default memo(function AreaListPanel() {
  const epidemic = useSelector(state => state.epidemic)

  if (epidemic.length > 0) {
    return (
      <Container>
        <Scrollbar style={{ width: "100%", height: "100%" }}>
          <InfoTitle>各地確診統計</InfoTitle>
          <ul>
            {epidemic
              .sort((a, b) => b.confirmedCount - a.confirmedCount)
              .map((el, id) => (
                <li key={id} style={{ marginBottom: 4 }}>
                  {el.country === "中國" && el.provinceShortName !== "台灣" ? "中國 " : ""}
                  {el.provinceName} （{el.confirmedCount}）
                </li>
              ))}
          </ul>
        </Scrollbar>
      </Container>
    )
  } else {
    return null
  }
})

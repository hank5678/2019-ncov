import React, { memo } from "react"
import { Container, Button } from "./styled"

export default memo(function MobilePanel({ showOverall, showLastUpdateLightBox }) {
  return (
    <Container>
      <Button onClick={showLastUpdateLightBox}>最新疫情統計</Button>
      <Button onClick={showOverall}>趨勢圖表</Button>
    </Container>
  )
})

import React, { memo } from "react"
import Scrollbar from "react-scrollbars-custom"
import { useWindowSize } from "react-use"
import { Container, InnerWrapper, CloseBtn } from "./styled"

export default memo(function LightBox({ children, visible, close }) {
  const { width } = useWindowSize()
  return (
    <Container visible={visible}>
      <Scrollbar style={{ width: "100%", height: "100%" }} native={width <= 768}>
        <InnerWrapper>{children}</InnerWrapper>
      </Scrollbar>
      <CloseBtn onClick={close} />
    </Container>
  )
})

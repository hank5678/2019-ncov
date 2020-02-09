import React, { memo } from "react"
import { InfoBox, InfoBoxInner, InfoBoxBg, Title, Text, CloseBtn } from "./styled"
import { useMouse, useWindowSize } from "react-use"

export default memo(function MapInfoBox({ mapContainerRef, focusArea, clearFocusArea }) {
  const { docX, docY } = useMouse(mapContainerRef)
  const { width } = useWindowSize()

  if (focusArea.key) {
    return (
      <>
        {width <= 768 && <InfoBoxBg />}
        <InfoBox x={width > 768 && docX} y={width > 768 && docY}>
          <InfoBoxInner>
            <Title>{focusArea.name}</Title>
            <Text>確診：{focusArea.data.confirmedCount ? focusArea.data.confirmedCount : 0}</Text>
            <Text>治癒：{focusArea.data.curedCount ? focusArea.data.curedCount : 0}</Text>
            <Text>死亡：{focusArea.data.deadCount ? focusArea.data.deadCount : 0}</Text>
            {width <= 768 && <CloseBtn onClick={clearFocusArea} />}
          </InfoBoxInner>
        </InfoBox>
      </>
    )
  } else {
    return null
  }
})

import styled, { keyframes } from "styled-components"

export const Title = styled.p`
  position: fixed;
  top: 20px;
  left: 20px;
  color: #17f81a;
  font-size: 36px;
  font-weight: 900;
  z-index: 10;
  padding: 16px;
  background: #000000;
  @media (max-width: 768px) {
    font-size: 15px;
    padding: 8px;
    top: 8px;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
  }
`

export const InfoBox = styled.div`
  position: fixed;
  top: 104px;
  left: 20px;
  background: #000000;
  box-sizing: border-box;
  padding: 16px;
  border: 1px solid #000000;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.3);
`
export const InfoTitle = styled.p`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 4px;
  color: #17f81a;
`
export const InfoLastUpdateText = styled.p`
  font-size: 10px;
  margin-bottom: 8px;
  color: #17f81a;
`

export const InfoText = styled.p`
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 8px;
  color: #17f81a;
`

export const Button = styled.button`
  display: inline-block;
  outline: 0;
  border: none;
  background: rgba(23, 248, 26, 0.7);
  color: #000000;
  margin: 8px 8px 0 0;
  font-size: 16px;
  font-weight: 700;
  padding: 4px 8px;
  font-family: "Noto Sans TC", sans-serif;
  &:hover {
    background: rgba(23, 248, 26, 1);
  }
`

const move = keyframes`
  from {
    background-position-y: 0px;
  }
  to {
    background-position-y: 4px;
  }
`

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(#000000 50%, transparent 50%);
  background-size: 100% 4px;
  background-repeat: repeat;
  pointer-events: none;
  z-index: 1100;
  opacity: 0.2;
  animation: ${move} 0.5s linear infinite;
`

export const BoxShadow = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 500;
  box-shadow: 0px 0px 60px 30px inset rgba(0, 0, 0, 0.8);
  @media (max-width: 768px) {
    box-shadow: 0px 0px 30px 15px inset rgba(0, 0, 0, 0.8);
  }
`

export const Copyright = styled.div`
  position: fixed;
  bottom: 40px;
  right: 16px;
  color: #17f81a;
  font-size: 14px;
  background: #000000;
  padding: 8px;
  line-height: 1.5em;
  box-sizing: border-box;
  @media (max-width: 768px) {
    bottom: 0;
    right: 0;
    width: 100%;
  }
`

export const MarqueeContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  white-space: nowrap;
  background: #000000;
  color: #17f81a;
  padding: 8px;
  box-sizing: border-box;
  z-index: 600;
  font-size: 14px;
`

export const Link = styled.a`
  color: #17f81a;
  text-decoration: underline;
  outline: none;
`

export const ApiErrorMessage = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1500;
`

export const ApiErrorMessageText = styled.p`
  color: #17f81a;
  font-size: 24px;
`
export const ChartPanel = styled.div`
  position: fixed;
  bottom: 88px;
  right: 250px;
  width: 300px;
  height: auto;
  background: #000000;
  padding: 16px;
  text-align: center;
`

// export const Styled = {
//   Title,
//   InfoBox,
//   InfoTitle,
//   InfoLastUpdateText,
//   InfoText,
//   Button,
//   ChartTitle,
//   Overlay,
//   BoxShadow,
//   Copyright,
//   MarqueeContainer,
//   Link,
//   ApiErrorMessage,
//   ApiErrorMessageText,
//   ChartPanel
// }

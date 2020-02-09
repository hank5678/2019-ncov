import styled, { keyframes } from "styled-components"

const scale = keyframes`
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
`

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

export const InfoBox = styled.div.attrs(props => ({
  style: {
    transform: `translate(${props.x}px, ${props.y}px) translate(-50%, -100%) translateY(-16px)`
  }
}))`
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  transform-origin: 50% 100%;
  z-index: 10;
  will-change: transform;
  @media (max-width: 768px) {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) !important;
    transform-origin: 50% 50%;
    pointer-events: auto;
  }
`

export const InfoBoxInner = styled.div`
  box-sizing: border-box;
  padding: 16px;
  background: #000000;
  border: 1px solid #000000;
  animation: ${scale} 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275) 1;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.3);
`

export const InfoBoxBg = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 5;
  animation: ${fadeIn} 0.25s ease-out 1;
`

export const Title = styled.p`
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 16px;
  text-align: center;
  color: #17f81a;
  @media (max-width: 768px) {
    font-size: 36px;
  }
`

export const Text = styled.p`
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 8px;
  color: #17f81a;
  @media (max-width: 768px) {
    font-size: 20px;
  }
`

export const CloseBtn = styled.div`
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
  width: 32px;
  height: 32px;
  opacity: 0.7;
  cursor: pointer;
  z-index: 1000;
  &:hover {
    opacity: 1;
  }
  &:before,
  &:after {
    position: absolute;
    left: 15px;
    content: " ";
    height: 33px;
    width: 6px;
    background-color: #17f81a;
  }
  &:before {
    transform: rotate(45deg);
  }
  &:after {
    transform: rotate(-45deg);
  }
`

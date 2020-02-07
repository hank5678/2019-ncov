import styled from "styled-components"

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  z-index: 1000;
  padding: 32px;
  box-sizing: border-box;
  overflow: auto;
  opacity: ${props => (props.visible ? 1 : 0)};
  visibility: ${props => (props.visible ? "visible" : "hidden")};
  transition: all 0.25s ease-out;

  @media (max-width: 768px) {
    padding: 48px 8px 8px 8px;
  }
`
export const InnerWrapper = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 0 16px;
`

export const CloseBtn = styled.div`
  position: absolute;
  right: 60px;
  top: 32px;
  width: 32px;
  height: 32px;
  opacity: 0.7;
  cursor: pointer;

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

  @media (max-width: 768px) {
    right: 8px;
    top: 8px;
  }
`

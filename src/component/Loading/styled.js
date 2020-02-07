import styled from "styled-components"

export const Container = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
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
`

export const Text = styled.p`
  color: #17f81a;
`

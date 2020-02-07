import styled from "styled-components"

export const InfoTitle = styled.p`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 16px;
  color: #17f81a;
`
export const Container = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background: #000000;
  width: 185px;
  color: #17f81a;
  padding: 16px;
  height: calc(100vh - 140px);
  overflow: auto;
  @media (max-width: 768px) {
    display: none;
  }
`

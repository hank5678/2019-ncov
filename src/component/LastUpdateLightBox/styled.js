import styled from "styled-components"

export const Title = styled.p`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 4px;
  color: #17f81a;
  text-align: center;
`
export const Time = styled.p`
  font-size: 10px;
  margin-bottom: 8px;
  color: #17f81a;
  text-align: center;
`

export const Text = styled.p`
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 8px;
  color: #17f81a;
  text-align: center;
`
export const Margin = styled.div`
  margin-bottom: ${props => `${props.bottom || 16}px`};
`

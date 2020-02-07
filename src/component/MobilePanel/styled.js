import styled from "styled-components"

export const Container = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: block;
    position: fixed;
    top: 45px;
    left: 50%;
    transform: translateX(-50%);
    width: 300px;
    color: #17f81a;
    text-align: center;
  }
`
export const Button = styled.button`
  display: inline-block;
  outline: 0;
  border: none;
  background: rgba(23, 248, 26, 0.7);
  color: #000000;
  margin: 0 4px;
  font-size: 16px;
  font-weight: 700;
  white-space: nowrap;
  padding: 4px 8px;
  font-family: "Noto Sans TC", sans-serif;
  &:hover {
    background: rgba(23, 248, 26, 1);
  }
`

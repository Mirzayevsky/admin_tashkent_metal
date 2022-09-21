import styled, { keyframes } from "styled-components";

const animation = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const LoadingBoxWrapper = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  div {
    width: 40px;
    height: 40px;
    margin: auto;
    border: 2px solid black;
    border-radius: 50%;
    border-bottom-color: transparent;
    animation-name: ${animation};
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
`;

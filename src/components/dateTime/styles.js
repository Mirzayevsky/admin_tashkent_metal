import styled from "styled-components";

export const DateTimeContainer = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  /* border: 1px solid black; */
  margin-bottom: 10px;

`;

export const PeriodBox = styled.div`
  height: 32px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  /* box-shadow: 0 0 5px lightgray; */
  background-color: white;
  transition-duration: 0.5s;
  margin-right: 10px;
  border:1px solid #d9d9d9;
  svg {
    width: 16px;
    height: 30px;
  }
  &:hover{
    border-radius: 8px;
  }
`;

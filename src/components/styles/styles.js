import styled from "styled-components";

export const Container = styled.div`
  width: ${({ isOpen }) => (isOpen ? "90%" : "90%")};
  /* height: 100%; */
  transition-duration: 0.5s;
  margin: auto;
  padding: 40px 0;
  /* border: 1px solid black; */
  //
  // @media only screen and (max-width: 1350px) {
  //   width: ${({ isOpen }) => (!isOpen ? "950px" : "1050px")};
  //   /* overflow: auto; */
  // }
  //@media only screen and (max-width: 1050px) {
  //  width: 700px;
  //  /* overflow: auto; */
  //}
  @media only screen and (max-width: 850px) {
    width: calc(100% - 20px);
  }

  @media only screen and (max-width: 610px) {
    padding-bottom: 70px;
  }
`;

export const TableWrapper = styled.div`
  width: 100%;
  overflow: auto;
  @media only screen and (max-width: 1050px) {
    width: 100%;
    table {
      width: 1000px;
    }
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  margin-bottom: 20px;
  td,
  th {
    ${({ small }) => small && "padding: 10px !important;"};
  }
`;

export const THead = styled.thead`
  width: 100%;
  tr {
    background-color: ${({ bg }) => bg};
    th {
      color: white;
      padding: 20px 10px;
      &:last-child {
        border-top-right-radius: 10px;
      }
      &:first-child {
        border-top-left-radius: 10px;
      }
    }
  }
`;
export const TBody = styled.tbody`
  width: 100%;
  tr {
    border-left: 1px solid black;
    transition-duration: 0.5s;
    &:hover {
      background-color: lightgrey;
    }
  }
`;


export const TFoot = styled.tfoot`
  width: 100%;
  tr {
    border-right: 1px solid black;
    border-left: 1px solid black;
  }
  font-weight: bold;
`;

export const TRow = styled.tr`
  width: 100%;
  background-color: ${({ chosen, chosenColor }) =>
    chosen && chosenColor ? chosenColor : chosen ? "lightgrey" : "white"};
  position: relative;
  &:hover {
    .cursor-order {
      display: flex;
    }
  }
`;

export const TD = styled.td`
  /* border-top: 1px solid black; */
  ${({ action }) => (action ? `width: ${40 + (action * 2 - 1) * 20}px;` : "")}
  border-bottom: 1px solid black;
  padding: 15px;
  text-align: center;
`;

export const TH = styled.th``;

export const SearchBox = styled.label`
  border-radius: 50px;
  width: 200px;
  height: fit-content;
  display: flex;
  border: 2px solid #373435;
  align-items: center;
  padding: 7px 10px;
  margin-right: 30px;
  cursor: pointer;
  svg {
    width: 14px;
    height: 14px;
  }
  input {
    border: 0;
    padding: 0 7px;
    width: calc(100% - 14px);
    background-color: transparent;
    outline: none;
  }
 
`;

export const ActionWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
 
`;

export const ActionBox = styled.div`
  width: 20px;
  height: 20px;
  cursor: pointer;
  transition-duration: 0.5s;
  svg,
  circle,
  svg path {
    transition-duration: 0.5s;
  }
  &:hover {
    circle,
    svg path {
      stroke: ${({ edit, cart, deleteBtn }) =>
        deleteBtn ? "red" : cart || edit ? "#72a6bf" : ""};
    }
  }
`;

export const DeleteActionBox = styled(ActionBox)`
  &:hover {
    svg path {
      stroke: red;
    }
  }
`;

export const PopUpBackground = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(55, 52, 53, 0.3);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export const PopUpWrapper = styled.div`
  width: ${({ width }) => (width ? width : "500px")};
  height: fit-content;
  max-height: 90vh;
  padding: 50px;
  background: #ffffff;
  box-shadow: 0px 4px 12px rgba(55, 52, 53, 0.3);
  border-radius: 10px;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  overflow-x: hidden;
  overflow-y: auto;
  @media only screen and (max-width: 550px) {
    width: calc(100% - 20px);
  }
`;

export const PopUpTitle = styled.p`
  font-weight: 500;
  font-size: 30px;
  /* margin: 0; */
`;

export const ClosePopUp = styled.div`
  width: 15px;
  height: 15px;
  position: absolute;
  top: 30px;
  right: 30px;
  cursor: pointer;
  @media only screen and (max-width: 610px){
    right: 30px;
    top: 30px;
  }
`;

export const Label = styled.label`
  width: ${({ lWidth }) => (lWidth ? lWidth : "fit-content")};
  ${({ mb }) => (mb ? `margin-bottom: ${mb}` : "")};
  display: block;
  span {
    display: block;
    font-size: 18px;
    margin-bottom: 8px;
  }
`;

export const InputWrapper = styled.div`
  /* width: 100%; */
  width: ${({ w }) => (w ? w : "100%")};
  /* border: 1px solid black; */
  padding: 3px;
  background-color: #72a6bf;
  display: flex;
  align-items: center;
 
  *:disabled{
    color: lightgray;
  }
  input,
  textarea,
  select {
    display: block;
    padding: 6px;
    width: 100%;
    border: 0;
    outline: 0;
    background-color: white;
    border-radius: 5px;
    font-weight: 500;
    font-size: 12px;
    &::placeholder {
      color: rgba(55, 52, 53, 0.3);
    }
  }
 
  .ant-picker {
    width: 100%;
    border: 0;
    border-radius: 5px;
    .ant-picker-input {
      align-items: center;
      * {
        margin: 0;
      }
    }
  }

  .password-box{
    width: 100%;
    display: flex;
    input{
      width: calc(100% - 30px);
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    .eye-toggle{
      width: 30px;
      height: auto;
      background-color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      svg{
        width: 20px;
      }
    }
  }

`;

export const Button = styled.button`
  background-color: #72a6bf;
  color: ${({ edit, cancel }) => (edit ? "white" : cancel ? "black" : "white")};
  padding: 5px 15px;
  font-size: 20px;
  line-height: 26px;
  background-color: ${({ edit, cancel }) =>
    edit ? "#72a6bf" : cancel ? "white" : "white"};
  box-shadow: 0px 2px 4px rgba(55, 52, 53, 0.3);
  border-radius: 5px;
  border: 0;
  transition-duration: 0.5s;
  ${({ mr }) => mr && `margin-right: ${mr};`}
  cursor: pointer !important;
  &:disabled {
    background-color: lightgrey;
  }
  &:hover {
    opacity: 0.8;
    box-shadow: unset;
  }
  @media only screen and (max-width: 610px){
    margin: 20px 10px;
    &:nth-child(1){
      margin-left: 0;
    }
  }
 
`;

export const CancelButton = styled.span`
  color: black;
  padding: 5px 15px;
  font-size: 20px;
  line-height: 26px;
  background-color: white;
  box-shadow: 0px 2px 4px rgba(55, 52, 53, 0.3);
  border-radius: 5px;
  border: 0;
  ${({ mr }) => mr && `margin-right: ${mr};`}
  cursor: pointer;
  transition-duration: 0.5s;
  &:hover {
    opacity: 0.8 !important;
    box-shadow: unset;
  }
`;

export const SidePageBackground = styled(PopUpBackground)`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  ///: ${({ isOpen }) => (isOpen ? "0vw" : "100vw")};
  transition-duration: .7s;
`;

export const SidePageWrapper = styled.div`
  width: ${({ width }) => (width ? width : "500px")};
  height: 100%;
  background-color: white;
  position: fixed;
  top: 0;
  right: ${({ isOpen, width }) => isOpen ? "0px" : `-${width ? width : "500px"}`};
  bottom: 0;
  padding: 60px 20px;
  overflow: auto;
  transition-duration: 0.5s;
  @media only screen and (max-width: 900px) {
    width: ${({ width }) => (width ? "100%" : "500px")};
  }
  @media only screen and (max-width: 610px) {
    width: 100%;
  }
`;

export const SidePageTitle = styled.p`
  font-weight: 500;
  font-size: 20px;
  line-height: 26px;
`;

export const CloseSidePage = styled.div`
  width: 15px;
  height: 15px;
  position: absolute;
  top: 50px;
  right: 50px;
  cursor: pointer;
  z-index: 9;
@media only screen and (max-width: 610px){
  top: 30px;
  right: 30px;
}
`;

export const CancelOrder = styled.div`
  width: 30px;
  height: 30px;
  background-color: white;
  border: 1px solid red;
  position: absolute;
  top: -10px;
  left: -0px;
  padding: 8px;
  border-radius: 50%;
  display: none;
  color: red;
  cursor: pointer;
  svg {
    width: 100%;
    height: 100%;
    margin: auto;
    path {
      stroke: red;
    }
  }
  &:hover {
    background-color: red;
    svg {
      path {
        stroke: white;
      }
    }
  }
`;


export const EditButton = styled.div`
  width: 30px;
  height: 30px;
  background-color: white;
  border: 1px solid #0ca72c;
  position: absolute;
  top: -10px;
  left: 40px;
  padding: 8px;
  border-radius: 50%;
  display: none;
  color:#0ca72c;
  cursor: pointer;

  svg {
    width: 100%;
    height: 100%;
    margin: auto;

    path {
      stroke:#0ca72c;
    }
  }

  &:hover {
    background-color: #0ca72c;

    svg {
      path {
        stroke: white;
      }
    }
  }
`;




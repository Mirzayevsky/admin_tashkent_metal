import styled from "styled-components";
import {ClosePopUp, PopUpBackground, PopUpTitle} from "../../components/styles/styles";
import {ReactComponent as X} from "../../assets/icons/x.svg";

export const LoanPageWrapper = styled.div`
  width: 100%;
`;

 const PopUpWrapper = styled.div`
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
    height: 100%;
    width: 100%;
    max-height: unset;
    padding: 50px 20px;
  }
`;

export const ActionInnerWrapper = styled.div`
 
 @media only screen and (max-width:610px){
   height: 90%;
   width: 100%;
   display: flex;
   align-items: center;
   justify-content: center;
 }
`;
export const ActionInnerWrap = styled.div`
 @media only screen and (max-width:610px){
   height: fit-content;
   width: 100%;
 }
  
`;

const PopUpWrapperSecond = styled.div`
  width: ${({ width }) => (width ? width : "80vw")};
  height: 90vh;
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
  padding: 30px 50px;
  @media only screen and (max-width: 550px) {
    height: 100%;
    width: 100%;
    max-height: unset;
    padding: 50px 20px;
  }
`;
 export const ActionsWrap = styled.div`
   width: fit-content;
   margin: auto;
 `;
export const PopUpContainerSecond = ({ children, close, title, width }) => {
    return (
        <>
            <PopUpBackground onClick={close} />
            <PopUpWrapperSecond width={width}>
                <ClosePopUp onClick={close}>
                    <X />
                </ClosePopUp>
                <PopUpTitle>{title}</PopUpTitle>
                {children}
            </PopUpWrapperSecond>
        </>
    );
};

export const PopUpContainer = ({ children, close, title, width }) => {
    return (
        <>
            <PopUpBackground onClick={close} />
            <PopUpWrapper width={width}>
                <ClosePopUp onClick={close}>
                    <X />
                </ClosePopUp>
                <PopUpTitle>{title}</PopUpTitle>
                {children}
            </PopUpWrapper>
        </>
    );
};




export const ActionWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const ActionBox = styled.div`
  width: 20px;
  height: 20px;
  ${({ active }) => active && `svg path{stroke: #b57068;}`}
  &:hover {
    svg {
      cursor: pointer;
      path {
        ${({ hover }) => hover && "stroke: #b57068;"}
      }
    }
  }
`;
export const SmallFont = styled.span`
  font-size: 14px;
  /* height: 80px; */
  position: relative;
  span {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: fit-content;
    margin: auto;
    margin-bottom: 0;
    p{
      margin: 0;
    }
    &:nth-child(1){
      /* margin-top: 4px; */
    }
    
    svg{
      width: 16px;
      height: 16px;
      margin-right: 5px;
     
    }
    img{
      width: 16px;
      margin-right: 10px;
      margin-top: 4px;

    }
    p{
      &:hover{
        color: #72a6bf;
      }
      
    }
  }
`;
export const CurrenciesList = styled.ul`
  display: flex;
  justify-content: space-between;
  list-style: none;
  margin: 0;
  width: fit-content;
  background-color: #72a6bf;
  padding: 5px;
`;
export const  TitleWrapper = styled.h3`
     padding-bottom: 15px;
     text-align: center;

  @media only screen and (max-width: 610px){
      font-size: 20px;
    }
`;

export const CurrencyItem = styled.li`
  width: 20px;
  height: 20px;
  border: 1px solid black;
  /* padding: 5px 10px; */
  margin-right: 20px;
  margin: 0 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  background-color: ${({ active }) => (active ? "#B57068" : "white")};
  cursor: pointer;
  
  img {
    width: 16px;
  }
  svg {
    width: 16px;
    height: 16px;
  }
`;
export const TRow = styled.tr`
  width: 100%;
  background-color: ${({ chosen, chosenColor }) =>
    chosen && chosenColor ? chosenColor : chosen ? "lightgrey" : "white"};
  position: relative;
  max-height: 100px;
  height: 100px !important;
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
  padding: 5px 15px;
  text-align: center;
  position: relative;
`;

export const PrintInExcelFormButton= styled.div`
  width: fit-content;
  height: fit-content;
  background-color: white;
  border: 1px solid blue;
  position: absolute;
  top: -10px;
  left: 0px;
  padding: 3px 10px;
  border-radius: 100px;
  display: none;
  color: blue;
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
    background-color: blue;
    color: white;
    svg {
      path {
        stroke: white;
      }
    }
  }
`;

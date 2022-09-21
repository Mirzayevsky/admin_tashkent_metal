import styled from "styled-components";
import {ReactComponent as X} from "../../assets/icons/x.svg";
import {ClosePopUp, PopUpBackground,} from "../../components/styles/styles";
import NumberFormat from "react-number-format";

const Button = styled.button`
  background-color: #f20f20;
  color: ${({ edit, cancel }) => (edit ? "white" : cancel ? "black" : "white")};
  padding: 5px 15px;
  font-size: 20px;
  line-height: 26px;
  background-color: ${({ edit, cancel }) =>
    edit ? "#f20f20" : cancel ? "white" : "white"};
  box-shadow: 0px 2px 4px rgba(55, 52, 53, 0.3);
  border-radius: 5px;
  border: 0;
  transition-duration: 0.5s;
  ${({ mr }) => mr && `margin-right: ${mr};`}
  &:disabled {
    background-color: lightgrey;
  }
  cursor: pointer;
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
export const ActionButtonDelete = ({
  loading,
  success,
  error,
  children,
  ...rest
}) => {
  return (
    <Button disabled={loading || success || error} {...rest}>
      {/*{loading*/}
      {/*  ? "загрузка..."*/}
      {/*  : success*/}
      {/*  ? "успех"*/}
      {/*  : error*/}
      {/*  ? "ошибка"*/}
      {/*  :*/}
        {
        children
        }
    </Button>
  );
};

export const ProductPageWrapper = styled.div`
  width: 100%;
`;

export const CategoryFilterWrapper = styled.div`
  width: fit-content;
  display: flex;
  flex-wrap: wrap;
  margin: 0px 0 34px;
`;

export const CategoryFilter = styled.div`
  width: fit-content;
  font-size: 14px;
  padding: 10px 40px;
  box-shadow: 0px 2px 8px rgba(55, 52, 53, 0.12);
  border-radius: 5px;
  margin-right: 12px;
  margin-top: 10px;
  cursor: pointer;
  background-color: ${({ active }) => (active ? "#72A6BF" : "white")};
  color: ${({ active }) => (active ? "white" : "black")};
  transition-duration: 0.5s;
  &:hover {
    box-shadow: unset;
  }
`;

export const SearchBoxAndAddButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  
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
  @media only screen and (max-width: 610px) {
    width: 100%;
    height: 100% ;
    max-height: unset;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
export const ProductWrapper = styled.div`
  height: 100%;
  width: 100%;
  @media only screen and (max-width: 610px){
    height: fit-content;
    width: 100%;
  }
`;

export const PopUpContainer = ({ children, close,  width }) => {
    return (
        <>
            <PopUpBackground onClick={close} />
            <PopUpWrapper width={width}>
                <ClosePopUp onClick={close}>
                    <X />
                </ClosePopUp>
                {children}
            </PopUpWrapper>
        </>
    );
};
export  const InputText =  styled.input`
  width: 100%;
  height: 38px;
  outline: none;
  border: 3px solid rgb(114, 166, 191);
  border-radius: 5px;
  padding: 3px;
  
  @media only screen and (max-width: 610px){
    width:100%;
    height: 38px;
  }
`;

export  const Input =  styled(NumberFormat)`
  width: 100%;
  height: 38px;
  outline: none;
  border: 3px solid rgb(114, 166, 191);
  border-radius: 5px;
  padding: 3px;
  
  @media only screen and (max-width: 610px){
    width:100%;
    height: 38px;
  }
`;

export const  Labels = styled.label`
  position: absolute;
  top: -30px;
  z-index: 22;
  font-size: 16px;
`;

export const InputWrap = styled.div`
  width: 90%;
  height: 38px;
  background-color: rgb(114, 166, 191);
  position: relative;
  display: flex;
  align-items: center;
  margin: 30px auto;
 
  @media only screen and (max-width: 610px){
    height: 38px;
    width: 100%;
    margin: 30px auto;
    margin-top: 50px;
  }

`;


export  const ActionWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

`;
export  const ActionWrapperPopUP = styled.div`
  width: 70%;
  display: flex;
  justify-content: space-between;
  margin: auto;
 @media only screen and (max-width:610px){
  width: fit-content;
   .mr{
     margin-right: 0;
   }
 }
  
  
`;
export const  TitleWrapper = styled.h2`
  text-align: center;
  margin: 20px 0;
  /* display: flex;
  align-items: center; */
  /* width: fit-content; */
  @media only screen and (max-width: 610px){
      font-size: 18px;
    }
  
`;




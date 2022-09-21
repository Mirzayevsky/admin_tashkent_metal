import styled from "styled-components";
import { CloseSidePage, SidePageBackground, SidePageTitle} from "../styles/styles";
import {ReactComponent as X} from "../../assets/icons/x.svg";
import {useSelector} from "react-redux";
import {ReactComponent as SearchIcon} from "../../assets/icons/search-icon.svg";
import {text} from "../../lang/langManager";
import NumberFormat from "react-number-format";



const SidePageWrapper = styled.div`
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
    top: 0!important;
    width: 100%;
    height: 100% !important;
  }
`;

export const  TitleWrapper = styled.h1`
    @media only screen and (max-width: 610px){
      text-align: center;
    }
`;


export const SidePage = ({ isOpen, children, close, title, width }) => {

    return (
        <>
            <SidePageBackground onClick={close} isOpen={isOpen} />
            <SidePageWrapper width={width} isOpen={isOpen}>
                <CloseSidePage onClick={close}>
                    <X />
                </CloseSidePage>
                {children}
            </SidePageWrapper>

        </>
    );
};

const SearchBox = styled.label`
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
  @media only screen and (max-width: 610px){
    width: 80%;
    margin: 13px 10px;
  }
  @media only screen and (max-width: 420px){
    width: 100%;
    margin: 13px 0;
  }
 
`;


export const SearchInput = ({ ...rest }) => {
    const state = useSelector((state) => state);
    const lang = state.lang;
    return (
        <SearchBox>
            <SearchIcon />
            <input
                type="search"
                placeholder={text({ id: "search", lang })}
                {...rest}
            />
        </SearchBox>
    );
};

export const  Labels = styled.label`
  position: absolute;
  top: -35px;
  z-index: 22;
  font-size: 17px;
`;
export  const InputText =  styled.input`
  width: 200px;
  height: 40px;
  outline: none;
  border: 3px solid rgb(114, 166, 191);
  border-radius: 5px;
  padding: 3px;
  
  @media only screen and (max-width: 610px){
    width:100%;
    padding: 5px;
  }
`;


export  const Input =  styled(NumberFormat)`
  width: 200px;
  height: 40px;
  outline: none;
  border: 3px solid rgb(114, 166, 191);
  border-radius: 5px;
  padding: 3px;
  
  @media only screen and (max-width: 610px){
    width:100%;
    padding: 5px;
  }
`;

export const InputWrap = styled.div`
  width: 200px;
  height: 40px;
  background-color: rgb(114, 166, 191);
  position: relative;
  display: flex;
  align-items: center;
  margin-top:32px;
  margin-right: 20px;
  @media only screen and (max-width: 800px){
   margin: 20px 0;
    margin-top: 32px;
  }
  @media only screen and (max-width: 610px){
    width:100%;
    margin: 20px auto;
    margin-top: 30px;
  }

`;


export const DFlex = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-between; */
  margin-bottom: 20px;
  @media only screen and (max-width:500px){
    flex-direction: column;
    label{
      width: 100%;
    }
  }
`;

export const CurrencyBox = styled.div`
  width: 30%;
  @media only screen and (max-width: 610px){
  }
`;

export const SmallFont = styled.span`
  font-size: 14px;
  /* height: 80px; */
  span {
    display: flex;
    width: fit-content;
    /* margin: auto; */
    align-items: center;
    &:nth-child(2){
      /* margin: 8px auto; */
    }
    svg{
      width: 16px;
      height: 16px;
      margin-right: 5px;
    }
    img{
      width: 16px;
      margin-right: 10px;
    }
  }
`;

export const CategoryFilterWrapper = styled.div`
  width: fit-content;
  display: flex;
  margin: 10px 0 34px;
  flex-wrap: wrap;
`;

export const CategoryFilter = styled.div`
  width: fit-content;
  font-size: 14px;
  padding: 6px 20px;
  box-shadow: 0px 2px 8px rgba(55, 52, 53, 0.12);
  border-radius: 5px;
  /* margin-right: 12px; */
  margin: 5px 6px;
  cursor: pointer;
  background-color: ${({ active }) => (active ? "#72A6BF" : "white")};
  color: ${({ active }) => (active ? "white" : "black")};
  transition-duration: 0.5s;
  &:hover{
    box-shadow: unset;
  }
`;

export const AddToCartPopUpBackground = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(55, 52, 53, 0.3);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export const AddToCartPopUpContainer = styled.div`
  background-color: white;
  position: fixed;
  top: 0;
  right: 250px;
  bottom: 0;
  left: auto;
  height: fit-content;
  width: 300px;
  margin: auto;
  padding: 20px;
  transition: all 0.5s;
  @media only screen and (max-width: 610px){
    right: 10%;
    width: 80%;
  }
`;

export const PopUpTitle = styled.p`
  font-size: 20px;
`;

export const HighlightedAmount = styled.div`
  width: fit-content;
  margin: auto;
  padding: 5px;
  /* border: 1px solid black; */
  border-radius: 5px;
  background-color: #72a6bf;
  color: white;
  font-weight: bold;
`;

export const CurrencyTitle = styled.div`
  display: block;
  font-size: 18px;
  margin-bottom: 8px;
`;

export const CurrenciesList = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  align-items: center;
  height: 36px;
  width: fit-content;
  background-color: #72a6bf;
  padding: 5px;
`;

export const CurrencyItem = styled.li`
  width: 25px;
  height: 25px;
  border: 1px solid black;
  /* padding: 5px 10px; */
  margin-right: 20px;
  margin: 0 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${({ active }) => (active ? "#B57068" : "white")};
  svg {
    width: 16px;
    height: 16px;
  }
`;

const Button = styled.button`
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
  cursor: pointer;
  &:hover {
    opacity: 0.8;
    box-shadow: unset;
  }
 
  @media only screen and (max-width: 610px){
    margin:10px;
    &:nth-child(1){
      margin-left: 0;
    }
    &:nth-child(2){
      margin-left: 0;
    }
   
  }
`;

export const ActionButton = ({
                                 loading,
                                 success,
                                 error,
                                 children,
                                 ...rest
                             }) => {
    return (
        <Button disabled={loading || success || error} {...rest}>
            {children}
        </Button>
    );
};


export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 15px;
  @media only screen and (max-width: 610px){
    margin-bottom: 20px;
    .second-btn{
      margin-left: 0;
      margin-bottom: 5px !important;
    }
  }
  
`;

export const SellProductForm = styled.form`
  width: 100%;
  display: block;
  margin-bottom: 20px;
  transition-duration: 0.5s;
  height: ${({isOpen})=>isOpen?"fit-content":"0px"};
  overflow: hidden;
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


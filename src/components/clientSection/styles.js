import styled from "styled-components";
import {useState} from "react";
import { Label} from "../styles/styles";
import {ReactComponent as Eye} from "../../assets/icons/eye.svg";
import {ReactComponent as EyeOff} from "../../assets/icons/eye-off.svg";
import {DatePicker} from "antd";
import NumberFormat from "react-number-format";

export const CertificateSectionWrapper = styled.div`
  width: 100%;
  margin: 30px 0;
`;

export const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

export const FormInputBox = styled.div`
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media only screen and (max-width: 610px){
    width: 100%;
    margin-left: 0;
  }
  
  label span {
    margin: 0;
  }
`;

export const CertificateCardWrapper = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  @media only screen and (max-width:610px){
    flex-direction: column;
  }
`;

export const CertificateCard = styled.div`
  width: 25%;
  height: 290px;
  margin: calc(8% / 8);
  background-color: white;
  padding: 20px;
  box-shadow: 0px 15.6195px 39.0488px rgba(55, 52, 53, 0.12);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  position: relative;
  img{
    height: 60%;
    width: 100%;
    object-fit: contain;
    @media only  screen and (max-width:610px){
      width: 60%;
      margin: 0 auto;
    } 
  }
  p {
    margin: 0;
  }
  @media only screen and (max-width:1050px){
    width:30%;
  }
  @media only screen and (max-width:850px){
    width:48%;
  }
  @media only screen and (max-width:610px){
    height: 280px;
    width: 90%;
    margin: 10px auto;
  }
  @media only screen and (max-width:300px){
    width:100%;
  }
`;
export const ActionWrap = styled.div`
  width: 100%;
  margin-top: 20px;
  @media only screen and (max-width: 610px){
    width: fit-content;
    margin: auto;
  }
`;

export const ActionBox = styled.div`
  width: 110px;
  display: flex;
  justify-content: space-between;
  margin: auto;
  margin-top: 10px;
  /* position: absolute; */
  /* bottom: 10px; */
  /* left: 10%;   */
  @media only screen and (max-width: 610px){
    /* position: absolute;
    bottom: 10px;
    width: 80%; */
    margin: auto;
  }
  a,div {
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
    border-radius: 50%;
    cursor: pointer;
  

    &.edit {
    }
    &.delete {
    }
  }
`;

export const  Textarea = styled.input`
  width: 200px;
  height:55px;
  border: 3px solid #72a6bf;
  display: block;
  outline: none;
  border-radius: 10px;
  @media only screen and (max-width: 610px){
    width: 100%;
  }
  

`;
export const  TextareaWrapper = styled.div`
  width: 200px;
  height: 55px;
  background-color: #72a6bf;
  position: relative;
  @media only screen and (max-width: 610px){
   width: 80%;
    margin: 10px auto;
    margin-top: 20px;
  }
  
`;

export const  Labels = styled.label`
  position: absolute;
  top: -35px;
  z-index: 22;
  font-size: 17px;
`;
export  const Input =  styled.input`
  display: flex;
  align-items: center;
  @media only screen and (max-width: 610px){
    width:100%;
  }
`;

export const InputWrap = styled.div`
  width: 200px;
  padding: 3px;
  background-color: #72a6bf;
  display: flex;
  align-items: center;
  position: relative;
  margin-top: 20px;
  
  @media only screen and (max-width: 610px){
    width: 80%;
    margin: 20px auto;
    margin-top: 50px;
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
`;
export const  TitleWrapper = styled.h1`
    @media only screen and (max-width: 610px){
      text-align: center;
    }
`;

const Button = styled.button`
  background-color: #F20f20;
  color: ${({ edit, cancel }) => (edit ? "white" : cancel ? "black" : "white")};
  padding: 5px 15px;
  font-size: 20px;
  line-height: 26px;
  background-color: ${({ edit, cancel }) =>
    edit ? "#f2020" : cancel ? "white" : "white"};
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
            {loading
                ? "загрузка..."
                : success
                    ? "успех"
                    : error
                        ? "ошибка"
                        : children}
        </Button>
    );
};

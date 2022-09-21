import styled from "styled-components";
import {useState} from "react";
import {ReactComponent as Eye} from "../../assets/icons/eye.svg";
import {ReactComponent as EyeOff} from "../../assets/icons/eye-off.svg";
import {DatePicker} from "antd";
import NumberFormat from "react-number-format";

export const  Labels = styled.label`
  position: absolute;
  top: -30px;
  z-index: 22;
  font-size: 17px;
`;
export const DateInput = ({
                          value,
                          onChange,
                          datePicker,
                          ...rest
                      }) => {
    return (
        <DatePicker style={{ width: "100%",height:"100%",borderRadius:"10px",border:"3px solid rgb(114, 166, 191)" }}
            onChange={onChange} value={value} />
    );
};

export  const Input =  styled.input`
  width: 200px;
  height: 40px;
  outline: none;
  border: 3px solid rgb(114, 166, 191);
  border-radius: 5px;
  padding: 3px;
  
  @media only screen and (max-width: 610px){
    width:100%;
  }
`;
export  const InputContact =  styled(NumberFormat)`
  width: 200px;
  height: 40px;
  outline: none;
  border: 3px solid rgb(114, 166, 191);
  border-radius: 5px;
  padding: 3px;
  
  @media only screen and (max-width: 610px){
    width:100%;
  }
`;

export const InputWrap = styled.div`
  width: 200px;
  height: 40px;
  background-color: rgb(114, 166, 191);
  position: relative;
  display: flex;
  align-items: center;
  margin-top:25px;
  @media only screen and (max-width: 800px){
   margin: 20px 0;
  }
  @media only screen and (max-width: 610px){
    width: 80%;
    margin: 20px auto;
    margin-top: 20px;
  }

`;
export const InputWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 450px;
  justify-content: space-between;
  @media only screen and (max-width: 800px){
    margin-top: 30px;
  }
`;
export  const ActionWrapper = styled.div`
  width: 100%;
  margin-top: 15px;
 @media only screen and (max-width: 610px){
   display: flex;
   justify-content: center;
   margin-top: 0;
 }
`;

export const EditSupplier = styled.a`
  position: absolute;
  bottom: 10px;
  right: 10px;
  display: none;
  cursor: pointer;
  text-decoration: none;
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


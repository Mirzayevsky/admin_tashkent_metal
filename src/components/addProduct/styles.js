import styled from "styled-components";
import { useState } from "react";
import { InputWrapper, Label } from "../styles/styles";
import { ReactComponent as Eye } from "../../assets/icons/eye.svg";
import { ReactComponent as EyeOff } from "../../assets/icons/eye-off.svg";
import { DatePicker } from "antd";
import NumberFormat from "react-number-format";

export const Labels = styled.label`
  position: absolute;
  top: -30px;
  z-index: 22;
  font-size: 16px;
`;
export const ProductWrapper = styled.div`
  @media only screen and (max-width: 610px) {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
export const ProductInner = styled.div`
  @media only screen and (max-width: 610px) {
    height: fit-content;
    width: 85%;
  }
`;
export const FormInner = styled.div``;
export const FirstWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
  &:nth-child(4) {
    margin-bottom: 40px;
  }
`;

const Select = styled.select`
  width: 100%;
  height: 35px;
  outline: none;
  border: 3px solid rgb(114, 166, 191);
  border-radius: 5px;
  padding: 3px;
`;

export const InputSelect = ({ name, selectData, value, onChange, ...rest }) => {
  return (
    <Select name={name} value={value} onChange={onChange}>
      {selectData.map(({ id, name }) => (
        <option value={id} key={id}>
          {name}
        </option>
      ))}
    </Select>
  );
};

export const InputStr = styled.input`
  width: 100%;
  height: 35px;
  outline: none;
  border: 3px solid rgb(114, 166, 191);
  border-radius: 5px;
  padding: 3px;

  @media only screen and (max-width: 610px) {
    width: 100%;
    height: 38px;
  }
`;

export const Input = styled(NumberFormat)`
  width: 100%;
  height: 35px;
  outline: none;
  border: 3px solid rgb(114, 166, 191);
  border-radius: 5px;
  padding: 3px;

  @media only screen and (max-width: 610px) {
    width: 100%;
    height: 38px;
  }
`;

export const InputWrap = styled.div`
  width: 48%;
  height: 35px;
  background-color: rgb(114, 166, 191);
  position: relative;
  display: flex;
  align-items: center;
  margin-top: 30px;

  @media only screen and (max-width: 610px) {
    height: 38px;
  }
`;
export const ActionWrapper = styled.div`
  margin-top: 20px;
`;

export const TitleWrapper = styled.h1`
  @media only screen and (max-width: 610px) {
    text-align: center;
  }
`;

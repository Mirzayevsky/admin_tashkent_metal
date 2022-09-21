import styled from "styled-components";
import bgImg from "../../assets/images/login-bg.png";
import { useState } from "react";
import { Label } from "../../components/styles/styles";
import { ReactComponent as EyeOff } from "../../assets/icons/eye-off.svg";
import { ReactComponent as Eye } from "../../assets/icons/eye.svg";
import { DatePicker } from "antd";
import NumberFormat from "react-number-format";

export const Title = styled.div`
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const LoginPageWrapper = styled.div`
  overflow: auto;
  min-height: 100vh;
`;

export const LoginPageBackground = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: lightgrey;
  background-image: url(${bgImg});
  background-size: cover;
  background-position: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999999;
  &::after {
    content: "";
    background: rgba(55, 52, 53, 0.6);
    width: 100%;
    height: 100%;
    position: absolute;
  }
`;

export const LoginPageContainer = styled.div`
  width: 400px;
  height: 100vh;
  overflow: auto;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  display: flex;
  padding: 20px 0;
  z-index: 9999999;
  .wrapper {
    width: 100%;
    height: fit-content;
    margin: auto;
    overflow: auto;
  }
  .logo {
    width: fit-content;
    height: 70px;
    margin: 0 auto 50px;
    @media only screen and (max-width: 610px) {
      height: 70px;
      width: 180px;
      svg {
        height: 100%;
        width: 100%;
      }
    }
  }
  form {
    width: 100%;
    padding: 30px;
    background-color: white;
    border-radius: 10px;
    label {
      span {
        margin-bottom: 5px;
      }
    }
  }
  @media only screen and (max-width: 420px) {
    width: 100%;
    padding: 10px;
  }
`;

export const ForgotPassword = styled.div`
  text-align: center;
  margin-top: 24px;
  p {
    margin: 0;
    font-size: 16px;
  }
  a {
    font-size: 12px;
  }
`;

export const ButtonWrapper = styled.div`
  @media only screen and (max-width: 610px) {
    button{
      margin: 0;
    }
    /* margin: auto; */
  }
`;

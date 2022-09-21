import React from "react";
import { Button } from "../../components/styles/styles";
import useHttpRequest from "../../hooks/useHttpRequest";
import {
  ForgotPassword,
  LoginPageBackground,
  LoginPageContainer,
  LoginPageWrapper,
  Title, InputSecond, ButtonWrapper
} from "./styles";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Text, { text } from "../../lang/langManager";
import {ReactComponent as Logo} from "../../assets/images/login-logo.svg"
import {Input} from "../../components/styles";

function LoginPage() {
  const navigate = useNavigate();
  const [process, makeRequest] = useHttpRequest({
    onSuccess: (res) => {
      const token = res.data;
      localStorage.setItem("token", token);
      navigate("/");
      // console.log(res.data);
    },
    onError: (e) => {
      console.log(e?.status);
      if (e?.response?.status === 401) {
        toast.error("логин или пароль неверный");
      } else {
        toast.error("что-то пошло не так");
      }
    },
    cleanInterval: 2000,
  });

  const submitLogin = (e) => {
    e.preventDefault();
    const {
      username: { value: username },
      password: { value: password },
    } = e.target;
    makeRequest({
      method: "POST",
      path: "auth/login",
      data: {
        username,
        password,
      },
    });
  };

  const state = useSelector((state) => state);
  const lang = state.lang;

  return (
    <LoginPageWrapper>
      <LoginPageBackground />
      <LoginPageContainer>
        <div className="wrapper">
        <div className="logo">
          <Logo/>
        </div>
        <form autoComplete="off" onSubmit={submitLogin}>
          <Title>
            <Text id="logInToCRM" />
          </Title>
          <Input
            label={text({ id: "login", lang })}
            name={"username"}
            type="text"
            placeholder={text({ id: "login", lang })}
            lWidth="100%"
            mb="12px"
          />
          <Input
            label={text({ id: "password", lang })}
            name="password"
            type="password"
            placeholder={text({ id: "password", lang })}
            lWidth="100%"
            mb="20px"
          />
          <ButtonWrapper>
            <Button style={{ width: "100%" }} edit>
              <Text id="login" />
            </Button>
          </ButtonWrapper>

          <ForgotPassword>
            <p><Text id="forgotPassword"/></p>
            <a href="#"><Text id="techSupport"/></a>
          </ForgotPassword>
        </form>
        </div>
      </LoginPageContainer>
    </LoginPageWrapper>
  );
}

export default LoginPage;

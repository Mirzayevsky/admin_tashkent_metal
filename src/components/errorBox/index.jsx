import React from "react";
import { ErrorBoxWrapper } from "./styles";
import errorImg from "../../assets/images/warning.png";
import Text from "../../lang/langManager";
function ErrorBox() {
  return (
    <ErrorBoxWrapper>
      <img src={errorImg} alt="error" />
      <p>
        <Text id="errorText" />
      </p>
    </ErrorBoxWrapper>
  );
}

export default ErrorBox;

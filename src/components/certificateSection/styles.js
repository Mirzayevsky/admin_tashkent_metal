import styled from "styled-components";
import {Button} from "../styles/styles";

export const CertificateSectionWrapper = styled.div`
  width: 100%;
  margin: 30px 0;
`;

export const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  @media only screen and (max-width: 610px){
  flex-direction: column;
  }
`;

export const FormInputBox = styled.div`
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media only screen and (max-width: 610px){
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
  @media only screen and (max-width: 610px){
    flex-direction: column;
  }
`;

export const CertificateCard = styled.div`
  width: 23%;
  height: 290px;
  margin: calc(8% / 8);
  background-color: white;
  padding: 20px;
  box-shadow: 0px 15.6195px 39.0488px rgba(55, 52, 53, 0.12);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 610px){
    flex-direction: column;
    width: 90% !important;
    margin:15px auto;
  }
  img{
    height: 120px;
    width: 80% !important;
    margin:10px auto!important;
    object-fit: contain;
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
  @media only screen and (max-width:300px){
    width:100%;
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
  margin-left: 20px;
  @media only screen and (max-width: 610px){
    margin-left: 0;
  }
  
`;


export const ActionBox = styled.div`
  width: 110px;
  display: flex;
  justify-content: space-between;
  margin: auto;
  margin-top: 10px;
  a,div {
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
    border-radius: 50%;
    text-decoration: none;
   
    &.edit {
    }
    &.delete {
    }
  }
`;
export const  Labels = styled.label`
  position: absolute;
  top: -30px;
  z-index: 22;
  font-size: 17px;
`;

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

// export const InputWrap = styled.div`
//   width: 200px;
//   height: 40px;
//   background-color: rgb(114, 166, 191);
//   position: relative;
//   display: flex;
//   align-items: center;
//   margin-top:25px;
//   @media only screen and (max-width: 800px){
//    margin: 20px 0;
//   }
//   @media only screen and (max-width: 610px){
//     width: 80%;
//     margin: 10px auto;
//   }
//
// `;

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
    margin-top: 20px;
    &:nth-child(1){
      margin-top: 35px;
    }
    &:nth-child(2){
      margin-bottom: 10px;
    }
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

export  const ActionWrapper = styled.div`
  width: 100%;
  margin-top: 20px;
  @media only screen and (max-width: 610px){
    margin-top: 0;
  }
@media only screen and (max-width: 610px){
  display: flex !important;
  align-items: center;
  justify-content: center !important;
}
  
`;


export const  TitleWrapper = styled.h1`
    @media only screen and (max-width: 610px){
      text-align: center;
    }
`;

const Buttons = styled.button`
  background-color: #72a6bf;
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

export const ActionButtonIn = ({
                               loading,
                               success,
                               error,
                               children,
                               ...rest
                             }) => {
  return (
      <Buttons disabled={loading || success || error} {...rest}>
        {loading
            ? "загрузка..."
            : success
                ? "успех"
                : error
                    ? "ошибка"
                    : children}
      </Buttons>
  );
};


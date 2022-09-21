import styled from "styled-components";
import { PopUpBackground} from "../styles/styles";
import {ReactComponent as X} from "../../assets/icons/x.svg";
const ClosePopUp = styled.div`
  width: 15px;
  height: 15px;
  position: absolute;
  top: 34px;
  right: 38px;
  cursor: pointer;
`;
 const PopUpTitle = styled.p`
  font-weight: 500;
  font-size: 30px;
  /* margin: 0; */
  @media only screen and (max-width: 610px){
    text-align: center;
  } 
`;
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

export const PopUpWrapper = styled.div`
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
    width: 100%;
    height: 100vh;
    max-height: unset;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
export  const ContentWrapper = styled.div`
height: fit-content;
width: fit-content;
  margin: auto;
`;
export const Form = styled.form`
   @media only screen and (max-width: 610px){
     width: 90vw;
     margin: auto;
     .btn-wrapper{
       display: flex;
       justify-content: center;
     }
     .pr{
       position: relative !important;
     }
     .none{
       @media only screen and (max-width: 610px){
         display: none;
       }
     }
    
   }

`;

export const  Labels = styled.label`
  position: absolute;
  top: -30px;
  z-index: 22;
  font-size: 17px;
`;
export const  LabelSecond = styled.label`
  z-index: 22;
  font-size: 17px;
  @media only screen and (max-width: 610px){
    margin-left:35px;
  }
`;

export  const Input =  styled.input`
  width: 100%;
  height: 40px;
  outline: none;
  border: 3px solid rgb(114, 166, 191);
  border-radius: 5px;
  padding: 3px;
  
  @media only screen and (max-width: 610px){
    width:100%;
  }
`;
export  const  TextareaWrapper = styled.div`
@media only screen and (max-width: 610px){
  width: 80%;
  margin: auto;
}
`;

export const InputWrap = styled.div`
  width: 100%;
  height: 40px;
  background-color: rgb(114, 166, 191);
  position: relative;
  display: flex;
  align-items: center;
  margin-top:40px;
  @media only screen and (max-width: 800px){
   margin: 20px 0;
  }
  @media only screen and (max-width: 610px){
    width: 80%;
    margin: 20px auto;
    margin-top: 50px;
  }

`;
export const  TitleWrapper = styled.h2`
  text-align: center;
    @media only screen and (max-width: 610px){
      text-align: center;
      
    }
`;

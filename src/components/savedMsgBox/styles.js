import styled from "styled-components"

export const SavedSmsBox = styled.div`
width: 30%;
/* height: fit-content; */
margin: 10px calc(10% / 6);
background-color: white;
padding: 15px;
border-radius: 15px;
box-shadow: 0px 12px 30px rgba(55, 52, 53, 0.12);
@media only screen and (max-width:850px){
  width: 45%;
}
@media only screen and (max-width:610px){
  width: 100%;
}
`;

export const SmsPoster = styled.div`
width: 100%;
img {
  width: 100%;
  margin-bottom: 10px;
}
`;

export const SmsText = styled.div`
width: 100%;
b,
span {
  display: block;
}

span {
  margin: 15px 0 20px;
}
`;

export const SmsActionBox = styled.div`
width: fit-content;
display: flex;
justify-content: space-between;
margin: auto;
`;

export const ActionCircleButton = styled.div`
width: 40px;
height: 40px;
background-color: ${({ bg }) => bg};
border-radius: 50%;
display: flex;
align-items: center;
justify-content: center;
padding: 10px;
margin: 0 10px;
box-shadow: 0px 2px 4px rgba(55, 52, 53, 0.1);
svg {
  width: 100%;
  height: 100%;
  fill: ${({ color }) => color};
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
  cursor: pointer !important;
  background-color: #f20f20;
  &:hover {
    opacity: 0.8;
    box-shadow: unset;
    background-color: #f20f20;
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
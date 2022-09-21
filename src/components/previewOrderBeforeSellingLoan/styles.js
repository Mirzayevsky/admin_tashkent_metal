import styled from "styled-components";
import NumberFormat from "react-number-format";
export  const PreviewOrderWrap = styled.div`
  @media only screen and (max-width: 610px){
    height: 100%;
    width: 100%;
  }
  
form{
  @media only screen and (max-width: 610px){
    margin-top: 30px;
  }
}
  
`;
export const NumberFor = styled(NumberFormat)`
    border: 0;
  padding: 0;
  outline: none;
  
`;

export const  Labels = styled.label`
  position: absolute;
  top: -38px;
  z-index: 22;
  font-size: 17px;
  @media only screen and (max-width: 610px){
    left: 0px !important;
    &:nth-child(1){
      top: -40px;
    }
  }
 
`;

export  const Textarea =  styled.textarea`
  width: 300px;
  height: 80px;
  outline: none;
  border: 3px solid rgb(114, 166, 191);
  border-radius: 5px;
  padding: 3px;
  @media only screen and (max-width: 610px){
    width:100%;
  }
`;
export const ActionButtonWrapper = styled.div`
@media only screen and (max-width: 610px){
  width: fit-content;
  margin: auto;
}
`;


export const TextareaWrap = styled.div`
  width: 300px;
  height: 80px;
  background-color: rgb(114, 166, 191);
  position: relative;
  display: flex;
  align-items: center;
  margin: 50px 0;
  margin-bottom: 30px;
  @media only screen and (max-width: 800px){
   margin: 20px 0;
  }
  @media only screen and (max-width: 610px){
    width: 100%;
    margin: 20px auto;
    margin-top: 50px;
    .second-label{
     left: 0px !important;
    }
  }

`;
export const  TitleWrapper = styled.div`
    @media only screen and (max-width: 610px){
      text-align: center;
    }
`;

export const InputWrap = styled.div`
  width: fit-content;
  /* height: 32px; */
  /* background-color: rgb(114, 166, 191); */
  position: relative;
  display: flex;
  align-items: center;
  /* margin-top: 30px; */
  /* margin-bottom: 30px; */
  label{
    margin-right: 20px;
  }
  @media only screen and (max-width: 800px){
   margin: 40px 0;
  }
  @media only screen and (max-width: 610px){
    width: 100%;
    margin: 20px auto;
    margin-top: 50px;
    background-color: unset;
    
  }

`;


export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  margin-bottom: 20px;
  @media only screen and (max-width: 610px){
    width: 1000px;
  }

  td,
  th {
    ${({ small }) => small && "padding: 10px !important;"};
  }
`;

export const TableWrap = styled.div`
  overflow-x: auto;
  /* height: 200px;
  margin-bottom: 60px; */
`;
export const UserDataWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  b,
  a {
    display: block;
    margin-right: 10px;
    font-size: 20px;
  }
.none{
  color:red;
}
`;

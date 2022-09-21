import styled from "styled-components";

export const ImageWrapper = styled.div`
  width: 180px;
  height: 160px;
  background-color: #72a6bf;
  display: flex;
  margin-bottom: 15px;
  position: relative;
  @media only screen and (max-width: 610px){
    margin: 20px auto;
  }
`;
export  const Input =  styled.input`
  width: 100%;
  height: 38px;
  outline: none;
  border: 3px solid rgb(114, 166, 191);
  border-radius: 5px;
  padding: 3px;
  
  @media only screen and (max-width: 610px){
    width:100%;
    height: 38px;
  }
`;

export const  Labels = styled.label`
  position: absolute;
  top: -30px;
  z-index: 22;
  font-size: 16px;
`;

export const InputWrap = styled.div`
  width: 48%;
  height: 38px;
  background-color: rgb(114, 166, 191);
  position: relative;
  display: flex;
  align-items: center;
  margin: 30px 0;
 
  @media only screen and (max-width: 610px){
    height: 38px;
    width: 80%;
    margin: 30px auto;
    margin-top: 50px;
  }

`;

export  const ActionWrapper = styled.div`
@media only screen and (max-width: 610px){
  width: fit-content;
  margin: auto;
}
`;

export const AddImageBox = styled.div`
  width: fit-content;
  height: fit-content;
  margin: auto;
  div.image-box {
    width: 80%;
    height: 80%;
    background-color: transparent;
    div.x {
      width: 40px;
      height: 40px;
      position: absolute;
      top: -10px;
      right: -10px;
      border: 2px solid red;
      color: red;
      transition-duration: 0.5s;
      cursor: pointer;
      svg {
        path {
          stroke: red;
          transition-duration: 0.5s;
        }
      }
      &:hover {
        background-color: red;
        svg {
          path {
            stroke: white;
          }
        }
      }
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
  div {
    width: 60px;
    height: 60px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    margin: auto;
    svg {
      width: 20px;
      height: 20px;
      display: block;
    }
  }
  p {
    margin: 5px 0 0;
    color: white;
  }
`;

export const CategoryWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 20px 0;
  @media only screen and (max-width: 610px){
    width: fit-content;
    margin: 20px auto;
  }
`;

export const CategoryBox = styled.div`
width: 49%;
  display: flex;
  align-items: center;
  padding: 5px;
  box-shadow: 0px 2px 4px rgba(55, 52, 53, 0.1);
  margin: 5px 0;
  position: relative;
  img {
    width: 30px;
    height: 30px;
    background-color: white;
    object-fit: contain;
  }
  p {
    margin: 0;
    padding-left: 10px;
  }
  div{
    font-size: 12px;
    line-height: 100%;
    position: absolute;
    top: 3px;
    right: 3px;
    cursor: pointer;
    display: none;
    color: gray;
  }

  &:hover{
    div{
      display: block;
    }
  }

`;

export const  TitleWrapper = styled.h1`
    @media only screen and (max-width: 610px){
      text-align: center;
    }
`;

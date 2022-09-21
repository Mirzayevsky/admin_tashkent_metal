import styled from "styled-components";

export const EmptyBoxWrapper = styled.div`
  width: 100%;
  height: 150px;
  text-align: center;
  margin: 20px auto;
  img {
    height: calc(100% - 50px);
    width: fit-content;
    margin: auto;
    display: flex;
  }
  p {
    margin: 20px 0 0;
    line-height: 100%;
    font-size: 30px;
    color: ${({ dark }) => (dark ? "white" : "black")};
  }
  @media only screen and (max-width:768px){
    p{
      font-size: 20px;
    }
  }
  @media only screen and (max-width:500px){
    p{
      font-size: 15px;
    }
  }
`;

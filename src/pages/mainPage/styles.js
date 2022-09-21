import styled from "styled-components"

export const MainPageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  background-color: #f9f9f9;
  overflow-x: hidden;
`;

export const SidebarWrapper = styled.div`
  width: ${({isOpen}) => isOpen ? "300px" : "100px"};
  height: calc(100vh - 100px);
  background-color: #373435;
  //margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  //align-items: flex-start;
  transition-duration: .5s;
  border-radius: 0 30px 30px 0;
  padding: 33px 15px 0px;
  @media only screen and (min-width: 1260px) {
    width: ${({isOpen}) => isOpen ? "270px" : "100px"};
  }
  @media only screen and (max-width: 1260px) {
    width: 100px;
  }
  @media only screen and (max-width: 610px) {
    width: 0;
    height: 0;
    padding: 0;
  }
`;

export const ContentWrapper = styled.div`
  width: calc(100% - ${({isOpen}) => isOpen ? "300px" : "100px"});
  height: calc(100vh - 100px);
  background-color: #f9f9f9;
  overflow: auto;
  transition-duration: .5s;
  
  @media only screen and (min-width: 1261px) {
    width: calc(100% - ${({isOpen}) => isOpen ? "270px" : "100px"});
  }
  
  @media only screen and (max-width: 1260px) {
    width: calc(100% - 100px);
  }
  @media only screen and (max-width: 610px) {
    width: 100%;
  }
`;
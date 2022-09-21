import styled from "styled-components";

export const NavbarWrapper = styled.div`
  width: 100%;
  height: 100px;
  padding: 30px;
  display: flex;
  justify-content: space-between;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  background-color: white;
  position: relative;
  @media only screen and (max-width: 600px) {
    height: 70px;
    padding: 10px;
  }
`;

export const LogoPart = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const Logo = styled.div`
  height: 40px;
  svg {
    width: fit-content;
    height: 100%;
  }
  @media only screen and (max-width: 600px) {
    height: 25px;
  }
`;

export const LogoText = styled.div`
  height: 30px;
  margin-left: 10px;
  svg{
    width: fit-content;
    height: 100%;
  }
  @media only screen and (max-width: 600px) {
    height: 20px;
  }
`;

export const NavbarActionPart = styled.div`
  display: flex;
  align-items: center;
`;

export const CalendarBox = styled.div`
  margin-right: 20px;
`;

export const SearchBox = styled.label`
  border-radius: 50px;
  width: 200px;
  height: fit-content;
  display: flex;
  border: 2px solid #373435;
  align-items: center;
  padding: 7px 10px;
  margin-right: 30px;
  cursor: pointer;
  svg {
    width: 14px;
    height: 14px;
  }
  input {
    border: 0;
    padding: 0 7px;
    width: calc(100% - 14px);
    background-color: transparent;
    outline: none;
  }
`;

export const RingBox = styled.div`
  margin-right: 20px;
`;

export const AddUserBox = styled.div`
  margin-right: 20px;
`;

export const UserBox = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.15),
    inset 0px 1px 2px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  @media only screen and (max-width: 600px) {
    width: 35px;
    height: 35px;
  }
  img {
    width: 100%;
    height: 100%;
  }
`;

export const LangBox = styled.div`
  width: 100px;
  position: relative;
  display: ${({ mobile }) => (mobile ? "none" : "flex")};
  cursor: pointer;
  border: 2px solid black;
  margin-right: 10px;
  div {
    padding: 5px;
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    color: black;
    transition-duration: 0.5s;
    &.right {
      color: ${({ right }) => (right ? "white" : "black")};
    }
    &.left {
      color: ${({ right }) => (right ? "black" : "white")};
    }
  }
  span {
    display: block;
    width: 50%;
    position: absolute;
    top: 0;
    bottom: 0;
    margin-left: ${({ right }) => (right ? "50%" : "0%")};
    background-color: #72A6BF;
    transition-duration: 0.5s;
  }
  @media only screen and (max-width: 1050px) {
    width: 70px;
    div {
      padding: 3px;
    }
  }
  @media only screen and (max-width: 350px) {
    width: 50px;
    div{
      padding: 0;
    }
    /* display: ${({ mobile }) => (mobile ? "flex" : "none")}; */
  }
`;

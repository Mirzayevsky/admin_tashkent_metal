import styled from "styled-components"
import {Link} from "react-router-dom"

export const SidebarLogo = styled(Link)`
  width: ${({isOpen}) => isOpen ? "300px" : "70px"};
  height: 100px;
  display: flex;
  align-items: center;
  background-color: white;
  padding: ${({isOpen}) => isOpen ? "10px 15px 10px 40px" : "10px 15px 10px 20px"};
  overflow: hidden;
  transition-duration: .5s;
  
  

    // ${({isOpen}) => isOpen ? "margin:10px 15px 10px 40px" : "margin:0 auto"};

  img {
    //width: 100%;
    display: block;
    height: 50px;
  }

  @media only screen and (max-width: 1260px) {
    width: 70px;
    padding: 10px 15px 10px 20px;
    //margin: 0 auto;
  }

`;

export const NavsWrapper = styled.div`
  //margin-top: 20px;
  //width: 250px;
  width: ${({isOpen}) => isOpen ? "270px" : "65px"};
  transition-duration: .5s;

  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  @media only screen and (min-width: 1261px) {
    width: ${({isOpen}) => isOpen ? "230px" : "65px"};
  }
  @media only screen and (max-width: 1260px) {
    width: 90px;
  }
  @media only screen and (max-width: 610px) {
    display: flex;
    justify-content: space-between;
    width: 100%;
    background-color: #373435;

    z-index: 999999;

    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
  }
`

export const NavBox = styled(Link)`
  //width: 250px;
  width: ${({isOpen}) => isOpen ? "270px" : "65px"};
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: ${({isOpen}) => isOpen ? "8px 15px 8px 15px" : "7px 10px 7px 17px"};
  border-radius: 7px;
  transition-duration: .5s;
  background-color: ${({selected}) => selected ? "#72A6BF !important" : "transparent"};
margin-bottom: 10px;
  @media only screen and (min-width: 1261px) {
    width: ${({isOpen}) => isOpen ? "230px" : "65px"};
  }
  div {
      // ${({selected}) => selected ? "color:rgb(90, 33, 128)" : ""};
    color: ${({selected}) => selected ? "#fff" : "#fff"};

    svg {
      path {
        transition-duration: .5s;
          // stroke: ${({selected}) => !selected ? "#afafaf" : "#000"};
          //${({selected}) => selected ? "stroke:#000" : ""};
      }

      .fill {
        fill: ${({selected}) => !selected ? "#fff" : "#fff"};

      }

      .stroke {
        stroke: ${({selected}) => !selected ? "#fff" : "#fff"};
      }

    }
  }

  &:hover {
    transition-duration: .2s;
    background-color: #72A6BF99;

    div {
      color: #fff;

      svg {
        path {
          //stroke: #000;
        }

        .fill {
          fill: #fff;

        }

        .stroke {
          stroke: #fff;
        }
      }
    }
  }

  @media only screen and (max-width: 1260px) {
    padding: 10px 10px 10px 25px;
    width: 90px;
  }

  @media only screen and (max-width: 620px) {
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 0;
  }
`;

export const NavIcon = styled.div`
  width: 27px;
  height: 27px;
  margin-right: 10px; //${({isOpen}) => isOpen ? "10px" : "auto"};
  /* padding: 5px; */
  transition-duration: .5s;
  img{
    width: 100%;
    height: 100%;
  }
  svg {
    width: 100%;
    height: 100%;

    path {
      //fill: #61dafb;
      //stroke: #000;
    }

    .fill {
      fill: #fff;

    }

    .stroke {
      stroke: #fff;
    }
  }

  @media only screen and (max-width: 1260px) {
    margin-right: auto;
  }

  @media only screen and (max-width: 620px) {
    margin: auto;
  }

  //display: flex;
`;

export const NavText = styled.div`
  font-size: 20px;
  color: black;
  width: ${({isOpen}) => isOpen ? "150px" : "0px"};
    // opacity: ${({isOpen}) => !isOpen ? "0" : "1"};
  overflow: hidden;
  transition-duration: .5s;
  @media only screen and (max-width: 1260px) {
    //opacity: 0;
    display: none;
  }
`;

export const CloseSidebar = styled.div`
  width: 100%;
  margin-top: auto;
  margin-bottom: 0;
  height: 75px;
  //background-color: lightgrey;
  /* border-radius: 0 100px 100px 0; */
  @media only screen and (max-width: 1260px) {
    display: none;
  }
`;

export const ArrowIconBox = styled.div`
  /* width: 75px;
  height: 75px;
  margin-left: auto;
  padding: 20px;
  //background-color: #afafaf;
  border-radius: 50px;
  cursor: pointer;
  transition-duration: .5s;
  transform: rotate(${({isOpen}) => !isOpen ? "0" : "180deg"});

  &:hover {
    transform: scale(1.3) rotate(${({isOpen}) => !isOpen ? "0" : "180deg"});
  } */

  width: ${({isOpen}) => isOpen ? "270px" : "65px"};
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: ${({isOpen}) => isOpen ? "8px 15px" : "7px 10px 7px 17px"};
  border-radius: 7px;
  transition-duration: .5s;
  background-color: ${({selected}) => selected ? "#72A6BF !important" : "transparent"};

  cursor: pointer;

  div {
      // ${({selected}) => selected ? "color:rgb(90, 33, 128)" : ""};
    color: ${({selected}) => selected ? "#fff" : "#fff"};

    svg {
      path {
        transition-duration: .5s;
          // stroke: ${({selected}) => !selected ? "#afafaf" : "#000"};
          //${({selected}) => selected ? "stroke:#000" : ""};
      }

      .fill {
        fill: ${({selected}) => !selected ? "#fff" : "#fff"};

      }

      .stroke {
        stroke: ${({selected}) => !selected ? "#fff" : "#fff"};
      }

    }
  }

  /* &:hover {
    transition-duration: .2s;
    background-color: #72A6BF;

    div {
      color: #fff;

      svg {
        path {
          //stroke: #000;
        }

        .fill {
          fill: #fff;

        }

        .stroke {
          stroke: #fff;
        }
      }
    }
  } */

  @media only screen and (max-width: 1260px) {
    padding: 10px 10px 10px 25px;
    width: 90px;
  }

  @media only screen and (max-width: 620px) {
    padding: 10px;
    border-radius: 10px;
  }
`;

export const ArrowIconContainer = styled.div`
  width: 27px;
  height: 27px;
  margin-right: 10px; //${({isOpen}) => isOpen ? "10px" : "auto"};
  /* padding: 5px; */
  transition-duration: .5s;

  svg {
    width: 100%;
    height: 100%;
    transition-duration: .5s;
    transform: rotate(${({isOpen})=>isOpen?"0":"180deg"});


    path {
      //fill: #61dafb;
      //stroke: #000;
    }

    .fill {
      fill: #fff;

    }

    .stroke {
      stroke: #fff;
    }
  }

  @media only screen and (max-width: 1260px) {
    margin-right: auto;
  }

  @media only screen and (max-width: 620px) {
    margin: auto;
  }
`;

export const ArrowIconText = styled.div`
  font-size: 20px;
  color: black;
  width: ${({isOpen}) => isOpen ? "150px" : "0px"};
    // opacity: ${({isOpen}) => !isOpen ? "0" : "1"};
  overflow: hidden;
  transition-duration: .5s;
  @media only screen and (max-width: 1260px) {
    //opacity: 0;
    display: none;
  }
`;
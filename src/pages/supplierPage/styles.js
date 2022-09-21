import styled from "styled-components";
import { BASE_URL } from "../../constants/link";

export const SupplierPageWrapper = styled.div`
  width: 100%;
  margin: 30px 0;
`;

export const ImageWrapper = styled.div`
  width: 180px;
  height: 160px;
  background-color: #72a6bf;
  display: flex;
  position: relative;
  margin-right: 20px;
  @media only screen and (max-width: 610px){
    margin: auto;
  }
`;

export const AddImageBox = styled.div`
  width: 100%;
  height: 100%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  div.image-box {
    width: 80%;
    height: 80%;
    background-color: transparent;
    background-image: url(${({ imageId }) => imageId && `${BASE_URL}/attachment/${imageId}`});
    background-position: center;
    background-size: contain;
    border-radius: 0;
    background-repeat: no-repeat;
    div.x {
      width: 40px;
      height: 40px;
      position: absolute;
      top: -10px;
      right: -10px;
      border: 2px solid red;
      color: red;
      transition-duration: 0.5s;
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
      display: block;
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

export const SupplierCardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const SupplierCard = styled.div`
  width: 30%;
  margin: calc(10% / 6);
  background-color: white;
  padding: 26px 20px;
  box-shadow: 0px 15.6195px 39.0488px rgba(55, 52, 53, 0.12);
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  position: relative;
  background-color: ${({ editing }) => (editing ? "rgba(0,0,0,.07)" : "white")};
  &:hover {
    .edit {
      display: block;
    }
    div.x {
      display: flex;
    }
  }
  div.x {
    width: 40px;
    height: 40px;
    border-radius: 50px;
    display: none;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: -10px;
    right: -10px;
    border: 2px solid red;
    color: red;
    transition-duration: 0.5s;
    background-color: white;
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
  @media only screen and (max-width: 1050px) {
    width: 45%;
  }
  @media only screen and (max-width: 800px) {
    width: 100%;
  }
`;

export const CardImg = styled.div`
  width: 100px;
  height: 100px;
  background-image: url(${({ img }) => img});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
`;

export const TextPart = styled.div`
  width: calc(100% - 110px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  p {
    margin: 0;
  }
`;

export const SupplierForm = styled.form`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 450px;
  justify-content: space-between;
`;

export const EditSupplier = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  display: none;
  cursor: pointer;
`;

export const BarWrapper = styled.div`
  .ant-menu-item-active .ant-menu-item-selected {
    color: #72a6bf !important;
  }
  .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item-selected::after {
    border-bottom-color: #72a6bf !important;
  }

  .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item:hover::after,
  .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu:hover::after,
  .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item-active::after,
  .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu-active::after,
  .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item-open::after,
  .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu-open::after,
  .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item-selected::after,
  .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu-selected::after {
    border-bottom-color: #72a6bf;
  }
  .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item:hover,
  .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu:hover,
  .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item-active,
  .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu-active,
  .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item-open,
  .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu-open,
  .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item-selected,
  .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu-selected {
    color: #72a6bf;
  }
`;

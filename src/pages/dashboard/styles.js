import styled from "styled-components";

export const SalesChartWrapper = styled.div`
  width:45%;
  height: 410px;
  /* border: 1px solid black; */
  padding: 30px 0px;
  border-radius: 10px;
  box-shadow: 6px 12px 24px rgba(55, 52, 53, 0.1);
  margin-bottom: 30px;
  background-color: white;
  .calendar{
    padding-left: 30px;
  }
  p.title {
    padding-left: 30px;
    font-size: 18px;
  }

  @media only screen and (min-width: 1150px) {
    width: 45%;
  }
  @media only screen and (max-width: 1050px) {
    width: 100%;
  }

  @media only screen and (max-width: 500px) {
    .recharts-responsive-container {
      width: 600px !important;
    }
  }
`;

export const SalesWrapper = styled.div`
  width: 100%;
  height: 100%;
 overflow-x: auto;
 ::-webkit-scrollbar{
  width: 0;
 }
 ::-webkit-scrollbar-thumb {
  background-color: transparent;
 }
`;

export const NumberOfUsersAndClients = styled.div`
  width: 45%;
  /* height: auto; */
  box-shadow: 0px 12px 24px rgba(55, 52, 53, 0.1);
  border-radius: 10px;
  position: relative;
  margin-bottom: 30px;
  background-color: white;
  /* .recharts-wrapper{
      width: 100%;
      height: 100%;
  } */
  .title {
    padding: 30px 0 0 30px;
    font-size: 18px;
  }
  @media only screen and (min-width: 1150px) {
    width: 45%;
  }
  @media only screen and (max-width: 1050px) {
    width: 100%;
  }
`;
 export  const  CircleWrapper = styled.div`
 position: absolute;
 left: 10px;
 top: 60px;
 height: fit-content;
 width: fit-content;
  @media only screen and (max-width: 1060px){
   position: unset;
  }
 `;

export const UserClientStatBox = styled.ul`
  height: fit-content;
  margin: auto 0 auto auto;
  position: absolute;
  top: 0;
  right: 50px;
  bottom: 0;
  list-style: none;
  
  li {
    padding: 0;
    position: relative;
    &::after {
      content: "";
      width: 16px;
      height: 16px;
      border-radius: 50%;
      position: absolute;
      left: -20px;
      top: 0px;
      /* bottom: 0px; */
      margin: auto;
    }
    &.clients-stat::after {
      background-color: #72a6bf;
    }
    &.users-stat::after {
      background-color: #b57068;
    }
    b {
      display: block;
      font-size: 12px;
      line-height: 15px;
    }
    span {
      display: block;
      font-size: 12px;
      line-height: 15px;
      color: rgba(55, 52, 53, 0.4);
    }
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  @media only screen and (max-width: 420px) {
    right: 10px;
  }
`;

export const DashboardWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  
`;

export const BestSellersWrapper = styled.div`
  width: 45%;
  padding: 30px;
  box-shadow: 0px 12px 24px rgba(55, 52, 53, 0.1);
  border-radius: 10px;
 padding-bottom: 20px;
 background-color: white;
  @media only screen and (max-width: 1050px) {
    width: 100%;
  }
 @media only screen and (max-width: 500px){
  padding-bottom: 20px;
 }
`;

export const BestSellerTitle = styled.p`
  font-size: 18px;
  line-height: 23px;
  margin-bottom: 10px;
`;

export const Table = styled.div`
  width: 100%;
  /* display: flex; */
  div.row {
    display: flex;
    /* border: 1px solid black; */
    justify-content: space-between;
    padding: 7px 12px;
    box-shadow: 0px 4px 4px rgba(55, 52, 53, 0.1);
    margin-bottom: 5px;
    align-items: center;
    div.prod-img {
      width: 36px;
      height: 36px;
      background-color: black;
      img {
      }
    }
    div.text-part {
      width: calc(100% - 100px);
      padding: 0 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      p {
        font-size: 14px;
        line-height: 14px;
        margin: 0 0 5px;
      }
      .prices {
        display: flex;
        flex-wrap: wrap;
        span {
          font-weight: 300;
          font-size: 10px;
          line-height: 10px;
          border: 1px solid black;
          padding: 0 2px;
        }
      }
    }
    div.length {
      width: 60px;
      text-align: right;
      font-size: 16px;
      line-height: 21px;
    }
  }
`;

export const DownloadStatWrapper = styled.div`
  width: 45%;
  .text-download-stat {
    font-size: 24px;
    line-height: 31px;
  }
  @media only screen and (max-width: 1050px) {
    width: 100%;
    margin-top: 20px;
    .text-download-stat {
      font-size: 22px;
      line-height: 28px;
    }
  }

  @media only screen and (max-width: 850px) {
    width: 100%;
    .text-download-stat {
    font-size: 18px;
    line-height: 25px;
  }
  }
`;

export const DownloadStatButton = styled.button`
  padding: 9px 20px;
  background-color: #1bd718;
  color: white;
  border-radius: 5px;
  border: 0;
  margin: 20px 0 30px;
`;

export const CurrencyWrapper = styled.form`
  margin-top: 20px;
  display: flex;
  div.currency {
    padding: 10px 30px;
    color: white;
    border-radius: 5px;
    color: white;
    background-color: #72a6bf;
    width: fit-content;
  }
  div.currency-input {
    background-color: #72a6bf;
    padding: 5px;
    width: fit-content;
    margin: 0 20px;
    border-radius: 5px;
    input {
      width: 150px;
      height: 100%;
      border-radius: 5px;
      outline: none;
      border: 0;
      padding: 5px 10px;
    }
  }
  button {
    background-color: #1bd718;
    padding: 5px 8px;
    border: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;

    &:disabled {
      background-color: lightgrey;
    }

    img {
      /* width: 100%; */
    }
  }
`;

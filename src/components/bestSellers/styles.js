import styled from "styled-components";

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
      border: 1px solid gray;

      img {
        height: 100%;
        width: 100%;
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
          border: 1px solid rgb(114, 166, 191);
          border-top: 0;
          border-bottom: 0;
          padding: 2px;
          border-right: 0;
          &:nth-child(1){
            border-left: 0;
          }
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
export  const  ShowMore = styled.div`
  color: #fff;
  padding: 2px 40px;
  font-size: 16px;
  background-color: #72a6bf;
  width: fit-content;
  border-radius: 5px;
  margin: auto;
  margin-top: 15px;
  cursor: pointer;

  &:hover {
    background-color: rgba(114, 166, 191, 0.52);
  }
`;
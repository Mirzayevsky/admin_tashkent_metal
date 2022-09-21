import { Empty } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Text from "../../lang/langManager";
import {
  BestSellersWrapper,
  BestSellerTitle,
} from "../../pages/dashboard/styles";
import DateTime from "../dateTime";
import EmptyBox from "../emptyBox";
import ErrorBox from "../errorBox";
import Loading from "../loadingBox";
import { BASE_URL } from "../../constants/link";
import { ShowMore, Table } from "./styles";

function BestSellers({ startDate, setStartDate, endDate, setEndDate }) {
  const state = useSelector((state) => state);
  const history = state.getHistoryWithPeriod;
  const currency = state.currency;
  const [showAmount, setShowAmount] = useState(3);

  const [productAmount, setProductAmount] = useState({});

  useEffect(() => {
    if (history.success) {
      setProductAmount({});
      history?.data.forEach(({ id, paidAmount, paidPrice1,paidPrice2,paidUSD, paymentType, products }) => {
        products.forEach(({ amount, price1, price2, priceInUSD, product }) => {
          // if (paymentType === "CASH") {
          if (paidPrice1 !== null) {
            setProductAmount((prev) => ({
              ...prev,
              [product.id]: {
                length: prev?.[product.id]
                  ? prev?.[product.id]?.length + amount
                  : amount,
                cash: prev?.[product.id]
                  ? prev?.[product.id]?.cash + price1 * amount
                  : price1 * amount,
                transfer: prev?.[product.id] ? prev?.[product.id]?.transfer : 0,
                usd: prev?.[product.id] ? prev?.[product.id]?.usd : 0,
                data: prev?.[product.id] ? prev?.[product.id]?.data : product,
              },
            }));
          } 
          // else if (paymentType === "TRANSFER") {
          if (paidPrice2 !== null) {
            setProductAmount((prev) => ({
              ...prev,
              [product.id]: {
                length: prev?.[product.id]
                  ? prev?.[product.id]?.length + amount
                  : amount,
                cash: prev?.[product.id] ? prev?.[product.id]?.cash : 0,
                transfer: prev?.[product.id]
                  ? prev?.[product.id]?.transfer + price2 * amount
                  : price2 * amount,
                usd: prev?.[product.id] ? prev?.[product.id]?.usd : 0,
                data: prev?.[product.id] ? prev?.[product.id]?.data : product,
              },
            }));
          } 
          // else if (paymentType === "USD") {
          if (paidUSD !== null) {
            setProductAmount((prev) => ({
              ...prev,
              [product.id]: {
                length: prev?.[product.id]
                  ? prev?.[product.id]?.length + amount
                  : amount,
                cash: prev?.[product.id] ? prev?.[product.id]?.cash : 0,
                transfer: prev?.[product.id] ? prev?.[product.id]?.transfer : 0,
                usd: prev?.[product.id]
                  ? prev?.[product.id]?.usd + priceInUSD * amount
                  : priceInUSD * amount,
                data: prev?.[product.id] ? prev?.[product.id]?.data : product,
              },
            }));
          }
        });
      });
    }
  }, [history.success]);

  useEffect(() => {
    console.log(productAmount);
  }, [productAmount]);

  return (
    <BestSellersWrapper>
      <DateTime
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
      <BestSellerTitle>
        <Text id="bestSellersStat" />
      </BestSellerTitle>
      <Table>
        {Object.keys(productAmount)
          .map((id) => productAmount[id])
          .sort((a, b) => {
            if (a.length < b.length) {
              return 1;
            }
            return -1;
          })
          .map((p, index) => {
            const prod = p?.data;
            const id = p?.data?.id;
            if (index < showAmount) {
              return (
                <div className="row" key={id}>
                  <div className="prod-img">
                    <img src={`${BASE_URL}/product/image/${id}`} alt="img" />
                  </div>
                  <div className="text-part">
                    <p>{prod?.name}</p>
                    <div className="prices">
                      <span>
                        {/* {prod?.price1} сум / {p?.cash} сум */}
                        {prod.diameter}|{prod.thickness}|{prod.length}
                      </span>
                      {/*<span>*/}
                      {/*  {prod?.price2} сум / {p?.transfer} сум*/}
                      {/*</span>*/}
                      {/*<span>*/}
                      {/*  ${(prod?.price1 / currency.data.currency).toFixed(2)} /*/}
                      {/*  ${p.usd.toFixed(2)}*/}
                      {/*</span>*/}
                    </div>
                  </div>
                  <div className="length">{p.length}</div>
                </div>
              );
            }
          })}
        {history.success &&
          Object.keys(productAmount).map((id) => productAmount[id]).length ===
            0 && <EmptyBox item={"productItem"} />}
        {history.loading && <Loading />}
        {history.error && <ErrorBox />}
      </Table>

      {Object.keys(productAmount).length > 3 && (
        <ShowMore onClick={() => setShowAmount(showAmount === 3 ? 10 : 3)}>
          {showAmount === 3 ? <Text id={"more"} /> : <Text id={"less"} />}
        </ShowMore>
      )}
    </BestSellersWrapper>
  );
}

export default BestSellers;

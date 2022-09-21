import React, { useEffect, useState } from "react";
import { CurrenciesList, CurrencyItem } from "../../pages/orderPage/styles";
import { thousandSeparator } from "../../utils/numberManager";
import {
  CurrencyBox,
  CurrencyTitle,
  HighlightedAmount,
  SmallFont,
} from "../orderSidePage/styles";
import {
  Table,
  TitleWrapper,
  InputWrap,
  Labels,
  Textarea,
  TextareaWrap,
  ActionButtonWrapper,
  Container,
  NumberFor,
} from "./styles";
import { TBody, TD, TFoot, TH, THead, TRow } from "../styles/styles";
import { PreviewOrderWrap, TableWrap, UserDataWrapper } from "./styles";
import { ReactComponent as DollarCurrencyIcon } from "../../assets/icons/dollar.svg";
import { ReactComponent as TransferIcon } from "../../assets/icons/transfer.svg";
import { ReactComponent as CashMoneyIcon } from "../../assets/icons/money.svg";
import { ActionButton, Input } from "../styles";
import useHttpRequest from "../../hooks/useHttpRequest";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersAction } from "../../redux/modules/getOrders";
import Text, { text } from "../../lang/langManager";
import { toast } from "react-toastify";
import { Checkbox, Switch } from "antd";

function PreviewOrderBeforeSelling({ order, setSellOrderPopUp }) {
  const {
    id,
    fullName,
    phoneNumber,
    products,
    source,
    // paymentType,
    orderProcess,
  } = order;

  const dispatch = useDispatch();

  const [clientPaid, setClientPaid] = useState(0);
  const [loan, setLoan] = useState(false);
  const [loanComment, setLoanComment] = useState("");
  const [loanExpiration, setLoanExpiration] = useState("");

  const [clientPaidPrice1, setClientPaidPrice1] = useState(null);
  const [clientPaidPrice2, setClientPaidPrice2] = useState(null);
  const [clientPaidUSD, setClientPaidUSD] = useState(null);
  const [commentOfOrder, setCommentOfOrder] = useState("");

  useEffect(() => {
    if (order.paymentType === "CASH") {
      setClientPaidPrice1(
        products
          .reduce((total, { price1, amount }) => total + price1 * amount, 0)
          .toFixed(2)
      );
    }
    if (order.paymentType === "TRANSFER") {
      setClientPaidPrice2(
        products
          .reduce((total, { price2, amount }) => total + price2 * amount, 0)
          .toFixed(2)
      );
    }
    if (order.paymentType === "USD") {
      setClientPaidUSD(
        products
          .reduce(
            (total, { priceInUSD, amount }) => total + priceInUSD * amount,
            0
          )
          .toFixed(2)
      );
    }
  }, []);

  // useEffect(() => {
  //   // if (paymentType === "CASH") {
  //   //   setClientPaid(
  //   //     products
  //   //       .reduce((total, { price1, amount }) => total + price1 * amount, 0)
  //   //       .toFixed(2)
  //   //   );
  //   // } else if (paymentType === "TRANSFER") {
  //   //   setClientPaid(
  //   //     products
  //   //       .reduce((total, { price2, amount }) => total + price2 * amount, 0)
  //   //       .toFixed(2)
  //   //   );
  //   // } else if (paymentType === "USD") {
  //   //   setClientPaid(
  //   //     products
  //   //       .reduce(
  //   //         (total, { priceInUSD, amount }) => total + priceInUSD * amount,
  //   //         0
  //   //       )
  //   //       .toFixed(2)
  //   //   );
  //   // }

  //   // if (paymentType === "CASH") {
  //   setClientPaidPrice1(
  //     products
  //       .reduce((total, { price1, amount }) => total + price1 * amount, 0)
  //       .toFixed(2)
  //   );
  //   // } else if (paymentType === "TRANSFER") {
  //   setClientPaidPrice2(
  //     products
  //       .reduce((total, { price2, amount }) => total + price2 * amount, 0)
  //       .toFixed(2)
  //   );
  //   // } else if (paymentType === "USD") {
  //   setClientPaidUSD(
  //     products
  //       .reduce(
  //         (total, { priceInUSD, amount }) => total + priceInUSD * amount,
  //         0
  //       )
  //       .toFixed(2)
  //   );
  //   // }
  // }, []);

  const [sellProductProcess, sellProductRequest] = useHttpRequest({
    onSuccess: () => {
      setTimeout(() => setSellOrderPopUp(false), 2000);
      dispatch(getOrdersAction());
      toast.success(<Text id={"successfullyCompleted"} />);
    },
    cleanTimeout: 2000,
  });

  const sellProduct = (e) => {
    e.preventDefault();
    sellProductRequest({
      method: "PUT",
      path: "orders/sell",
      params: {
        orderId: id,
        // paidAmount: clientPaid,
        paidPrice1: clientPaidPrice1,
        paidPrice2: clientPaidPrice2,
        paidUSD: clientPaidUSD,
        comment: commentOfOrder,
        loan,
        loanComment,
        loanExpiration:
          loanExpiration === "" || loanExpiration === undefined
            ? null
            : loanExpiration,
      },
    });
  };
  const state = useSelector((state) => state);
  const lang = state.lang;

  return (
    <PreviewOrderWrap>
      <UserDataWrapper>
        <div>
          <b>{fullName}</b>
          <a href={`tel:${phoneNumber}`}>
            <NumberFor
              format="+998 (##) ###-##-##"
              mask="_"
              value={phoneNumber}
            />
          </a>
        </div>
      </UserDataWrapper>
      <TableWrap>
        <Table small>
          <THead bg="#B57068">
            <TRow>
              <TH>
                <Text id="name" />
              </TH>
              <TH>
                <SmallFont>
                  <span>
                    <Text id="diameter" /> (мм)
                  </span>
                  <span>
                    <Text id="thickness" /> (мм)
                  </span>
                  <span>
                    <Text id="length" />
                  </span>
                </SmallFont>
              </TH>
              <TH>
                <SmallFont>
                  <span>
                    <Text id="price1Price2" />
                  </span>
                  <span>
                    <Text id="usd" />
                  </span>
                </SmallFont>
              </TH>
              <TH>
                <Text id="mass" /> (кг){" "}
              </TH>
              <TH>
                <Text id="stock" />
              </TH>
              <TH>
                <Text id="amount" />
              </TH>
              {/* <TH></TH> */}
            </TRow>
          </THead>
          <TBody>
            {products?.map((value) => {
              const {
                id,
                name,
                diameter,
                thickness,
                price1,
                price2,
                priceInUSD,
                mass,
                length,
                stock,
                isOnSale,
                supplier,
                category,
                amount,
                product,
              } = value;
              // console.log(value);
              return (
                <TRow key={id}>
                  <TD>
                    <b>{product.name}</b>
                  </TD>
                  <TD>
                    {product.diameter}|{product.thickness}|{product.length}м
                  </TD>
                  <TD>
                    <SmallFont>
                      {/* {paymentType === "CASH" ? (
                        <span>
                          <CashMoneyIcon /> {thousandSeparator(price1)} сум
                        </span>
                      ) : paymentType === "TRANSFER" ? (
                        <span>
                          <TransferIcon /> {thousandSeparator(price2)} сум
                        </span>
                      ) : paymentType === "USD" ? (
                        <span>
                          {" "}
                          <DollarCurrencyIcon /> $
                          {thousandSeparator(priceInUSD.toFixed(2))}
                        </span>
                      ) : ( */}
                      <>
                        <span>
                          <CashMoneyIcon /> {thousandSeparator(price1)} сум
                        </span>
                        <span>
                          {" "}
                          <TransferIcon /> {thousandSeparator(price2)} сум
                        </span>
                        <span>
                          <DollarCurrencyIcon /> $
                          {thousandSeparator(priceInUSD.toFixed(2))}
                        </span>
                      </>
                      {/* )} */}
                    </SmallFont>
                  </TD>
                  <TD>
                    <SmallFont>
                      <span>{product.mass} кг</span>
                      <span>{(1000 / product.mass).toFixed(2)} м</span>
                    </SmallFont>
                  </TD>
                  <TD>{product.stock ? product.stock : 0} м</TD>
                  <TD>
                    <HighlightedAmount
                      onClick={() => {
                        // setAddToCartPopUp({ popUp: true, data: value });
                        // setChosenAmount(amount);
                      }}
                    >
                      {amount} м
                    </HighlightedAmount>
                  </TD>
                  {/* <TD action={1}>
                    <ActionWrapper>
                      <ActionBox
                        onClick={() => {
                          dispatch(removeFromCart());
                        }}
                      >
                        <RemoveFromCartIcon />
                      </ActionBox>
                    </ActionWrapper>
                  </TD> */}
                </TRow>
              );
            })}
          </TBody>
          <TFoot>
            <TRow>
              <TD>{products.length}</TD>
              <TD></TD>
              <TD>
                <SmallFont>
                  {/* {paymentType === "CASH" ? (
                    <span>
                      <CashMoneyIcon />
                      {thousandSeparator(
                        products.reduce(
                          (total, { price1, amount }) =>
                            total + price1 * amount,
                          0
                        )
                      )}{" "}
                      сум
                    </span>
                  ) : paymentType === "TRANSFER" ? (
                    <span>
                      <TransferIcon />
                      {thousandSeparator(
                        products.reduce(
                          (total, { price2, amount }) =>
                            total + price2 * amount,
                          0
                        )
                      )}{" "}
                      сум
                    </span>
                  ) : paymentType === "USD" ? (
                    <span>
                      <DollarCurrencyIcon />$
                      {thousandSeparator(
                        products
                          .reduce(
                            (total, { amount, priceInUSD }) =>
                              total + priceInUSD * amount,
                            0
                          )
                          .toFixed(2)
                      )}
                    </span>
                  ) : ( */}
                  <>
                    <span>
                      {thousandSeparator(
                        products.reduce(
                          (total, { price1, amount }) =>
                            total + price1 * amount,
                          0
                        )
                      )}{" "}
                      сум
                    </span>
                    <span>
                      {thousandSeparator(
                        products.reduce(
                          (total, { price2, amount }) =>
                            total + price2 * amount,
                          0
                        )
                      )}{" "}
                      сум
                    </span>
                    <span>
                      $
                      {thousandSeparator(
                        products
                          .reduce(
                            (total, { priceInUSD, amount }) =>
                              total + priceInUSD * amount,
                            0
                          )
                          .toFixed(2)
                      )}
                    </span>
                  </>
                  {/* )} */}
                </SmallFont>
              </TD>
              <TD>
                <HighlightedAmount>
                  {products
                    .reduce(
                      (total, { product, amount }) =>
                        total + product.mass * amount,
                      0
                    )
                    .toFixed(3)}{" "}
                  кг
                </HighlightedAmount>
              </TD>
              <TD></TD>
              <TD>
                <HighlightedAmount>
                  {products.reduce((total, { amount }) => total + amount, 0)} м
                </HighlightedAmount>
              </TD>
              {/* <TD></TD> */}
            </TRow>
          </TFoot>
        </Table>
      </TableWrap>
      <form onSubmit={sellProduct}>
        <Checkbox
          label="hello"
          title="hello"
          checked={loan}
          onChange={(e) => {
            setLoan(e.target.checked);
            console.log(e.target.checked);
            setClientPaidPrice1(null);
            setClientPaidPrice2(null);
            setClientPaidUSD(null);
            setLoanExpiration("");
            setLoanComment("");
            // if (e) {
            //   setClientPaidUSD(
            //     products
            //       .reduce(
            //         (total, { priceInUSD, amount }) =>
            //           total + priceInUSD * amount,
            //         0
            //       )
            //       .toFixed(2)
            //   );
            // } else {
            //   setClientPaidUSD(null);
            // }
          }}
        >
          <Text id={"loan"} />
        </Checkbox>

        {loan ? (
          <>
            <InputWrap>
              <Input
                type="date"
                mb="15px"
                label={text({ id: "expiration", lang })}
                // placeholder={text({ id: "howMuchYouGet", lang })}
                lWidth="100%"
                value={loanExpiration}
                onChange={(e) => {
                  console.log(e);
                  setLoanExpiration(e.target.value);
                }}
                // onValueChange={(e) => setClientPaid(e.floatValue)}
                // onValueChange={(e) => setClientPaidPrice1(e.floatValue)}
                // thousandSeparator
                // disabled={clientPaidPrice1 === null}
                // suffix={
                //   // paymentType === "CASH" || paymentType === "TRANSFER"
                //   //   ?
                //   " сум"
                //   // : " USD"
                // }
              />
            </InputWrap>
            <TextareaWrap>
              <Labels className={"second-label"}>
                <Text id="LeaveAComment" />
              </Labels>
              <Textarea
                placeholder={text({ id: "LeaveAComment", lang })}
                lWidth={"300px"}
                rows={4}
                mb={"20px"}
                value={loanComment}
                onChange={(e) => setLoanComment(e.target.value)}
              />
            </TextareaWrap>
          </>
        ) : (
          <>
            <InputWrap>
              {/* <Labels><Text id="howMuchYouGet" /></Labels> */}
              <Input
                // w="500px"
                mb={"15px"}
                label={`${text({ id: "howMuchYouGet", lang })}: <b><u>${text({
                  id: "price1",
                  lang,
                })}</u></b>`}
                placeholder={text({ id: "howMuchYouGet", lang })}
                lWidth={"100%"}
                // value={clientPaid}
                value={clientPaidPrice1}
                // onValueChange={(e) => setClientPaid(e.floatValue)}
                onValueChange={(e) => setClientPaidPrice1(e.floatValue)}
                thousandSeparator
                disabled={clientPaidPrice1 === null}
                suffix={
                  // paymentType === "CASH" || paymentType === "TRANSFER"
                  //   ?
                  " сум"
                  // : " USD"
                }
              />
              <Switch
                checked={clientPaidPrice1 === null ? false : true}
                onChange={(e) => {
                  if (e) {
                    setClientPaidPrice1(
                      products
                        .reduce(
                          (total, { price1, amount }) =>
                            total + price1 * amount,
                          0
                        )
                        .toFixed(2)
                    );
                  } else {
                    setClientPaidPrice1(null);
                  }
                }}
              />
            </InputWrap>
            <InputWrap>
              {/* <Labels><Text id="howMuchYouGet" /></Labels> */}
              <Input
                mb={"15px"}
                label={`${text({ id: "howMuchYouGet", lang })}: <b><u>${text({
                  id: "price2",
                  lang,
                })}</u></b>`}
                placeholder={text({ id: "howMuchYouGet", lang })}
                lWidth={"100%"}
                // value={clientPaid}
                value={clientPaidPrice2}
                onValueChange={(e) => setClientPaidPrice2(e.floatValue)}
                thousandSeparator
                disabled={clientPaidPrice2 === null}
                suffix={
                  // paymentType === "CASH" || paymentType === "TRANSFER"
                  //   ?
                  " сум"
                  // : " USD"
                }
              />
              <Switch
                checked={clientPaidPrice2 === null ? false : true}
                onChange={(e) => {
                  if (e) {
                    setClientPaidPrice2(
                      products
                        .reduce(
                          (total, { price2, amount }) =>
                            total + price2 * amount,
                          0
                        )
                        .toFixed(2)
                    );
                  } else {
                    setClientPaidPrice2(null);
                  }
                }}
              />
            </InputWrap>
            <InputWrap>
              {/* <Labels><Text id="howMuchYouGet" /></Labels> */}
              <Input
                mb={"10px"}
                label={`${text({ id: "howMuchYouGet", lang })}: <b><u>${text({
                  id: "usd",
                  lang,
                })}</u></b>`}
                placeholder={text({ id: "howMuchYouGet", lang })}
                lWidth={"100%"}
                // value={clientPaid}
                value={clientPaidUSD}
                disabled={clientPaidUSD === null}
                onValueChange={(e) => setClientPaidUSD(e.floatValue)}
                thousandSeparator
                suffix={
                  // paymentType === "CASH" || paymentType === "TRANSFER"
                  // ? " сум"
                  // :
                  " USD"
                }
              />
              <Switch
                checked={clientPaidUSD === null ? false : true}
                onChange={(e) => {
                  if (e) {
                    setClientPaidUSD(
                      products
                        .reduce(
                          (total, { priceInUSD, amount }) =>
                            total + priceInUSD * amount,
                          0
                        )
                        .toFixed(2)
                    );
                  } else {
                    setClientPaidUSD(null);
                  }
                }}
              />
            </InputWrap>
            <TextareaWrap>
              <Labels className={"second-label"}>
                <Text id="LeaveAComment" />
              </Labels>
              <Textarea
                placeholder={text({ id: "LeaveAComment", lang })}
                lWidth={"300px"}
                rows={4}
                mb={"20px"}
                value={commentOfOrder}
                onChange={(e) => setCommentOfOrder(e.target.value)}
              />
            </TextareaWrap>
          </>
        )}
        <ActionButtonWrapper>
          <ActionButton
            edit
            loading={sellProductProcess.loading}
            success={sellProductProcess.success}
            error={sellProductProcess.error}
            disabled={
              products.length === 0 ||
              (!loan &&
                clientPaidPrice1 === null &&
                clientPaidPrice2 === null &&
                clientPaidUSD === null) ||
              sellProductProcess.loading ||
              sellProductProcess.success ||
              sellProductProcess.error
            }
          >
            <Text id="sell" />
          </ActionButton>
        </ActionButtonWrapper>
      </form>
    </PreviewOrderWrap>
  );
}

export default PreviewOrderBeforeSelling;

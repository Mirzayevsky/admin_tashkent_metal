import { Checkbox, Switch } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Text, { text } from "../../lang/langManager";
import { thousandSeparator } from "../../utils/numberManager";
import { SellProductForm } from "../orderSidePage/styles";
import { InputWrap } from "../previewOrderBeforeSelling/styles";
import { ActionButton, Input, Textarea } from "../styles";

function SellProductFormContainer({
  wantToSell,
  sellProduct,
  currency,
  productsByIdsWithAmount: products,
  usdCurrency,
  process: sellProductProcess,
}) {
  console.log(currency);
  const state = useSelector((state) => state);
  const lang = state.lang;

  const [loan, setLoan] = useState(false);
  const [loanComment, setLoanComment] = useState("");
  const [loanExpiration, setLoanExpiration] = useState("");
  const [clientPaidPrice1, setClientPaidPrice1] = useState(null);
  const [clientPaidPrice2, setClientPaidPrice2] = useState(null);
  const [clientPaidUSD, setClientPaidUSD] = useState(null);

  useEffect(() => {
    clientPaidPrice1 !== null &&
      setClientPaidPrice1(
        products
          .reduce((total, { price1, amount }) => total + price1 * amount, 0)
          .toFixed(2)
      );

    clientPaidPrice2 !== null &&
      setClientPaidPrice2(
        products
          .reduce((total, { price2, amount }) => total + price2 * amount, 0)
          .toFixed(2)
      );

    clientPaidUSD !== null &&
      setClientPaidUSD(
        products
          .reduce(
            (total, { price1, amount }) =>
              total + (price1 / usdCurrency.data.currency) * amount,
            0
          )
          .toFixed(2)
      );
  }, [products]);

  useEffect(() => {
    if (currency === "CASH") {
      setClientPaidPrice1(
        products
          .reduce((total, { price1, amount }) => total + price1 * amount, 0)
          .toFixed(2)
      );
    }
    if (currency === "TRANSFER") {
      setClientPaidPrice2(
        products
          .reduce((total, { price2, amount }) => total + price2 * amount, 0)
          .toFixed(2)
      );
    }
    if (currency === "USD") {
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
  return (
    <SellProductForm
      isOpen={wantToSell}
      onSubmit={(e) =>
        sellProduct(e, {
          clientPaidPrice1,
          clientPaidPrice2,
          clientPaidUSD,
          loan,
          loanComment,
          loanExpiration,
        })
      }
    >
      <Checkbox
        checked={loan}
        onChange={(e) => {
          setLoan(e.target.checked);
          setClientPaidPrice1(null);
          setClientPaidPrice2(null);
          setClientPaidUSD(null);
          setLoanExpiration("");
          setLoanComment("");
        }}
      >
        <Text id="loan" />
      </Checkbox>
      {loan ? (
        <>
          <InputWrap>
            <Input
              mb={"15px"}
              label={text({ id: "expiration", lang })}
              // placeholder={text({ id: "howMuchYouGet", lang })}
              lWidth={"100%"}
              type="date"
              value={loanExpiration}
              onChange={(e) => setLoanExpiration(e.target.value)}
              thousandSeparator
            />
          </InputWrap>
          <Textarea
            placeholder={text({ id: "comment", lang })}
            label={<Text id="comment" />}
            lWidth={"300px"}
            rows={4}
            mb={"20px"}
            name="comment"
            value={loanComment}
            onChange={(e) => setLoanComment(e.target.value)}
          />
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
                        (total, { price1, amount }) => total + price1 * amount,
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
                        (total, { price2, amount }) => total + price2 * amount,
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
                        (total, { price1, amount }) =>
                          total + (price1 / usdCurrency.data.currency) * amount,
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
          <Textarea
            placeholder={text({ id: "comment", lang })}
            label={<Text id="comment" />}
            lWidth={"300px"}
            rows={4}
            mb={"20px"}
            name="comment"
            // value={commentOfOrder}
            // onChange={(e) => setCommentOfOrder(e.target.value)}
          />
        </>
      )}

      <ActionButton
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
        edit
        mb={"20px"}
      >
        <Text id="sell" />
      </ActionButton>
    </SellProductForm>
  );
}

export default SellProductFormContainer;

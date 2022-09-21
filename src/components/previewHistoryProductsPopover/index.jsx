import { Popover } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/modules/cart/cartAction";
import { thousandSeparator } from "../../utils/numberManager";
import { HighlightedAmount, SmallFont } from "../orderSidePage/styles";
import {
  Button,
  Table,
  TBody,
  TD,
  TFoot,
  TH,
  THead,
  TRow,
} from "../styles/styles";
import { ChildrenText, OrderProductWrapper } from "./styles";

function PreviewHistoryProductsPopover({ order, children }) {
  const {
    id,
    fullName,
    phoneNumber,
    products,
    source,
    paymentType,
    orderProcess,
    paidAmount,
  } = order;

  const dispatch = useDispatch();

  const [isProductPopUpVisible, setIsProductPopUpVisible] = useState(false);

  const addProductsToCart = (products) => {
    products.forEach(({ product, amount }) => {
      dispatch(addToCart({ productId: product.id, amount }));
    });
  };

  return (
    <Popover
      visible={isProductPopUpVisible}
      onVisibleChange={(visibility) => setIsProductPopUpVisible(visibility)}
      content={
        <OrderProductWrapper>
          <Table small>
            <THead bg="#B57068">
              <TRow>
                <TH>Наименование</TH>
                <TH>
                  <SmallFont>
                    <span>Диаметр (мм)</span>
                    <span>Толщина (мм)</span>
                    <span>длина</span>
                  </SmallFont>
                </TH>
                <TH>
                  <SmallFont>
                    <span>Цена нал. / безн.</span>
                    <span>USD</span>
                  </SmallFont>
                </TH>
                <TH>Масс (кг) </TH>
                <TH>запас</TH>
                <TH>amount</TH>
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
                        {paymentType === "CASH" ? (
                          <span>{thousandSeparator(price1)} сум</span>
                        ) : paymentType === "TRANSFER" ? (
                          <span>{thousandSeparator(price2)} сум</span>
                        ) : paymentType === "USD" ? (
                          <span>
                            ${thousandSeparator(priceInUSD.toFixed(2))}
                          </span>
                        ) : (
                          <>
                            <span>{thousandSeparator(price1)} сум</span>
                            <span>{thousandSeparator(price2)} сум</span>
                            <span>
                              ${thousandSeparator(priceInUSD.toFixed(2))}
                            </span>
                          </>
                        )}
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
                  {paidAmount}
                  {paymentType === "CASH" || paymentType === "TRANSFER"
                    ? " UZS"
                    : paymentType === "USD"
                    ? " USD"
                    : ""}
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
                    {products.reduce((total, { amount }) => total + amount, 0)}{" "}
                    м
                  </HighlightedAmount>
                </TD>
                {/* <TD></TD> */}
              </TRow>
            </TFoot>
          </Table>
        </OrderProductWrapper>
      }
    >
      <ChildrenText>{children}</ChildrenText>
    </Popover>
  );
}

export default PreviewHistoryProductsPopover;

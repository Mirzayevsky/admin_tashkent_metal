import { Popover } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Text from "../../lang/langManager";
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

function PreviewOrderProductsPopover({ order, setEditOrder,loan, children }) {
  const {
    id,
    fullName,
    phoneNumber,
    products,
    source,
    paymentType,
    orderProcess,
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
                      <Text id="length" /> (м)
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
                  <Text id="mass" /> (кг)
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
                return (
                  <TRow key={id}>
                    <TD>
                      <b>{product.name}</b>
                    </TD>
                    <TD>
                      {product.diameter}|{product.thickness}|{product.length}
                    </TD>
                    <TD>
                      <SmallFont>
                        {/* {paymentType === "CASH" ? (
                          <span>{thousandSeparator(price1)} сум</span>
                        ) : paymentType === "TRANSFER" ? (
                          <span>{thousandSeparator(price2)} сум</span>
                        ) : paymentType === "USD" ? (
                          <span>
                            ${thousandSeparator(priceInUSD.toFixed(2))}
                          </span>
                        ) : ( */}
                          <>
                            <span>{thousandSeparator(price1)} сум</span>
                            <span>{thousandSeparator(price2)} сум</span>
                            <span>
                              ${thousandSeparator(priceInUSD.toFixed(2))}
                            </span>
                          </>
                        {/* )} */}
                      </SmallFont>
                    </TD>
                    <TD>
                      <SmallFont>
                        <span>{product.mass} кг</span>
                        {/* <span>{(1000 / product.mass).toFixed(2)} м</span> */}
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
                  {/* {paymentType === "CASH" ? (
                    <>
                      {thousandSeparator(
                        products.reduce(
                          (total, { price1, amount }) =>
                            total + price1 * amount,
                          0
                        )
                      )}{" "}
                      сум
                    </>
                  ) : paymentType === "TRANSFER" ? (
                    <>
                      {thousandSeparator(
                        products.reduce(
                          (total, { price2, amount }) =>
                            total + price2 * amount,
                          0
                        )
                      )}{" "}
                      сум
                    </>
                  ) : paymentType === "USD" ? (
                    <>
                      $
                      {thousandSeparator(
                        products
                          .reduce(
                            (total, { amount, priceInUSD }) =>
                              total + priceInUSD * amount,
                            0
                          )
                          .toFixed(2)
                      )}
                    </>
                  ) : ( */}
                    <SmallFont>
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
                    </SmallFont>
                  {/* )} */}
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
          {!loan &&
          <Button
            edit
            onClick={() => {
              setEditOrder({ edit: true, data: order });
              addProductsToCart(products);
              setIsProductPopUpVisible(false);
            }}
          >
            <Text id="edit" />
          </Button>
      }
        </OrderProductWrapper>
      }
    >
      <ChildrenText>{children}</ChildrenText>
    </Popover>
  );
}

export default PreviewOrderProductsPopover;

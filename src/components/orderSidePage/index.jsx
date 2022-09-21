import { Empty, Pagination, Popover, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useHttpRequest from "../../hooks/useHttpRequest";
import { getCategoriesAction } from "../../redux/modules/getCategories";
import { getProductsAction } from "../../redux/modules/getProducts";
import { Textarea } from "../styles";
import {
  ActionBox,
  ActionWrapper,
  Button,
  DeleteActionBox,
  InputWrapper,
  Table,
  TableWrapper,
  TBody,
  TD,
  TFoot,
  TH,
  THead,
  TRow,
} from "../styles/styles";
import {
  AddToCartPopUpBackground,
  AddToCartPopUpContainer,
  ButtonWrapper,
  CategoryFilter,
  CategoryFilterWrapper,
  ChangeAmountButton,
  CurrenciesList,
  CurrencyBox,
  CurrencyItem,
  CurrencyTitle,
  DFlex,
  HighlightedAmount,
  PopUpTitle,
  SellProductForm,
  SmallFont,
  SidePage,
  TitleWrapper,
  InputWrap,
  Input,
  Labels,
  SearchInput,
  ActionButton,
  InputText,
} from "./styles";

import { ReactComponent as CartIcon } from "../../assets/icons/shopping-cart.svg";
import { ReactComponent as RemoveFromCartIcon } from "../../assets/icons/udalit.svg";
import { ReactComponent as DollarCurrencyIcon } from "../../assets/icons/dollar.svg";
import { ReactComponent as TransferIcon } from "../../assets/icons/transfer.svg";
import { ReactComponent as CashMoneyIcon } from "../../assets/icons/money.svg";

import { getCurrencyAction } from "../../redux/modules/getCurrency";
import {
  addToCart,
  cleanCart,
  removeFromCart,
} from "../../redux/modules/cart/cartAction";
import { getProductsByIdsAction } from "../../redux/modules/getProductsByIds";
import { thousandSeparator } from "../../utils/numberManager";
import { getOrdersAction } from "../../redux/modules/getOrders";
import SellProductFormContainer from "../sellProductForm";
import Loading from "../loadingBox";
import ErrorBox from "../errorBox";
import Text, { text } from "../../lang/langManager";
import EmptyBox from "../emptyBox";
import { toast } from "react-toastify";

function OrderSidePage({ editOrder, setEditOrder, isOpen, setIsOpen }) {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [currency, setCurrency] = useState("");

  const [wantToSell, setWantToSell] = useState(false);

  const currenciesList = [
    {
      name: "CASH",
      icon: <CashMoneyIcon />,
    },
    {
      name: "TRANSFER",
      icon: <TransferIcon />,
    },
    {
      name: "USD",
      icon: <DollarCurrencyIcon />,
    },
  ];

  const [chosenAmount, setChosenAmount] = useState(1);

  const [addToCartPopUp, setAddToCartPopUp] = useState({
    popUp: false,
    data: {},
  });

  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState("");
  const [size, setSize] = useState(10);

  useEffect(() => {
    if (editOrder.edit) {
      setFullName(editOrder?.data?.fullName);
      setPhoneNumber(editOrder?.data?.phoneNumber.slice(4));
      setCurrency(editOrder?.data?.paymentType);
    } else {
      setFullName("");
      setPhoneNumber("");
      setCurrency("");
      // dispatch(cleanCart());
    }
  }, [editOrder.edit]);

  useEffect(() => {
    dispatch(getCategoriesAction());
    dispatch(getCurrencyAction());
  }, []);

  useEffect(() => {
    dispatch(getProductsAction(0, size, categories, filter));
  }, [categories, filter, size]);

  const getProductByPage = (page) => {
    dispatch(getProductsAction(page, size, categories, filter));
  };

  const state = useSelector((state) => state);
  const products = state.products;
  const categoryList = state.categories;
  const usdCurrency = state.currency;
  const cart = state.cart;
  const productsByIds = state.productsByIds;
  const lang = state.lang;
  const productsByIdsWithAmount = productsByIds?.data?.map((value) => ({
    ...value,
    amount: cart?.find(({ productId }) => productId === value.id)?.amount,
  }));

  useEffect(() => {
    const ids = cart?.map((item) => item.productId);
    // if (ids.length > 0) {
    if (ids) {
      dispatch(getProductsByIdsAction(ids));
    }
    // }
  }, [cart]);

  const addRemoveCategory = (id) => {
    const index = categories?.indexOf(id);
    console.log(index);
    console.log(categories);
    if (index === -1) {
      setCategories([...categories, id]);
    } else {
      setCategories([...categories.filter((v, i) => i !== index)]);
    }
    console.log(categories);
  };

  const submitToCart = (e) => {
    e.preventDefault();

    dispatch(
      addToCart({ productId: addToCartPopUp.data.id, amount: chosenAmount })
    );

    setChosenAmount(1);
    setAddToCartPopUp({ popUp: false, data: {} });
  };

  const [addToOrderProcess, addToOrderRequest] = useHttpRequest({
    onSuccess: () => {
      dispatch(cleanCart());
      dispatch(getOrdersAction());
      getProductByPage(0);
      toast.success(<Text id={"successfullyCompleted"} />);
      setWantToSell(false);
      setFullName("");
      setPhoneNumber("");
      setCurrency("");
      // console.log("success request");
      setTimeout(() => {
        // console.log("clean timeout");
        setEditOrder({ edit: false, data: {} });
        setIsOpen(false);
      }, 2000);
    },
    // onFinal:()=>{
    //   dispatch(cleanCart());
    //   dispatch(getOrdersAction());
    //   dispatch(getProductByPage(0))
    //   toast.success(<Text id={"successfullyCompleted"} />);
    //   setWantToSell(false);
    //   setFullName("");
    //   setPhoneNumber("");
    //   setCurrency("");
    //   console.log("success request");
    //   setTimeout(() => {
    //     console.log("clean timeout");
    //     setEditOrder({ edit: false, data: {} });
    //   }, 2000);
    // },
    cleanTimeout: 2000,
  });

  const addToOrder = () => {
    if (fullName !== "" && phoneNumber !== "") {
      const data = {
        fullName,
        phoneNumber,
        products: cart,
        paymentType: currency === "" ? null : currency,
        orderProcess: "PREPARATION",
        orderSource: "ADMIN",
      };

      if (editOrder.edit) {
        data.orderSource = editOrder.data.orderSource;
        addToOrderRequest({
          method: "PUT",
          path: `orders/update/${editOrder.data.id}`,
          data,
        });
      } else {
        addToOrderRequest({
          method: "POST",
          path: `orders`,
          data,
        });
      }
    } else {
      toast.error(<Text id={"nameAndNumberShouldNotBeEmpty"} />);
    }
  };

  const sellProduct = (
    e,
    {
      clientPaidPrice1,
      clientPaidPrice2,
      clientPaidUSD,
      loan,
      loanComment,
      loanExpiration,
    }
  ) => {
    e.preventDefault();

    const {
      // clientPaid: { value: clientPaid },
      comment: { value: comment },
    } = e.target;

    if (fullName !== "" && phoneNumber !== "") {
      const data = {
        fullName,
        phoneNumber,
        products: cart,
        paymentType: currency === "" ? null : currency,
        orderProcess: loan ? "LOAN" : "SOLD",
        orderSource: "ADMIN",
        // paidAmount: clientPaid,
        paidPrice1: clientPaidPrice1,
        paidPrice2: clientPaidPrice2,
        paidUSD: clientPaidUSD,
        comment: comment,
        loanComment,
        loanExpiration:
          loanExpiration === "" || loanExpiration === undefined
            ? null
            : loanExpiration,
      };

      if (editOrder.edit) {
        data.orderSource = editOrder.data.orderSource;
        addToOrderRequest({
          method: "PUT",
          path: `orders/update/${editOrder.data.id}`,
          data,
        });
      } else {
        addToOrderRequest({
          method: "POST",
          path: `orders`,
          data,
        });
      }
    } else {
      toast.error(<Text id={"nameAndNumberShouldNotBeEmpty"} />);
    }
  };

  return (
    <>
      <SidePage
        isOpen={isOpen}
        width="900px"
        close={() => {
          setIsOpen(false);
          setEditOrder({ edit: false, data: {} });
          if (editOrder.edit) {
            dispatch(cleanCart());
          }
        }}
      >
        <TitleWrapper>
          <Text id="orderPage" />
        </TitleWrapper>
        <DFlex>
          <InputWrap>
            <Labels>
              <Text id="fullName" />
            </Labels>
            <InputText
              placeholder={text({ id: "fullName", lang })}
              type="text"
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
            />
          </InputWrap>

          <InputWrap>
            <Labels>
              <Text id="phoneNumber" />
            </Labels>
            <Input
              placeholder={text({ id: "phoneNumber", lang })}
              onValueChange={(e) => setPhoneNumber(e.floatValue)}
              format="+998 (##) ###-##-##"
              mask="_"
              value={phoneNumber}
              // type={'number'}
            />
          </InputWrap>

          {/* <CurrencyBox>
            <CurrencyTitle>
              <Text id="currency" />
            </CurrencyTitle>
            <CurrenciesList>
              {currenciesList.map(({ name, icon }) => (
                <Tooltip title={text({id:name,lang})}>
                  <CurrencyItem
                    active={name === currency}
                    onClick={() =>
                      currency === name ? setCurrency("") : setCurrency(name)
                    }
                  >
                    {icon}
                  </CurrencyItem>
                </Tooltip>
              ))}
            </CurrenciesList>
          </CurrencyBox> */}
        </DFlex>
        <TableWrapper>
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
                <TH></TH>
              </TRow>
            </THead>
            <TBody>
              {productsByIdsWithAmount?.map((value) => {
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
                } = value;
                return (
                  <TRow key={id}>
                    <TD>
                      <b>{name}</b>
                    </TD>
                    <TD>
                      {diameter}|{thickness}|{length}
                    </TD>
                    <TD>
                      <SmallFont>
                        {/* {currency === "CASH" ? (
                          <span>{thousandSeparator(price1)} сум</span>
                        ) : currency === "TRANSFER" ? (
                          <span>{thousandSeparator(price2)} сум</span>
                        ) : currency === "USD" ? (
                          <span>
                            $
                            {thousandSeparator(
                              (price1 / usdCurrency.data.currency).toFixed(2)
                            )}
                          </span>
                        ) : ( */}
                        <>
                          <span>{thousandSeparator(price1)} сум</span>
                          <span>{thousandSeparator(price2)} сум</span>
                          <span>
                            $
                            {thousandSeparator(
                              (price1 / usdCurrency.data.currency).toFixed(2)
                            )}
                          </span>
                        </>
                        {/* )} */}
                      </SmallFont>
                    </TD>
                    <TD>
                      <SmallFont>
                        <span>{mass} кг</span>
                        <span>{(1000 / mass).toFixed(2)} м</span>
                      </SmallFont>
                    </TD>
                    <TD>{stock ? stock : 0} м</TD>
                    <TD>
                      <HighlightedAmount
                        onClick={() => {
                          setAddToCartPopUp({ popUp: true, data: value });
                          setChosenAmount(amount);
                        }}
                      >
                        {amount} м
                      </HighlightedAmount>
                    </TD>
                    <TD action={1}>
                      <ActionWrapper>
                        <DeleteActionBox
                          onClick={() => {
                            dispatch(removeFromCart(id));
                            //   setAddToCartPopUp({
                            //     popUp: true,
                            //     data: value,
                            //   });
                          }}
                        >
                          <RemoveFromCartIcon />
                        </DeleteActionBox>
                      </ActionWrapper>
                    </TD>
                  </TRow>
                );
              })}
            </TBody>
            <TFoot>
              <TRow>
                <TD>{productsByIdsWithAmount.length}</TD>
                <TD></TD>
                <TD>
                  {/* {currency === "CASH" ? (
                    <>
                      {thousandSeparator(
                        productsByIdsWithAmount.reduce(
                          (total, { price1, amount }) =>
                            total + price1 * amount,
                          0
                        )
                      )}{" "}
                      сум
                    </>
                  ) : currency === "TRANSFER" ? (
                    <>
                      {thousandSeparator(
                        productsByIdsWithAmount.reduce(
                          (total, { price2, amount }) =>
                            total + price2 * amount,
                          0
                        )
                      )}{" "}
                      сум
                    </>
                  ) : currency === "USD" ? (
                    <>
                      $
                      {thousandSeparator(
                        productsByIdsWithAmount
                          .reduce(
                            (total, { price1, amount }) =>
                              total +
                              (price1 / usdCurrency.data.currency) * amount,
                            0
                          )
                          .toFixed(2)
                      )}
                    </>
                  ) : ( */}
                  <SmallFont>
                    <span>
                      {thousandSeparator(
                        productsByIdsWithAmount.reduce(
                          (total, { price1, amount }) =>
                            total + price1 * amount,
                          0
                        )
                      )}{" "}
                      сум
                    </span>
                    <span>
                      {thousandSeparator(
                        productsByIdsWithAmount.reduce(
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
                        productsByIdsWithAmount
                          .reduce(
                            (total, { price1, amount }) =>
                              total +
                              (price1 / usdCurrency.data.currency) * amount,
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
                    {productsByIdsWithAmount
                      .reduce(
                        (total, { mass, amount }) => total + mass * amount,
                        0
                      )
                      .toFixed(3)}{" "}
                    кг
                  </HighlightedAmount>
                </TD>
                <TD></TD>
                <TD>
                  <HighlightedAmount>
                    {productsByIdsWithAmount.reduce(
                      (total, { amount }) => total + amount,
                      0
                    )}{" "}
                    м
                  </HighlightedAmount>
                </TD>
                <TD></TD>
              </TRow>
            </TFoot>
          </Table>
        </TableWrapper>
        <ButtonWrapper>
          <div>
            <ActionButton
              loading={addToOrderProcess.loading}
              success={addToOrderProcess.success}
              error={addToOrderProcess.error}
              edit
              mr={"20px"}
              onClick={addToOrder}
            >
              <Text id={editOrder.edit ? "edit" : "addToOrders"} />
            </ActionButton>
            <Button
              className={"second-btn"}
              edit
              style={{ marginBottom: "20px", backgroundColor: "#B57068" }}
              onClick={() => setWantToSell(!wantToSell)}
            >
              <Text id="sell" />
            </Button>
          </div>
          <Button
            className={"second-btn"}
            edit
            style={{ marginBottom: "20px" }}
            onClick={() => dispatch(cleanCart())}
          >
            <Text id="cleanCart" />
          </Button>
        </ButtonWrapper>
        {wantToSell && (
          <SellProductFormContainer
            wantToSell={wantToSell}
            sellProduct={sellProduct}
            currency={currency}
            productsByIdsWithAmount={productsByIdsWithAmount}
            usdCurrency={usdCurrency}
            process={addToOrderProcess}
          />
        )}
        <SearchInput onChange={(e) => setFilter(e.target.value)} />
        <CategoryFilterWrapper>
          {categoryList.data.map(({ id, name }) => (
            <CategoryFilter
              key={id}
              active={categories.includes(id)}
              onClick={() => addRemoveCategory(id)}
            >
              {name}
            </CategoryFilter>
          ))}
        </CategoryFilterWrapper>
        <TableWrapper>
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
                <TH></TH>
              </TRow>
            </THead>
            <TBody>
              {products?.data?.content?.map((value) => {
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
                } = value;
                return (
                  <TRow key={id} chosen={addToCartPopUp.data.id === id}>
                    <TD>
                      <b>{name}</b>
                    </TD>
                    <TD>
                      {diameter}|{thickness}|{length}
                    </TD>
                    <TD>
                      <SmallFont>
                        <span>{price1} сум</span>
                        <span>{price2} сум</span>
                        <span>
                          ${(price1 / usdCurrency.data.currency).toFixed(2)}
                        </span>
                      </SmallFont>
                    </TD>
                    <TD>
                      <SmallFont>
                        <span>{mass} кг</span>
                        {/* <span>{(1000 / mass).toFixed(2)} м</span> */}
                      </SmallFont>
                    </TD>
                    <TD>{stock ? stock : 0} м</TD>
                    <TD action={1}>
                      <ActionWrapper>
                        <ActionBox
                          cart
                          onClick={() => {
                            setAddToCartPopUp({
                              popUp: true,
                              data: value,
                            });
                          }}
                        >
                          <CartIcon />
                        </ActionBox>
                      </ActionWrapper>
                    </TD>
                  </TRow>
                );
              })}
            </TBody>
          </Table>
        </TableWrapper>
        {products.success && products?.data?.content?.length === 0 && (
          <EmptyBox item="productItem" />
        )}
        {products.loading && <Loading />}
        {products.error && <ErrorBox />}
        {products?.data?.content?.length > 0 && (
          <Pagination
            size="small"
            total={products?.data?.totalElements}
            showSizeChanger
            pageSize={size}
            current={products?.data?.number + 1}
            // totalBoundaryShowSizeChanger={(e) => console.log(e)}
            onChange={(e) => getProductByPage(e - 1)}
            onShowSizeChange={(p, pageSize) => setSize(pageSize)}
            // showTotal={(e,d)=>console.log(e,d)}
          />
        )}
        {addToCartPopUp.popUp && (
          <>
            <AddToCartPopUpBackground
              onClick={() => setAddToCartPopUp({ popUp: false, data: {} })}
            />
            <AddToCartPopUpContainer>
              <PopUpTitle>
                <Text id="typeAmount" />
              </PopUpTitle>
              <form onSubmit={submitToCart}>
                <Input
                  autoFocus
                  onValueChange={(e) => setChosenAmount(e.floatValue)}
                  lWidth={"100%"}
                  suffix=" м"
                  value={chosenAmount}
                  thousandSeparator
                />
                <Button style={{ marginTop: "15px" }} edit>
                  <Text id="add" />
                </Button>
              </form>
            </AddToCartPopUpContainer>
          </>
        )}
      </SidePage>
    </>
  );
}

export default OrderSidePage;

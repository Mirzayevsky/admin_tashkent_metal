import React, { useEffect, useState } from "react";
import {
  Button,
  CancelOrder,
  EditButton,
  Table,
  TableWrapper,
  TBody,
  // TD,
  TFoot,
  TH,
  THead,
} from "../../components/styles/styles";
import {
  ActionBox,
  ActionWrapper,
  CurrenciesList,
  CurrencyItem,
  OrderPageWrapper,
  TitleWrapper,
  PopUpContainer,
  ActionsWrap,
  PopUpContainerSecond,
  ActionInnerWrapper,
  ActionInnerWrap,
  TD,
  TRow,
  SmallFont,
  PrintInExcelFormButton,
} from "./styles";

import { ReactComponent as PhoneCallIcon } from "../../assets/icons/phone-missed.svg";
import { ReactComponent as ProcessIcon } from "../../assets/icons/process.svg";
import { ReactComponent as SellIcon } from "../../assets/icons/sell.svg";
import { ReactComponent as X } from "../../assets/icons/x.svg";
import tgBotIcon from "../../assets/icons/bot.svg";
import adminIcon from "../../assets/icons/hand.svg";
import webIcon from "../../assets/icons/site.svg";
import dollarCurrencyIcon from "../../assets/icons/dollar.svg";
import transferIcon from "../../assets/icons/transfer.svg";
import cashMoneyIcon from "../../assets/icons/money.svg";
import { ReactComponent as EditSvg } from "../../assets/icons/edit.svg";

import { useDispatch } from "react-redux";
import { getOrdersAction } from "../../redux/modules/getOrders";
import OrderSidePage from "../../components/orderSidePage";
import { useSelector } from "react-redux";
import { HighlightedAmount } from "../../components/orderSidePage/styles";
import { Empty, Popover, Tooltip } from "antd";
import useHttpRequest from "../../hooks/useHttpRequest";
import { ActionButton } from "../../components/styles";
import { thousandSeparator } from "../../utils/numberManager";
import { addToCart, cleanCart } from "../../redux/modules/cart/cartAction";
import PreviewOrderProductsPopover from "../../components/previewOrderProductsPopover";
import PreviewOrderBeforeSelling from "../../components/previewOrderBeforeSelling";
import Loading from "../../components/loadingBox";
import ErrorBox from "../../components/errorBox";
import Text, { text } from "../../lang/langManager";
import EmptyBox from "../../components/emptyBox";
import { toast } from "react-toastify";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

function OrderPage() {
  const dispatch = useDispatch();

  const [isSidePageOpen, setIsSidePageOpen] = useState(false);
  const [editOrder, setEditOrder] = useState({ edit: false, data: {} });

  const [sellOrderPopUp, setSellOrderPopUp] = useState({
    popUp: false,
    data: {},
  });

  const [cancelOrderPopUp, setCancelOrderPopUp] = useState({
    popUp: false,
    data: {},
  });

  const state = useSelector((state) => state);
  const orders = state.orders;
  const usdCurrency = state.currency;
  const lang = state.lang;

  useEffect(() => {
    dispatch(getOrdersAction());
  }, []);

  const [changePaymentProcess, changePaymentRequest] = useHttpRequest({
    onSuccess: () => {
      dispatch(getOrdersAction());
      toast.success(<Text id={"successfullyCompleted"} />);
    },
  });

  const [cancelOrderProcess, cancelOrderRequest] = useHttpRequest({
    onSuccess: () => {
      dispatch(getOrdersAction());
      toast.success(<Text id={"successfullyCompleted"} />);
      setTimeout(() => {
        setCancelOrderPopUp({ popUp: false, data: {} });
      }, 2000);
    },
    cleanTimeout: 2000,
  });

  const changePayment = (params) => {
    changePaymentRequest({
      method: "PUT",
      path: `orders/change-payment-type`,
      params,
    });
  };

  const [verificationProcess, makeVerificationRequest] = useHttpRequest({
    onSuccess: () => dispatch(getOrdersAction()),
    cleanTimeout: 1,
  });
  const verifiedOrder = (id) => {
    makeVerificationRequest({
      method: "PUT",
      path: "orders/change-process",
      params: {
        orderId: id,
        process: "PREPARATION",
      },
    });
  };

  const [isProductPopUpVisible, setIsProductPopUpVisible] = useState(false);

  const addProductsToCart = (products) => {
    products.forEach(({ product, amount }) => {
      dispatch(addToCart({ productId: product.id, amount }));
    });
  };
  const style = {
    bottom: "0",
  };

  const downloadInExcelFile = (order) => {
    const {
      // active,
      canceled,
      comment,
      createdAt,
      fullName,
      id,
      orderProcess,
      paidAmount,
      paidCanceledAt,
      paymentType,
      phoneNumber,
      products,
      source,
      tgUserChatId,
    } = order;

    toast.success(<Text id={"downloading"} />);
    const fileName = `Заказ #${id} ${fullName} ${phoneNumber} ${source}`;
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const response = products.map(
      (
        { active, amount, createdAt, id, price1, price2, priceInUSD, product },
        index
      ) => {
        const {
          active: pActive,
          createdAt: pCreatedAt,
          diameter,
          id: pId,
          isOnSale,
          length,
          mass,
          name,
          price1: pPrice1,
          price2: pPrice2,
          stock,
          supplier,
          thickness,
        } = product;
        return {
          Nº: index + 1,
          ID: pId,
          Наименование: name,
          "Размер (мм)\nТолщина (мм)\nДлина (м)": `${diameter}|${thickness}|${length}`,
          "Цена наличн.": `${price1} сум`,
          "Цена безнал.": `${price2} сум`,
          USD: `$${priceInUSD.toFixed(2)}`,
          Количество: amount + " м",
        };
      }
    );

    const ws = XLSX.utils.json_to_sheet(response);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    ws["!cols"] = [
      { wch: 3 }, // No
      { wch: 3 }, // ID
      { wch: 20 }, // Name
      { wch: 25 }, // size
      { wch: 15 }, // price1
      { wch: 15 }, // price2
      { wch: 15 }, // usd
      { wch: 15 }, // amount
    ];

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
    // setHistoryData(res.data);
  };

  return (
    <OrderPageWrapper>
      <Button
        onClick={() => {
          setIsSidePageOpen(true);
          setEditOrder({ edit: false, data: {} });
        }}
        style={{ margin: "20px 0 20px auto", display: "block" }}
        edit
      >
        + <Text id="order" />
      </Button>
      <TableWrapper>
        <Table>
          <THead bg="#72a6bf">
            <TRow>
              <TH>
                <Text id="id" />
              </TH>
              <TH>
                <Text id="fullName" />
              </TH>
              <TH>
                <Text id="phoneNumber" />
              </TH>
              <TH>
                <Text id="products" />
              </TH>
              <TH>
                <Text id="amount" />
              </TH>
              <TH>
                <Text id="totalPrice" />
              </TH>
              <TH>
                <Text id="source" />
              </TH>
              <TH>
                <Text id="status" />
              </TH>
            </TRow>
          </THead>
          <TBody>
            {orders.data.map((order) => {
              const {
                id,
                fullName,
                phoneNumber,
                products,
                source,
                paymentType,
                orderProcess,
              } = order;
              console.log(order);
              return (
                <TRow
                  chosen={
                    cancelOrderPopUp?.data?.id === id ||
                    editOrder?.data?.id === id
                  }
                  key={id}
                >
                  <TD>#{id}</TD>
                  <TD>{fullName}</TD>
                  <TD>
                    <a href={`tel:${phoneNumber}`}>{phoneNumber}</a>
                  </TD>
                  {/* <TD></TD> */}
                  <TD>
                    <PreviewOrderProductsPopover
                      order={order}
                      setEditOrder={setEditOrder}
                    >
                      <Text id="products" />
                    </PreviewOrderProductsPopover>
                  </TD>
                  <TD>{products?.length}</TD>
                  <TD>
                    <SmallFont style={{ cursor: "pointer" }}>
                      {/* <Popover
                        placement="top"
                        trigger="hover"
                        style={{ height: "50px", padding: "2px" }}
                        content={
                          <CurrenciesList>
                            <Tooltip title={text({ id: "cash", lang })}>
                              <CurrencyItem
                                onClick={() => {
                                  changePayment({
                                    orderId: id,
                                    paymentType: "CASH",
                                  });
                                }}
                                active={paymentType === "CASH"}
                              >
                                <img src={cashMoneyIcon} alt="" />
                              </CurrencyItem>
                            </Tooltip>
                            <Tooltip title={text({ id: "transfer", lang })}>
                              <CurrencyItem
                                onClick={() => {
                                  changePayment({
                                    orderId: id,
                                    paymentType: "TRANSFER",
                                  });
                                }}
                                active={paymentType === "TRANSFER"}
                              >
                                <img src={transferIcon} alt="" />
                              </CurrencyItem>
                            </Tooltip>

                            <Tooltip title={text({ id: "usd", lang })}>
                              <CurrencyItem
                                onClick={() => {
                                  changePayment({
                                    orderId: id,
                                    paymentType: "USD",
                                  });
                                }}
                                active={paymentType === "USD"}
                              >
                                <img src={dollarCurrencyIcon} alt="" />
                              </CurrencyItem>
                            </Tooltip>
                          </CurrenciesList>
                        }
                      > */}
                        {/* {paymentType === "CASH" ? (
                          <span>
                            <img src={cashMoneyIcon} alt="" />
                            <p>
                              {products?.reduce(
                                (total, { amount, price1 }) =>
                                  total + amount * price1,
                                0
                              )}
                            </p>
                          </span>
                        ) : paymentType === "TRANSFER" ? (
                          <span>
                            <img src={transferIcon} alt="" />
                            <p>
                              {products?.reduce(
                                (total, { amount, price2 }) =>
                                  total + amount * price2,
                                0
                              )}
                            </p>
                          </span>
                        ) : paymentType === "USD" ? (
                          <span>
                            <img src={dollarCurrencyIcon} alt="" />
                            <p>
                              {(
                                products?.reduce(
                                  (total, { amount, price1 }) =>
                                    total + amount * price1,
                                  0
                                ) / usdCurrency.data.currency
                              ).toFixed(2)}
                            </p>
                          </span>
                        ) : ( */}
                          <div>
                            <span>
                              <img src={cashMoneyIcon} alt="" />
                              <p>
                                {products?.reduce(
                                  (total, { amount, price1 }) =>
                                    total + amount * price1,
                                  0
                                )}
                              </p>
                            </span>
                            <span>
                              <img src={transferIcon} alt="" />
                              <p>
                                {products?.reduce(
                                  (total, { amount, price2 }) =>
                                    total + amount * price2,
                                  0
                                )}
                              </p>
                            </span>
                            <span>
                              <img src={dollarCurrencyIcon} alt="" />
                              <p>
                                {(
                                  products?.reduce(
                                    (total, { amount, price1 }) =>
                                      total + amount * price1,
                                    0
                                  ) / usdCurrency.data.currency
                                ).toFixed(2)}
                              </p>
                            </span>
                          </div>
                        {/* )} */}
                      {/* </Popover> */}
                    </SmallFont>
                  </TD>
                  <TD>
                    <Tooltip title={text({ id: source, lang })}>
                      <img
                        src={
                          source === "ADMIN"
                            ? adminIcon
                            : source === "TG_BOT"
                            ? tgBotIcon
                            : source === "WEBSITE"
                            ? webIcon
                            : ""
                        }
                        alt=""
                      />
                    </Tooltip>
                  </TD>
                  <TD action={3}>
                    <ActionWrapper>
                      {source === "ADMIN" ? (
                        <ActionBox />
                      ) : (
                        <Popover
                          content={
                            <div>
                              <Text id="callConfirmation" />
                              <br />
                              <ActionButton
                                loading={verificationProcess.loading}
                                error={verificationProcess.error}
                                success={verificationProcess.success}
                                edit
                                onClick={() => verifiedOrder(id)}
                              >
                                <Text id="called" />
                              </ActionButton>
                            </div>
                          }
                        >
                          <ActionBox
                            hover
                            active={orderProcess === "VERIFICATION"}
                          >
                            <PhoneCallIcon />
                          </ActionBox>
                        </Popover>
                      )}
                      <ActionBox hover active={orderProcess === "PREPARATION"}>
                        <Tooltip title={text({ id: "PROCESS", lang })}>
                          <ProcessIcon />
                        </Tooltip>
                      </ActionBox>
                      <ActionBox
                        onClick={() =>
                          setSellOrderPopUp({ popUp: true, data: order })
                        }
                        hover
                        active={orderProcess === "SOLD"}
                      >
                        <Tooltip title={text({ id: "sell", lang })}>
                          <SellIcon />
                        </Tooltip>
                      </ActionBox>
                    </ActionWrapper>
                  </TD>
                  <EditButton
                    className={"cursor-order"}
                    onClick={() => {
                      setEditOrder({ edit: true, data: order });
                      addProductsToCart(products);
                      setIsProductPopUpVisible(false);
                    }}
                  >
                    <EditSvg />
                  </EditButton>
                  <CancelOrder
                    onClick={() =>
                      setCancelOrderPopUp({ popUp: true, data: order })
                    }
                    className="cursor-order"
                  >
                    <X />
                  </CancelOrder>
                  <PrintInExcelFormButton
                    onClick={() => downloadInExcelFile(order)}
                    className="cursor-order"
                  >
                    Excel
                  </PrintInExcelFormButton>
                </TRow>
              );
            })}
          </TBody>
        </Table>
      </TableWrapper>
      {orders.loading && <Loading />}
      {orders.error && <ErrorBox />}
      {orders.success && orders?.data?.length === 0 && (
        <EmptyBox item="orderItem" />
      )}
      <OrderSidePage
        editOrder={editOrder}
        setEditOrder={setEditOrder}
        isOpen={isSidePageOpen || editOrder.edit}
        setIsOpen={setIsSidePageOpen}
      />

      {cancelOrderPopUp.popUp && (
        <PopUpContainer
          close={() => setCancelOrderPopUp({ popUp: false, data: {} })}
        >
          <ActionInnerWrapper>
            <ActionInnerWrap>
              <TitleWrapper>
                <Text id="reallyWannaCancel" />
              </TitleWrapper>
              <ActionsWrap>
                <ActionButton
                  loading={cancelOrderProcess.loading}
                  success={cancelOrderProcess.success}
                  error={cancelOrderProcess.error}
                  edit
                  mr="20px"
                  onClick={() =>
                    cancelOrderRequest({
                      method: "PUT",
                      path: `orders/cancel/${cancelOrderPopUp.data.id}`,
                    })
                  }
                >
                  <Text id="yes" />
                </ActionButton>
                <Button
                  cancel
                  onClick={() =>
                    setCancelOrderPopUp({ popUp: false, data: {} })
                  }
                >
                  <Text id="no" />
                </Button>
              </ActionsWrap>
            </ActionInnerWrap>
          </ActionInnerWrapper>
        </PopUpContainer>
      )}

      {sellOrderPopUp.popUp && (
        <PopUpContainerSecond
          close={() => setSellOrderPopUp({ popUp: false, data: {} })}
        >
          <TitleWrapper>
            <Text id="previewBeforeSell" />
          </TitleWrapper>
          <PreviewOrderBeforeSelling
            setSellOrderPopUp={setSellOrderPopUp}
            order={sellOrderPopUp.data}
          />

          {/* <ActionButton
            loading={cancelOrderProcess.loading}
            success={cancelOrderProcess.success}
            error={cancelOrderProcess.error}
            edit
            mr="20px"
            onClick={() =>
              cancelOrderRequest({
                method: "PUT",
                path: `orders/cancel/${cancelOrderPopUp.data.id}`,
              })
            }
          >
            да
          </ActionButton>
          <Button
            cancel
            onClick={() => setCancelOrderPopUp({ popUp: false, data: {} })}
          >
            нет
          </Button> */}
        </PopUpContainerSecond>
      )}
    </OrderPageWrapper>
  );
}

export default OrderPage;

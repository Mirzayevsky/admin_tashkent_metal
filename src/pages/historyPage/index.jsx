import { Checkbox, DatePicker, Dropdown, Empty, Menu, Pagination } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Label,
  Table,
  TableWrapper,
  TBody,
  TD,
  TH,
  THead,
  TRow,
} from "../../components/styles/styles";
import { getHistoryAction } from "../../redux/modules/getHistory";
import { DateTimeContainer, HistoryPageWrapper, PeriodBox } from "./styles";
import { ReactComponent as MenuBar } from "../../assets/icons/menu.svg";
import PreviewOrderProductsPopover from "../../components/previewOrderProductsPopover";
import PreviewHistoryProductsPopover from "../../components/previewHistoryProductsPopover";
import { ActionButton } from "../../components/styles";
import useHttpRequest from "../../hooks/useHttpRequest";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { getDate } from "../../utils/dateManager";
import Loading from "../../components/loadingBox";
import ErrorBox from "../../components/errorBox";
import DateTime from "../../components/dateTime";
import Text from "../../lang/langManager";
import EmptyBox from "../../components/emptyBox";
import { toast } from "react-toastify";
import dollarCurrencyIcon from "../../assets/icons/dollar.svg";
import transferIcon from "../../assets/icons/transfer.svg";
import cashMoneyIcon from "../../assets/icons/money.svg";
import { SmallFont } from "../orderPage/styles";

function HistoryPage() {
  const dispatch = useDispatch();

  const [canceled, setCanceled] = useState(true);

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(false);

  // const headers = [
  //   { label: "Id", key: "id" },
  //   { label: "Name", key: "fullName" },
  //   { label: "PhoneNumber", key: "phoneNumber" },
  //   { label: "Source", key: "source" },
  //   { label: "Payment Type", key: "paymentType" },
  //   { label: "Paid Amount", key: "paidAmount" },
  //   { label: "Canceled", key: "canceled" },
  //   { label: "Date", key: "paidCanceledAt" },
  // ];

  const [historyProcess, makeHistoryRequest] = useHttpRequest({
    onSuccess: (res) => {
      toast.success(<Text id={"downloading"} />);
      const fileName = `история продаж ${startDate?.format(
        "DD/MM/yyyy"
      )} - ${endDate?.format("DD/MM/yyyy")}`;
      const fileType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      const fileExtension = ".xlsx";
      let response = [];
      res.data.forEach(
        (
          {
            active,
            canceled,
            comment,
            createdAt,
            fullName,
            id,
            orderProcess,
            paidAmount,
            paidPrice1,
            paidPrice2,
            paidUSD,
            paidCanceledAt,
            paymentType,
            phoneNumber,
            products,
            source,
            tgUserChatId,
          },
          index
        ) => {
          response.push({
            Nº: index + 1,
            ID: id,
            "Ф.И.О": fullName,
            "Номер телефона": phoneNumber,
            Продукты: products.length + " м",
            "Цена нал. (Сумма)": paidPrice1,
            "Перечисление (Сумма)": paidPrice2,
            "USD (Сумма)": paidUSD,
            Комментарий: comment,
            Источник:
              source === "ADMIN"
                ? "Администратор"
                : source === "WEBSITE"
                ? "Веб-сайт"
                : source === "TG_BOT"
                ? "Телеграмм бот"
                : source,
            Отменен: canceled ? "да" : "нет",
            Дата: getDate(paidCanceledAt),
          });

          response = [
            ...response,
            ...products.map(
              ({
                // active,
                amount,
                // createdAt,
                id,
                price1,
                price2,
                priceInUSD,
                product,
              }) => {
                const {
                  // active,
                  // createdAt,
                  diameter,
                  id: productId,
                  // isOnSale,
                  length,
                  mass,
                  name,
                  // price1,
                  // price2,
                  // stock,
                  // supplier,
                  thickness,
                } = product;
                return {
                  Код: productId,
                  Наименование: name,
                  "Диаметр (мм)\nТолщина (мм)\nдлина": `${diameter}|${thickness}|${length}`,
                  "Масса (кг)": `${mass}`,
                  "Цена нал.": price1,
                  Перечисление: price2,
                  USD: priceInUSD.toFixed(2),
                  количество: amount,
                };
              }
            ),
          ];
        }
      );

      const ws = XLSX.utils.json_to_sheet(response);
      const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
      // XLSX.utils.sheet_add_aoa(ws, [["Name", "Birthday"]], { origin: "A1" });

      /* calculate column width */
      // const max_width = response.reduce(
      //   (w, r) => Math.max(w, r["Номер телефона"].length),
      //   10
      // );
      ws["!cols"] = [
        { wch: 3 }, // No
        { wch: 3 }, // ID
        { wch: 18 }, // fullName
        { wch: 14 }, // phoneNumber
        { wch: 8 }, // product
        // { wch: 15 }, // payment type
        { wch: 16 }, // total amount cash
        { wch: 20 }, // total amount transfer
        { wch: 12 }, // total amount usd
        { wch: 12 }, // comment
        { wch: 13 }, // source
        { wch: 7 }, // canceled
        { wch: 15 }, // date
        { wch: 3 }, // productId
        { wch: 15 }, // productName
        { wch: 12 }, // productSize
        { wch: 10 }, // productMass
        { wch: 10 }, // productPrice1
        { wch: 15 }, // productPrice2
        { wch: 5 }, // productUSD
        { wch: 10 }, // productAmount
      ];

      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const data = new Blob([excelBuffer], { type: fileType });
      FileSaver.saveAs(data, fileName + fileExtension);
      setHistoryData(res.data);
    },
  });

  const getForCSV = () => {
    makeHistoryRequest({
      method: "GET",
      path: "orders/history-for-csv",
      params: {
        canceled,
        startDate: `${startDate?.format("yyyy-MM-DD")} 00:00:00`,
        endDate: `${endDate?.format("yyyy-MM-DD")} 23:59:59`,
      },
    });
  };

  useEffect(() => {
    if (startDate && endDate) {
      dispatch(
        getHistoryAction(
          page,
          size,
          canceled,
          `${startDate?.format("yyyy-MM-DD")} 00:00:00`,
          `${endDate?.format("yyyy-MM-DD")} 23:59:59`
        )
      );
    }
  }, [page, size, canceled, startDate, endDate]);

  const history = useSelector((state) => state.history);

  return (
    <HistoryPageWrapper>
      <DateTime
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
      {/* <div>
        {startDate} <br />
        {endDate}
      </div> */}
      <Checkbox
        checked={canceled}
        onChange={() => {
          setCanceled(!canceled);
          setPage(0);
        }}
      >
        <Text id="showCanceledOrders" />
      </Checkbox>
      <br /> <br />
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
              {/* <TH>Платежи</TH> */}
              <TH>
                <Text id="date" />
              </TH>
            </TRow>
          </THead>
          <TBody>
            {history?.data?.content?.map((order) => {
              const {
                active,
                canceled,
                comment,
                createdAt,
                fullName,
                id,
                orderProcess,
                // paidAmount,
                paidPrice1,
                paidPrice2,
                paidUSD,
                paymentType,
                phoneNumber,
                products,
                source,
                tgUserChatId,
                paidCanceledAt,
              } = order;
              const date = new Date(paidCanceledAt);

              return (
                <TRow
                  key={id}
                  chosenColor={"rgba(249, 40, 40, 0.4)"}
                  chosen={canceled}
                >
                  <TD>#{id}</TD>
                  <TD>{fullName}</TD>
                  <TD>
                    <a href={`tel:${phoneNumber}`}>{phoneNumber}</a>
                  </TD>
                  <TD>
                    <PreviewHistoryProductsPopover order={order}>
                      <Text id="products" /> {products.length}
                    </PreviewHistoryProductsPopover>
                  </TD>
                  <TD>
                    {products.reduce((total, { amount }) => total + amount, 0)}{" "}
                    м
                  </TD>
                  <TD>
                    <SmallFont>
                      {paidPrice1 !== null ? (
                        <span>
                          <img src={cashMoneyIcon} alt="" />
                          <p>{paidPrice1}</p>
                        </span>
                      ) : (
                        ""
                      )}
                      {paidPrice2 !== null ? (
                        <span>
                          <img src={transferIcon} alt="" />
                          <p>{paidPrice2}</p>
                        </span>
                      ) : (
                        ""
                      )}
                      {paidUSD !== null ? (
                        <span>
                          <img src={dollarCurrencyIcon} alt="" />
                          <p>{paidUSD}</p>
                        </span>
                      ) : (
                        ""
                      )}
                    </SmallFont>
                    {/* {paidAmount} */}
                    {paymentType === "CASH" || paymentType === "TRANSFER"
                      ? " UZS"
                      : paymentType === "USD"
                      ? " USD"
                      : ""}
                  </TD>
                  {/* <TD></TD> */}
                  <TD>
                    {/* {date.getDate()}/{date.getMonth()}/{date.getFullYear()}
                    <br /> */}
                    {moment(date).calendar()}
                    {/* {date.getHours()}:{date.getMinutes()} */}
                  </TD>
                </TRow>
              );
            })}
          </TBody>
        </Table>
      </TableWrapper>
      {history.loading && <Loading />}
      {history.error && <ErrorBox />}
      {history.success && history.data.content.length === 0 && (
        <EmptyBox item={"orderItem"} />
      )}
      {history?.data?.content?.length > 0 && (
        <>
          <Pagination
            size="small"
            // showSizeChanger
            // onShowSizeChange={(page, size) => {
            //   setSize(size);
            //   console.log(page, size);
            // }}
            current={page + 1}
            onChange={(e) => setPage(e - 1)}
            total={history?.data?.totalElements}
          />

          <ActionButton
            edit
            style={{ marginTop: "20px" }}
            onClick={() => getForCSV()}
          >
            {/* {loading ? 'Loading csv...' : 'Export Data'} */}
            <Text id="excel" />
          </ActionButton>
        </>
      )}
    </HistoryPageWrapper>
  );
}

export default HistoryPage;

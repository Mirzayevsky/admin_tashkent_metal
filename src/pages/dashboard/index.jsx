import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  BestSellersWrapper,
  BestSellerTitle,
  CircleWrapper,
  CurrencyWrapper,
  DashboardWrapper,
  DownloadStatButton,
  DownloadStatWrapper,
  NumberOfUsersAndClients,
  SalesChartWrapper,
  SalesWrapper,
  Table,
  UserClientStatBox,
} from "./styles";

import check from "../../assets/icons/check.svg";

import NumberFormat from "react-number-format";
import { useDispatch } from "react-redux";
import { getCurrencyAction } from "../../redux/modules/getCurrency";
import { useSelector } from "react-redux";
import httpRequest from "../../utils/httpRequest";
import useHttpRequest from "../../hooks/useHttpRequest";
import { getOrdersAction } from "../../redux/modules/getOrders";
import { getUsersClients } from "../../redux/modules/getUsersClients";
import { getHistoryWithPeriod } from "../../redux/modules/getHistoryWithPeriod";
import moment from "moment";
import { SalesStat } from "../../components/salesStat";
import BestSellers from "../../components/bestSellers";
import { useNavigate } from "react-router-dom";
import { DateTimeContainer } from "../historyPage/styles";
import DateTime from "../../components/dateTime";
import Text from "../../lang/langManager";
import { toast } from "react-toastify";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { getDate } from "../../utils/dateManager";

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  const [inputCurrency, setInputCurrency] = useState(0);

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const [process, makeRequest] = useHttpRequest({
    onSuccess: () => dispatch(getCurrencyAction()),
  });

  const changeCurrency = (e) => {
    toast.success(<Text id={"currencyChanged"} />);
    e.preventDefault();
    makeRequest({
      method: "PUT",
      path: "currency/USD",
      data: inputCurrency,
    });
  };

  useEffect(() => {
    dispatch(getCurrencyAction());
    dispatch(getUsersClients());
  }, []);

  const usdCurrency = state.currency;
  const usersClients = state.usersClients;

  useEffect(() => {
    if (usdCurrency.success) {
      setInputCurrency(usdCurrency?.data?.currency);
    }
  }, [usdCurrency.success]);

  useEffect(() => {
    startDate && endDate && dispatch(getHistoryWithPeriod(startDate, endDate));
  }, [startDate, endDate]);

  const [historyProcess, makeHistoryRequest] = useHttpRequest({
    onSuccess: (res) => {
      toast.success(<Text id={"downloading"} />);
      const fileName = `?????????????? ???????????? ${moment().subtract(30,"days")?.format(
        "DD/MM/yyyy"
      )} - ${moment()?.format("DD/MM/yyyy")}`;
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
            N??: index + 1,
            ID: id,
            "??.??.??": fullName,
            "?????????? ????????????????": phoneNumber,
            ????????????????: products.length + " ??",
            "???????? ??????. (??????????)": paidPrice1,
            "???????????????????????? (??????????)": paidPrice2,
            "USD (??????????)": paidUSD,
            ??????????????????????: comment,
            ????????????????:
              source === "ADMIN"
                ? "??????????????????????????"
                : source === "WEBSITE"
                ? "??????-????????"
                : source === "TG_BOT"
                ? "?????????????????? ??????"
                : source,
            ??????????????: canceled ? "????" : "??????",
            ????????: getDate(paidCanceledAt),
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
                  ??????: productId,
                  ????????????????????????: name,
                  "?????????????? (????)\n?????????????? (????)\n??????????": `${diameter}|${thickness}|${length}`,
                  "?????????? (????)": `${mass}`,
                  "???????? ??????.": price1,
                  ????????????????????????: price2,
                  USD: priceInUSD.toFixed(2),
                  ????????????????????: amount,
                };
              }
            ),
          ];
        }
      );

      // const response = res.data.map(
      //   (
      //     {
      //       active,
      //       canceled,
      //       comment,
      //       createdAt,
      //       fullName,
      //       id,
      //       orderProcess,
      //       paidAmount,
      //       paidPrice1,
      //       paidPrice2,
      //       paidUSD,
      //       paidCanceledAt,
      //       paymentType,
      //       phoneNumber,
      //       products,
      //       source,
      //       tgUserChatId,
      //     },
      //     index
      //   ) => ({
      //     N??: index + 1,
      //     ID: id,
      //     "??.??.??": fullName,
      //     "?????????? ????????????????": phoneNumber,
      //     ????????????????: products.length + " ??",
      //     "???????? ??????. (??????????)": paidPrice1,
      //     "???????????????????????? (??????????)": paidPrice2,
      //     "USD (??????????)": paidUSD,
      //     // "???????????? ????????????": paymentType,
      //     // ??????????: paidAmount
      //     //   ? `${paymentType === "USD" ? "$" : ""}${paidAmount} ${
      //     //       paymentType === "CASH" || paymentType === "TRANSFER"
      //     //         ? " ??????"
      //     //         : ""
      //     //     }`
      //     //   : "",
      //     ??????????????????????: comment,
      //     ????????????????:
      //       source === "ADMIN"
      //         ? "??????????????????????????"
      //         : source === "WEBSITE"
      //         ? "??????-????????"
      //         : source === "TG_BOT"
      //         ? "?????????????????? ??????"
      //         : source,
      //     ??????????????: canceled ? "????" : "??????",
      //     ????????: getDate(paidCanceledAt),
      //   })
      // );

      const ws = XLSX.utils.json_to_sheet(response);
      const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
      // XLSX.utils.sheet_add_aoa(ws, [["Name", "Birthday"]], { origin: "A1" });

      /* calculate column width */
      // const max_width = response.reduce(
      //   (w, r) => Math.max(w, r["?????????? ????????????????"].length),
      //   10
      // );
      ws["!cols"] = [
        // { wch: 3 }, // No
        // { wch: 3 }, // ID
        // { wch: 20 }, // fullName
        // { wch: 15 }, // phoneNumber
        // { wch: 10 }, // product
        // // { wch: 15 }, // payment type
        // { wch: 20 }, // total amount cash
        // { wch: 20 }, // total amount transfer
        // { wch: 20 }, // total amount usd
        // { wch: 20 }, // comment
        // { wch: 15 }, // source
        // { wch: 10 }, // canceled
        // { wch: 15 }, // date

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
      // setHistoryData(res.data);
    },
  });

  const getForCSV = () => {
    makeHistoryRequest({
      method: "GET",
      path: "orders/history-for-csv",
      params: {
        canceled: false,
        startDate: `${moment()
          .subtract(30, "days")
          ?.format("yyyy-MM-DD")} 00:00:00`,
        endDate: `${moment()?.format("yyyy-MM-DD")} 23:59:59`,
      },
    });
  };

  return (
    <DashboardWrapper>
      <SalesChartWrapper>
        <div className="calendar">
        <DateTime
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
        </div>
        <p className="title">
          <Text id="salesStat" />
        </p>
        <SalesWrapper>
          <SalesStat startDate={startDate} endDate={endDate} />
        </SalesWrapper>
        {/* Dashboard */}
      </SalesChartWrapper>
      <NumberOfUsersAndClients>
        <p className="title">
          <Text id="clientsUsersStat" />
        </p>
        <CircleWrapper>
          <ResponsiveContainer width={300} height={300}>
            <PieChart
            // width={300}
            // height={300}
            //   onMouseEnter={this.onPieEnter}
            >
              <Pie
                data={[
                  {
                    name: "????????????????????????",
                    value: usersClients?.data?.users
                      ? usersClients?.data?.users
                      : 0,
                  },
                  {
                    name: "??????????????",
                    value: usersClients?.data?.clients
                      ? usersClients?.data?.clients
                      : 0,
                  },
                ]}
                cx={100}
                // cy={100}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                // paddingAngle={0}
                dataKey="value"
              >
                <Cell key={`cell-1`} fill={"#B57068"} />
                <Cell key={`cell-2`} fill={"#72A6BF"} />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CircleWrapper>
        <UserClientStatBox>
          <li className="users-stat">
            <span>
              <Text id="users" />
            </span>
            <b>{usersClients?.data?.users ? usersClients?.data?.users : 0}</b>
          </li>
          <li className="clients-stat">
            <span>
              <Text id="clients" />
            </span>
            <b>
              {usersClients?.data?.clients ? usersClients?.data?.clients : 0}
            </b>
          </li>
        </UserClientStatBox>
      </NumberOfUsersAndClients>

      <BestSellers
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
      <DownloadStatWrapper>
        <p className="text-download-stat">
          <Text id="printSales" />
        </p>
        <DownloadStatButton
          onClick={() => {
            getForCSV();
            // navigate("/history");
          }}
        >
          <Text id="downloadFile" />
        </DownloadStatButton>
        <p className="text-download-stat">
          <Text id="changeCurrency" />
        </p>
        <CurrencyWrapper onSubmit={changeCurrency}>
          <div className="currency">$1</div>
          <div className="currency-input">
            <NumberFormat
              value={inputCurrency}
              onValueChange={(e) => setInputCurrency(e.floatValue)}
              //   defaultValue={usdCurrency.success && usdCurrency?.data?.currency}
              thousandSeparator
              format={"##,### UZS"}
              // suffix=" UZS"
              type="text"
              required
            />
          </div>
          <button disabled={usdCurrency?.data?.currency === inputCurrency}>
            <img src={check} alt="check" />
          </button>
        </CurrencyWrapper>
      </DownloadStatWrapper>
    </DashboardWrapper>
  );
}

export default Dashboard;

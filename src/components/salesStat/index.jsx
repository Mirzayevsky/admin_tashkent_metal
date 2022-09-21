import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { text } from "../../lang/langManager";
import { getHistoryWithPeriod } from "../../redux/modules/getHistoryWithPeriod";
import {
  addZeroIfNeeded,
  dateTimeInNumber,
  dayMonth,
} from "../../utils/dateManager";

export const SalesStat = ({ startDate, endDate }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const lang = state.lang;
  const history = state.getHistoryWithPeriod;
  const [dateInterval, setDateInterval] = useState({});
  const [interval, setInterval] = useState(7);
  //   const [startDate, setStartDate] = useState(
  //     moment().subtract(interval, "days")
  //   );
  //   const [endDate, setEndDate] = useState(moment());
  //   const [data, setData] = useState([]);

  useEffect(() => {
    console.log("days", -startDate?.diff(endDate, "days"));
    setDateInterval({});
    for (let i = -startDate?.diff(endDate, "days"); i >= 0; i--) {
      //   console.log(moment().subtract(i, "days").format("yyyy-MM-DD"));
      setDateInterval((prevState) => ({
        ...prevState,
        [moment().subtract(i, "days").format("yyyy-MM-DD")]: {
          length: 0,
          cash: 0,
          transfer: 0,
          dollar: 0,
        },
      }));
    }
  }, [startDate, endDate]);

  useEffect(() => {
    if (history.data) {
      //   setDateInterval({});
      console.log("history.data: ", history.data);
      console.log(dateInterval);
      Object.keys(dateInterval).forEach((intervalDate) => {
        console.log(intervalDate);
        console.log(
          history.data.reduce((t, { products, createdAt, paidCanceledAt }) => {
            const dateTime = dateTimeInNumber(paidCanceledAt);
            if (dateTime === intervalDate) {
              return t + products.reduce((t, { amount }) => t + amount, 0);
            }
            return t;
          }, 0)
        );
        setDateInterval((prev) => ({
          ...prev,
          [intervalDate]: {
            length: history.data.reduce(
              (t, { products, createdAt, paidCanceledAt }) => {
                const dateTime = dateTimeInNumber(paidCanceledAt);
                if (dateTime === intervalDate) {
                  return t + products.reduce((t, { amount }) => t + amount, 0);
                }
                return t;
              },
              0
            ),
            cash: history.data.reduce(
              (
                t,
                {
                  paidPrice1,
                  paidPrice2,
                  paidUSD,
                  paidAmount,
                  paymentType,
                  createdAt,
                  paidCanceledAt
                }
              ) => {
                const dateTime = dateTimeInNumber(paidCanceledAt);
                if (dateTime === intervalDate) {
                  return t + paidPrice1;
                  // (paymentType === "CASH" ? paidAmount : 0);
                }
                return t;
              },
              0
            ),
            transfer: history.data.reduce(
              (
                t,
                {
                  paidPrice1,
                  paidPrice2,
                  paidUSD,
                  paidAmount,
                  paymentType,
                  createdAt,
                  paidCanceledAt,
                }
              ) => {
                const dateTime = dateTimeInNumber(paidCanceledAt);
                if (dateTime === intervalDate) {
                  return t + paidPrice2;
                  // (paymentType === "TRANSFER" ? paidAmount : 0);
                }
                return t;
              },
              0
            ),
            dollar: history.data.reduce(
              (
                t,
                {
                  paidPrice1,
                  paidPrice2,
                  paidUSD,
                  paidAmount,
                  paymentType,
                  createdAt,
                }
              ) => {
                const dateTime = dateTimeInNumber(createdAt);
                if (dateTime === intervalDate) {
                  return t + paidUSD;
                  // (paymentType === "USD" ? paidAmount : 0);
                }
                return t;
              },
              0
            ).toFixed(2),
          },
        }));
      });

      //   history.data?.forEach(
      //     ({ products, paidAmount, paymentType, createdAt }) => {
      //       const date = new Date(createdAt);
      //       const dateTime = `${date.getFullYear()}-${addZeroIfNeeded(
      //         date.getMonth() + 1
      //       )}-${addZeroIfNeeded(date.getDate())}`;
      //       console.log("products amount", products, paidAmount);
      //       setDateInterval((prevState) => ({
      //         ...prevState,
      //         [dateTime]: {
      //           length: (prevState[dateTime].length += products.reduce(
      //             (t, { amount }) => t + amount,
      //             0
      //           )),
      //           cash: (prevState[dateTime].cash +=
      //             paymentType === "CASH" ? paidAmount : 0),
      //           transfer: (prevState[dateTime].transfer +=
      //             paymentType === "TRANSFER" ? paidAmount : 0),
      //           dollar: (prevState[dateTime].dollar +=
      //             paymentType === "USD" ? paidAmount : 0),
      //         },
      //       }));
      //     }
      //   );
    }
  }, [history.success]);

  return (
    <>
      <ResponsiveContainer width="100%" height="70%">
        <BarChart
          data={Object.keys(dateInterval).map((date) => {
            //   console.log(date);
            return {
              [text({ id: "length", lang })]: dateInterval[date].length,
              [text({ id: "cash", lang })]: dateInterval[date].cash,
              [text({ id: "transfer", lang })]: dateInterval[date].transfer,
              [text({ id: "dollar", lang })]: dateInterval[date].dollar,
              name: dayMonth(date),
            };
          })}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis yAxisId="left" orientation="left" stroke="#72A6BF" />
          <YAxis yAxisId="right" orientation="right" stroke="#B57068" />
          <Tooltip />
          <Legend />
          <Bar
            yAxisId="left"
            dataKey={text({ id: "length", lang })}
            fill="#72A6BF"
          />
          <Bar
            yAxisId="right"
            dataKey={text({ id: "cash", lang })}
            fill="#7006BF"
            stackId={"money"}
          />
          <Bar
            yAxisId="right"
            dataKey={text({ id: "transfer", lang })}
            fill="#72A600"
            stackId={"money"}
          />
          <Bar
            yAxisId="right"
            dataKey={text({ id: "dollar", lang })}
            fill="#B57068"
            stackId={"money"}
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

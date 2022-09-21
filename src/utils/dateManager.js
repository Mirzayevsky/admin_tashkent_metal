import moment from "moment";

// const months = [
//   "Jan",
//   "Fab",
//   "Mar",
//   "Apr",
//   "May",
//   "Jun",
//   "Jul",
//   "Aug",
//   "Sep",
//   "Oct",
//   "Nov",
//   "Dec",
// ];

const months = [
  "Янв",
  "Фев",
  "Мар",
  "Апр",
  "Май",
  "Июн",
  "Июл",
  "Авг",
  "Сен",
  "Окт",
  "Ноя",
  "Дек",
];

export const addZeroIfNeeded = (number) => {
  if (number < 10) {
    return `0${number}`;
  } else {
    return number;
  }
};

export const showDateTime = (date) => {
  const dateTime = new Date(date);
  //   console.log(moment(dateTime.getTime()).format());
  return (
    <>
      {dateTime.getDate()}-{months[dateTime.getMonth()]}{" "}
      {dateTime.getFullYear()} <br />
      {dateTime.getHours()}:{addZeroIfNeeded(dateTime.getMinutes())}
    </>
  );
};

export const getDate = (date) => {
  const dateTime = new Date(date);
  //   console.log(moment(dateTime.getTime()).format());
  return `${dateTime.getDate()}-${
    months[dateTime.getMonth()]
  } ${dateTime.getFullYear()}`;
};

export function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

export const dateTimeInNumber = (createdAt) => {
  const date = new Date(createdAt);
  return `${date.getFullYear()}-${addZeroIfNeeded(
    date.getMonth() + 1
  )}-${addZeroIfNeeded(date.getDate())}`;
};

export const dayMonth=(date)=>{
  const [year,month,day]=date.split("-");
  return `${Number(day)}/${Number(month)}`;
}
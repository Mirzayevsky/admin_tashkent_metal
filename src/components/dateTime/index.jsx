import { DatePicker, Dropdown, Menu } from "antd";
import React, { useEffect } from "react";
import { DateTimeContainer, PeriodBox } from "./styles";
import { ReactComponent as MenuBar } from "../../assets/icons/menu.svg";
import moment from "moment";
import Text from "../../lang/langManager";
import ruRu from "antd/lib/locale/ru_RU";
import "moment/locale/ru";
import locale from "antd/es/date-picker/locale/ru_RU";
function DateTime({ startDate, setStartDate, endDate, setEndDate }) {
  useEffect(() => {
    setStartDate(moment().subtract(7, "days"));
    setEndDate(moment());
    console.log(startDate, endDate);
    console.log(moment().toString());
  }, []);
  return (
    <DateTimeContainer>
      <PeriodBox>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item
                key="1"
                onClick={() => {
                  setStartDate(moment().subtract(7, "days"));
                  setEndDate(moment());
                }}
              >
                <Text id="last7Days" />
              </Menu.Item>
              <Menu.Item
                key="2"
                onClick={() => {
                  setStartDate(moment().subtract(30, "days"));
                  setEndDate(moment());
                }}
              >
                <Text id="last30Days" />
              </Menu.Item>
              <Menu.Item
                key="3"
                onClick={() => {
                  setStartDate(moment().subtract(100, "days"));
                  setEndDate(moment());
                }}
              >
                <Text id="last100Days" />
              </Menu.Item>
            </Menu>
          }
        >
          <MenuBar />
        </Dropdown>
      </PeriodBox>
      <DatePicker
        locale={locale}
        onChange={(e) => {
          if (e) {
            setStartDate(e);
          }
        }}
        format="DD/MM/YYYY"
        value={startDate}
        style={{marginRight:"10px"}}
      />
      <DatePicker
        locale={locale}
        onChange={(e) => {
          if (e) {
            setEndDate(e);
          }
        }}
        format="DD/MM/YYYY"
        value={endDate}
      />
    </DateTimeContainer>
  );
}

export default DateTime;

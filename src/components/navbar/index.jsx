import React, { useEffect } from "react";
import {
  AddUserBox,
  CalendarBox,
  LangBox,
  Logo,
  LogoPart,
  LogoText,
  NavbarActionPart,
  NavbarWrapper,
  RingBox,
  SearchBox,
  UserBox,
} from "./styles";

import { ReactComponent as LogoIcon } from "../../assets/icons/logo.svg";
import { ReactComponent as LogoTextIcon } from "../../assets/icons/CRM-система.svg";
import { ReactComponent as CalendarIcon } from "../../assets/icons/calendar.svg";
import { ReactComponent as SearchIcon } from "../../assets/icons/search-icon.svg";
import { ReactComponent as RingIcon } from "../../assets/icons/ring-icon.svg";
import { ReactComponent as AddUserIcon } from "../../assets/icons/add-user.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../../redux/modules/getMe";
// import {ReactComponent as UserIcon} from "../../assets/icons/user.svg"
import userImg from "../../assets/images/user.png";
import { Dropdown, Menu, Popover, Select } from "antd";
import {
  switchToRussian,
  switchToUzbek,
  toggleLang,
} from "../../redux/modules/lang/langAction";
import lang from "../../constants/lang";
import Text from "../../lang/langManager";

const { UZBEK, RUSSIAN } = lang;

const { Option } = Select;
function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const me = state.getMe?.data;
  const lang = state.lang;

  useEffect(() => {
    dispatch(getMe());
  }, [localStorage.getItem("token")]);

  const logout = () => {
    localStorage.removeItem("token");
    dispatch(getMe());
  };

  return (
    <NavbarWrapper>
      <LogoPart onClick={() => navigate("/")}>
        <Logo>
          <LogoIcon />
        </Logo>
        <LogoText>
          <LogoTextIcon />
        </LogoText>
      </LogoPart>
      <NavbarActionPart>
        {/* <CalendarBox>
          <CalendarIcon />
        </CalendarBox> */}
        {/* <SearchBox>
          <SearchIcon />
          <input type="search" />
        </SearchBox> */}
        {/* <RingBox>
          <RingIcon />
        </RingBox>
        <AddUserBox>
          <AddUserIcon />
        </AddUserBox> */}
        {/* <Select
          labelInValue
          defaultValue={{ value: lang }}
          style={{ width: 120, marginRight: "20px" }}
          onChange={(e) => {
            switch (e.value) {
              case "RUSSIAN":
                dispatch(switchToRussian());
                break;
              case "UZBEK":
                dispatch(switchToUzbek());
                break;
              default:
                break;
            }
            console.log(e);
          }}
        >
          <Option value="UZBEK">o'zbek</Option>
          <Option value="RUSSIAN">русский</Option>
        </Select> */}
        <LangBox
          right={lang === RUSSIAN}
          onClick={() => dispatch(toggleLang())}
        >
          <span />
          <div className="left">UZ</div>
          <div className="right">RU</div>
        </LangBox>
        <UserBox>
          <Dropdown
            overlay={
              <Menu>
                {/*<Menu.Item>{me?.fullName}</Menu.Item>*/}
                {/*<Menu.Item>{me?.username}</Menu.Item>*/}
                <Menu.Item style={{backgroundColor:"#72A6BF99"}} onClick={logout}><Text id={'logOut'}/></Menu.Item>
              </Menu>
            }
          >
            <img src={userImg} alt="" />
          </Dropdown>
        </UserBox>
      </NavbarActionPart>
    </NavbarWrapper>
  );
}

export default Navbar;

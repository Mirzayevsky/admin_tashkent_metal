import React, { useState } from "react";
import {
  ArrowIconBox,
  ArrowIconContainer,
  ArrowIconText,
  CloseSidebar,
  NavBox,
  NavIcon,
  NavsWrapper,
  NavText,
  SidebarLogo,
} from "./styles";
import Logo from "../../assets/images/space.png";

import { useLocation } from "react-router-dom";
//icon
import { ReactComponent as CircleArrowIcon } from "../../assets/icons/circle-arrow.svg";
import Text, { text } from "../../lang/langManager";
import { Tooltip } from "antd";
import { useSelector } from "react-redux";
import useWindowDimensions from "../../hooks/useWindowDimensions";

const Sidebar = ({ navData, isOpen, setIsOpen }) => {
  const location = useLocation();
  const state = useSelector((state) => state);
  const lang = state.lang;

  const { height, width } = useWindowDimensions();

  return (
    <React.Fragment>
      {/* <SidebarLogo to={"/"} isOpen={isOpen}>
                <img src={Logo} alt=""/>
            </SidebarLogo> */}
      <NavsWrapper isOpen={isOpen}>
        {navData.map(({ navName, link, icon }, index) =>
          !isOpen || (width > 610 && width < 1260) ? (
            <Tooltip
              color={"#b57068"}
              placement="right"
              title={text({ id: navName, lang })}
            >
              <NavBox
                key={index}
                to={link}
                isOpen={isOpen}
                selected={location.pathname === link}
              >
                <NavIcon isOpen={isOpen}>
                  <img src={icon} alt="" />
                </NavIcon>
                <NavText isOpen={isOpen}>
                  <Text id={navName} />
                </NavText>
              </NavBox>
            </Tooltip>
          ) : (
            <NavBox
              key={index}
              to={link}
              isOpen={isOpen}
              selected={location.pathname === link}
            >
              <NavIcon isOpen={isOpen}>
                <img src={icon} alt="" />
              </NavIcon>
              <NavText isOpen={isOpen}>
                <Text id={navName} />
              </NavText>
            </NavBox>
          )
        )}
      </NavsWrapper>
      <CloseSidebar onClick={() => setIsOpen(!isOpen)}>
        <ArrowIconBox isOpen={isOpen}>
          <ArrowIconContainer isOpen={isOpen}>
            <CircleArrowIcon />
          </ArrowIconContainer>
          <ArrowIconText isOpen={isOpen}>
            <Text id="clickHere" />
          </ArrowIconText>
        </ArrowIconBox>
      </CloseSidebar>
    </React.Fragment>
  );
};
export default Sidebar;

import React, { useEffect } from "react";

import { Menu } from "antd";
import Text from "../../lang/langManager";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { BarWrapper } from "./styles";

function SupplierPage() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  useEffect(() => {
    console.log(pathname.substring(10));
  }, [pathname]);
  const handleClick = (e) => {
    switch (e.key) {
      case "supplier":
        navigate("/suppliers");
        break;
      case "client":
        navigate("/suppliers/client");
        break;
      case "certificate":
        navigate("/suppliers/certificate");
        break;
      default:
        break;
    }
  };

  return (
    <BarWrapper>
      <Menu
        onClick={handleClick}
        selectedKeys={[
          pathname.substring(10) === ""
            ? "supplier"
            : pathname.substring(10) === "/client"
            ? "client"
            : pathname.substring(10) === "/certificate"
            ? "certificate"
            : "",
        ]}
        mode="horizontal"
      >
        <Menu.Item key="supplier">
          <Text id="suppliers" />
        </Menu.Item>
        <Menu.Item key="client">
          <Text id="clients" />
        </Menu.Item>
        <Menu.Item key="certificate">
          <Text id="certificate" />
        </Menu.Item>
      </Menu>
      <Outlet />
    </BarWrapper>
  );
}

export default SupplierPage;

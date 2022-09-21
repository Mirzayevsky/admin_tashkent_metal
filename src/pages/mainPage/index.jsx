import React, { useState } from "react";
import Sidebar from "../../components/sidebar";
import { ContentWrapper, MainPageWrapper, SidebarWrapper } from "./styles";
import { navData } from "../../constants/sidebarItems";
import Navbar from "../../components/navbar";
import { Container } from "../../components/styles/styles";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../dashboard";
import OrderPage from "../orderPage";
import ProductPage from "../productPage";
import HistoryPage from "../historyPage";
import MarketingPage from "../marketingPage";
import UsersPage from "../usersPage";
import LoginPage from "../loginPage";
import SupplierPage from "../supplierPage";
import SupplierSection from "../../components/supplierSection";
import ClientSection from "../../components/clientSection";
import CertificateSection from "../../components/certificateSection";
import { useSelector } from "react-redux";
import Star from "../../assets/icons/nav-star.svg";
import LoanPage from "../loanPage";

function MainPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const state = useSelector((state) => state);
  const me = state.getMe;
  const userRole = me?.data?.role?.roleName;

  return (
    <MainPageWrapper>
      <Navbar />
      <SidebarWrapper isOpen={isSidebarOpen}>
        <Sidebar
          navData={
            userRole
              ? userRole === "MARKETING"
                ? [
                    {
                      navName: "navMarketing",
                      icon: Star,
                      link: "/marketing",
                    },
                  ]
                : navData
              : []
          }
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
        />
      </SidebarWrapper>
      <ContentWrapper isOpen={isSidebarOpen}>
        <Container isOpen={isSidebarOpen}>
          <Routes>
            {userRole ? (
              userRole === "MARKETING" ? (
                <Route path="/marketing" element={<MarketingPage />} />
              ) : (
                <>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/orders" element={<OrderPage />} />
                  <Route path="/loan" element={<LoanPage />} />
                  <Route path="/products" element={<ProductPage />} />
                  <Route path="/history" element={<HistoryPage />} />
                  <Route path="/marketing" element={<MarketingPage />} />
                  <Route path="/users" element={<UsersPage />} />
                  <Route path="/suppliers" element={<SupplierPage />}>
                    <Route path="" element={<SupplierSection />} />
                    <Route path="client" element={<ClientSection />} />
                    <Route
                      path="certificate"
                      element={<CertificateSection />}
                    />
                  </Route>
                </>
              )
            ) : (
              ""
            )}
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </Container>
      </ContentWrapper>
    </MainPageWrapper>
  );
}

export default MainPage;

// import React from "react"

//icons
import { ReactComponent as DashboardIcon } from "../assets/icons/sidebar-dashboard.svg";
import { ReactComponent as TeacherIcon } from "../assets/icons/sidebar-teacher.svg";
import { ReactComponent as UserIcon } from "../assets/icons/sidebar-users.svg";
import { ReactComponent as CourseIcon } from "../assets/icons/sidebar-course.svg";
import { ReactComponent as WebinarIcon } from "../assets/icons/sidebar-webinar.svg";
import { ReactComponent as SendIcon } from "../assets/icons/sidebar-send.svg";
import { ReactComponent as PaymentIcon } from "../assets/icons/sidebar-payment.svg";

import Home from "../assets/icons/nav-home.svg";
import Cart from "../assets/icons/nav-cart.svg";
import Loan from "../assets/icons/nav-loan.svg";
import Products from "../assets/icons/nav-category.svg";
import Money from "../assets/icons/dollar-sign.svg";
import Star from "../assets/icons/nav-star.svg";
import Users from "../assets/icons/nav-user.svg";
import Time from "../assets/icons/nav-time.svg";
import Document from "../assets/icons/nav-document.svg";
import Agreement from "../assets/icons/nav-agreement.svg";

export const navData = [
  {
    navName: "navDashboard",
    icon: Home,
    link: "/",
  },
  {
    navName: "navOrders",
    icon: Cart,
    link: "/orders",
  },
  {
    navName: "navLoan",
    icon: Loan,
    link: "/loan",
  },
  {
    navName: "navProducts",
    icon: Products,
    link: "/products",
  },
  {
    navName: "navHistory",
    icon: Time,
    link: "/history",
  },
  // {
  //   navName: "navayment",
  //   icon: Money,
  //   link: "/payment",
  // },
  {
    navName: "navMarketing",
    icon: Star,
    link: "/marketing",
  },
  {
    navName: "navUsers",
    icon: Users,
    link: "/users",
  },
  // {
  //   navName: "navocs",
  //   icon: Document,
  //   link: "/docs",
  // },
  {
    navName: "navSuppliers",
    icon: Agreement,
    link: "/suppliers",
  },
];

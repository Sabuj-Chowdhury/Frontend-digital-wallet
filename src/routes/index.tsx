import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import About from "@/pages/About";
import AgentAddMoney from "@/pages/agent/AgentAddMoney";
import Features from "@/pages/Features";
import LoginPage from "@/pages/LoginPage";
import Pricing from "@/pages/Pricing";
import RegisterPage from "@/pages/RegisterPage";
import Deposit from "@/pages/user/Deposit";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter } from "react-router";
import { adminSidebarNavlinks } from "./adminSidebarNavlinks";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: About,
        path: "about",
      },
      {
        Component: Features,
        path: "features",
      },
      {
        Component: Pricing,
        path: "pricing",
      },
    ],
  },
  {
    Component: DashboardLayout,
    path: "/admin",
    children: [...generateRoutes(adminSidebarNavlinks)],
  },
  {
    Component: DashboardLayout,
    path: "/user",
    children: [
      {
        Component: Deposit,
        path: "user-deposit",
      },
    ],
  },
  {
    Component: DashboardLayout,
    path: "/agent",
    children: [
      {
        Component: AgentAddMoney,
        path: "agent-add-money",
      },
    ],
  },

  {
    Component: LoginPage,
    path: "login",
  },
  {
    Component: RegisterPage,
    path: "registration",
  },
]);

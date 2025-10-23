import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import About from "@/pages/About";
import Features from "@/pages/Features";
import LoginPage from "@/pages/LoginPage";
import Pricing from "@/pages/Pricing";
import RegisterPage from "@/pages/RegisterPage";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter } from "react-router";
import { adminSidebarNavlinks } from "./adminSidebarNavlinks";
import { userSidebarNavlinks } from "./userSidebarNavlinks";
import { agentSidebarNavlinks } from "./agentSidebarNavlinks";

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
    children: [...generateRoutes(userSidebarNavlinks)],
  },
  {
    Component: DashboardLayout,
    path: "/agent",
    children: [...generateRoutes(agentSidebarNavlinks)],
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

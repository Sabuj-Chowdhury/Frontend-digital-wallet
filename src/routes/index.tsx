import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import About from "@/pages/About";
import Features from "@/pages/Features";
import LoginPage from "@/pages/LoginPage";
import Pricing from "@/pages/Pricing";
import RegisterPage from "@/pages/RegisterPage";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarNavlinks } from "./adminSidebarNavlinks";
import { userSidebarNavlinks } from "./userSidebarNavlinks";
import { agentSidebarNavlinks } from "./agentSidebarNavlinks";

import { role } from "@/constants/role";
import type { TRole } from "@/types";
import { withAuth } from "@/utils/withAuth";

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

  //  {
  //   Component: withAuth(DashboardLayout, role.superAdmin as TRole),
  //   path: "/admin",
  //   children: [
  //     { index: true, element: <Navigate to="/admin/analytics" /> },
  //     ...generateRoutes(adminSidebarItems),
  //   ],
  // },

  {
    Component: withAuth(DashboardLayout, role.admin as TRole),
    path: "/admin",
    children: [
      {
        index: true,
        element: <Navigate to="/admin/overview" />,
      },
      ...generateRoutes(adminSidebarNavlinks),
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.user as TRole),
    path: "/user",
    children: [
      { index: true, element: <Navigate to="/user/overview" /> },

      ...generateRoutes(userSidebarNavlinks),
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.agent as TRole),
    path: "/agent",
    children: [
      {
        index: true,
        element: <Navigate to="/agent/overview" />,
      },
      ...generateRoutes(agentSidebarNavlinks),
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

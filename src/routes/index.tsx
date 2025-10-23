import App from "@/App";
import About from "@/pages/About";
import Features from "@/pages/Features";
import LoginPage from "@/pages/LoginPage";
import Pricing from "@/pages/Pricing";
import RegisterPage from "@/pages/RegisterPage";
import { createBrowserRouter } from "react-router";

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
    Component: LoginPage,
    path: "login",
  },
  {
    Component: RegisterPage,
    path: "registration",
  },
]);

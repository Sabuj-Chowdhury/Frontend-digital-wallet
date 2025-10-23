import Profile from "@/pages/Profile";
import Deposit from "@/pages/user/Deposit";
import SendMoney from "@/pages/user/SendMoney";
import TransectionHistory from "@/pages/user/TransectionHistory";
import UserOverview from "@/pages/user/UserOverview";
import type { ISidebarItems } from "@/types";

export const userSidebarNavlinks: ISidebarItems[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Overview",
        url: "/user/overview",
        component: UserOverview,
      },
      {
        title: "Add Money",
        url: "/user/add-money",
        component: Deposit,
      },
      {
        title: "Send Money",
        url: "/user/send-money",
        component: SendMoney,
      },
      {
        title: "History",
        url: "/user/transection-history",
        component: TransectionHistory,
      },
      {
        title: "Profile",
        url: "/user/profile",
        component: Profile,
      },
    ],
  },
];

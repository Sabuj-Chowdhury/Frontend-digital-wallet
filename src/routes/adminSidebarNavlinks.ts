import AdminOverview from "@/pages/admin/AdminvOverview";
import AllTransections from "@/pages/admin/AllTransections";
import ManageAgents from "@/pages/admin/ManageAgents";
import ManageUsers from "@/pages/admin/ManageUsers";
import Profile from "@/pages/Profile";
import type { ISidebarItems } from "@/types";

export const adminSidebarNavlinks: ISidebarItems[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Overview",
        url: "/admin/overview",
        component: AdminOverview,
      },
      {
        title: "All transection",
        url: "/admin/all-transection",
        component: AllTransections,
      },
      {
        title: "Manage Agents",
        url: "/admin/mange-agents",
        component: ManageAgents,
      },
      {
        title: "Manage Users",
        url: "/admin/manage-users",
        component: ManageUsers,
      },
      {
        title: "Profile",
        url: "/admin/profile",
        component: Profile,
      },
    ],
  },

  // {
  //   title: "My Profile",
  //   items: [
  //     {
  //       title: "Profile",
  //       url: "/admin/profile",
  //       component: Profile,
  //     },
  //   ],
  // },
];

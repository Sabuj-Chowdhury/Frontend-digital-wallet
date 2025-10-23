import AllTransections from "@/pages/admin/AllTransections";
import ManageAgents from "@/pages/admin/ManageAgents";
import ManageUsers from "@/pages/admin/ManageUsers";
import type { ISidebarItems } from "@/types";

export const adminSidebarNavlinks: ISidebarItems[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "All transection",
        url: "/admin/all-transection",
        component: AllTransections,
      },
      {
        title: "Agents",
        url: "/admin/mange-agents",
        component: ManageAgents,
      },
      {
        title: "Users",
        url: "/admin/manage-users",
        component: ManageUsers,
      },
    ],
  },
];

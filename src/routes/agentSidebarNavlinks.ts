import AgentAddMoney from "@/pages/agent/AgentAddMoney";
import AgentSendMoney from "@/pages/agent/AgentSendMoney";
import AgentTransectionHistory from "@/pages/agent/AgentTransectionHistory";
import Overview from "@/pages/agent/Overview";
import Profile from "@/pages/Profile";
import type { ISidebarItems } from "@/types";

export const agentSidebarNavlinks: ISidebarItems[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Overview",
        url: "/agent/overview",
        component: Overview,
      },
      {
        title: "Add Money",
        url: "/agent/agent-add-money",
        component: AgentAddMoney,
      },
      {
        title: "Send Money",
        url: "/agent/agent-send-money",
        component: AgentSendMoney,
      },
      {
        title: "History",
        url: "/agent/agent-transection-history",
        component: AgentTransectionHistory,
      },
      {
        title: "Profile",
        url: "/agent/profile",
        component: Profile,
      },
    ],
  },
];

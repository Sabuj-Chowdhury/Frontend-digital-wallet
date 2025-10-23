import { role } from "@/constants/role";
import { adminSidebarNavlinks } from "@/routes/adminSidebarNavlinks";
import { agentSidebarNavlinks } from "@/routes/agentSidebarNavlinks";
import { userSidebarNavlinks } from "@/routes/userSidebarNavlinks";

import type { TRole } from "@/types";

export const getSidebarItems = (userRole: TRole) => {
  switch (userRole) {
    case role.admin:
      return [...adminSidebarNavlinks];
    case role.agent:
      return [...agentSidebarNavlinks];
    case role.user:
      return [...userSidebarNavlinks];
    default:
      return [];
  }
};

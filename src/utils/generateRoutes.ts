import type { ISidebarItems } from "@/types";

export const generateRoutes = (sidebarItems: ISidebarItems[]) => {
  return sidebarItems.flatMap((sideItem) =>
    sideItem.items.map((route) => ({
      path: route.url,
      Component: route.component,
    }))
  );
};

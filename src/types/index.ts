import type { ComponentType } from "react";

export interface ISidebarItems {
  title: string;
  items: {
    title: string;
    url: string;
    component: ComponentType;
  }[];
}

export type TRole = "AGENT" | "ADMIN" | "USER";

export interface DepositData {
  _id: string;
  user: string;
  balance: number;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
  updatedAt: string;
}

export interface DepositResponse {
  success: boolean;
  message: string;
  data: DepositData;
}

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

export interface UserWithdrawData {
  message: string;
  amount: number;
  fee: number;
  userWallet: {
    balance: number;
  };
  agentWallet: {
    balance: number;
  };
  agent: {
    name: string;
    phone: string;
  };
}

export interface UserWithdrawResponse {
  success: boolean;
  message: string;
  data: UserWithdrawData;
}

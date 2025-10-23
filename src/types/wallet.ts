export interface WalletUser {
  _id: string;
  name: string;
  phone: string;
  email: string;
  role: "USER" | "ADMIN" | string; // adjust roles if more exist
}

export interface WalletData {
  _id: string;
  user: WalletUser;
  balance: number;
  status: "ACTIVE" | "INACTIVE" | string;
  createdAt: string;
  updatedAt: string;
}

export interface WalletResponse {
  success: boolean;
  message: string;
  data: {
    wallet: WalletData;
  };
}

export interface WalletSummary {
  _id: string;
  user: string; // user id only (not a full user object)
  balance: number;
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED"; // extend as needed
  createdAt: string;
  updatedAt: string;
}

// types/wallet.ts

export interface WalletInfo {
  _id: string;
  balance: number;
  user: string; // userId or username depending on backend
  currency?: string;
  updatedAt: string;
  createdAt: string;
}

export interface TransactionData {
  _id: string;
  senderWallet: WalletInfo;
  receiverWallet: WalletInfo;
  amount: number;
  fee?: number;
  totalAmount?: number; // amount + fee
  status: "pending" | "success" | "failed";
  createdAt: string;
  updatedAt: string;
}

export interface SendMoneyResponse {
  success: boolean;
  message?: string;
  data?: TransactionData;
}

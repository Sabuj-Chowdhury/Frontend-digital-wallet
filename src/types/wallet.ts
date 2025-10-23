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

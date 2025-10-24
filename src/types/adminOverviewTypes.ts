export type User = {
  role: "USER" | "AGENT" | "ADMIN";
};

export type Transaction = {
  _id: string;
  type: "ADD_MONEY" | "SEND_MONEY" | "WITHDRAW" | "CASH_IN" | string;
  amount: number;
  fee: number;
  status: string;
  createdAt: string;
  fromUser?: { name: string };
  toUser?: { name: string };
  meta?: {
    method?: string;
    receiverPhone?: string;
    agentPhone?: string;
  };
};

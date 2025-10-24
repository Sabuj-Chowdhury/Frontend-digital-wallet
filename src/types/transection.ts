export interface TransactionUser {
  _id: string;
  name: string;
  phone: string;
  slug: string;
}

export interface TransactionMeta {
  method?: string;
  receiverPhone?: string;

  agentPhone?: string;
  [key: string]: unknown; // in case there are more meta fields in future
}

export interface TransactionData {
  _id: string;
  type: "ADD_MONEY" | "SEND_MONEY" | "WITHDRAW" | string;
  amount: number;
  fee: number;
  fromUser: TransactionUser | null;
  toUser: TransactionUser | null;
  initiatedBy: string;
  status: "PENDING" | "COMPLETED" | "FAILED" | string;
  meta?: TransactionMeta;
  createdAt: string;
  updatedAt: string;
}

export interface TransactionResponse {
  success: boolean;
  message: string;
  data: TransactionData[];
}

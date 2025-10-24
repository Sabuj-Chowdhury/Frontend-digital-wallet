export type UserMeta = {
  currentPage: number;
  limit: number;
  total: number;
  totalPage: number;
};

export type User = {
  _id: string;
  name: string;
  phone: string;
  email: string;
  password: string;
  role: "USER" | "AGENT" | "ADMIN";
  isDeleted: boolean;
  isActive: "ACTIVE" | "INACTIVE" | string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  slug: string;
  wallet: string;
};

export type GetAllUsersResponse = {
  success: boolean;
  message: string;
  meta: UserMeta;
  data: User[];
};

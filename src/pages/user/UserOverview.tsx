import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";

import {
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Wallet,
  History,
} from "lucide-react";
import { Link } from "react-router";
import {
  useUserTransectionInfoQuery,
  useWalletInfoQuery,
} from "@/redux/features/user/user.api";
import type { TransactionData } from "@/types/transection";

const UserOverview = () => {
  const { data: userData } = useUserInfoQuery(undefined);
  const slug = userData?.data?.slug;
  // console.log(slug);

  const { data: walletData } = useWalletInfoQuery(slug, { skip: !slug });

  const { data: transectionData } = useUserTransectionInfoQuery(slug, {
    skip: !slug,
  });

  const wallet = walletData?.data;
  const transactions = transectionData?.data || [];
  console.log(transactions);
  // console.log(wallet);
  // console.log(wallet?.wallet?._id);

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Overview</h1>
        <p className="text-muted-foreground text-sm">
          Welcome back, {userData?.data?.name || "User"} 👋
        </p>
      </div>

      {/* Wallet Balance */}
      <Card className=" rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5" />
            Wallet Balance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">
            {wallet?.wallet?.balance
              ? `${wallet?.wallet?.balance.toFixed(2)} BDT`
              : "0.00 BDT"}
          </p>
          <p className="text-sm opacity-90">
            Wallet ID: {wallet?.wallet?._id || "—"}
          </p>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Button
          variant="outline"
          className="flex flex-col items-center justify-center h-24 rounded-xl"
        >
          <Link
            to="/user/add-money"
            className="flex flex-col items-center justify-center h-24 rounded-xl shadow"
          >
            <Plus className="w-5 h-5 mb-2" />
            <span>Add Money</span>
          </Link>
        </Button>
        <Button
          variant="outline"
          className="flex flex-col items-center justify-center h-24 rounded-xl"
        >
          <Link
            to="/user/send-money"
            className="flex flex-col items-center justify-center h-24 rounded-xl shadow"
          >
            <ArrowUpRight className="w-5 h-5 mb-2" />
            <span>Send</span>
          </Link>
        </Button>

        <Button
          variant="outline"
          className="flex flex-col items-center justify-center h-24 rounded-xl"
        >
          <Link
            to="/user/withdraw-money"
            className="flex flex-col items-center justify-center h-24 rounded-xl shadow"
          >
            <ArrowDownRight className="w-5 h-5 mb-2" />
            <span>Withdraw Money</span>
          </Link>
        </Button>

        <Button
          variant="outline"
          className="flex flex-col items-center justify-center h-24 rounded-xl"
        >
          <Link
            to="/user/transection-history"
            className="flex flex-col items-center justify-center h-24 rounded-xl shadow"
          >
            <History className="w-5 h-5 mb-2" />
            View All Transactions
          </Link>
        </Button>
      </div>

      {/* Recent Transactions */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-foreground">Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          {transactions.length > 0 ? (
            <div className="space-y-4">
              {transactions.slice(0, 5).map((tx: TransactionData) => (
                <div
                  key={tx._id}
                  className="flex items-center justify-between border-b pb-3 last:border-none"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {tx.meta?.method}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {tx.createdAt}
                    </p>
                  </div>
                  <p
                    className={`font-semibold ${
                      tx.type === "ADD_MONEY"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {tx.type === "ADD_MONEY" ? "+" : "-"}
                    {tx.amount} BDT
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No recent transactions found.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserOverview;

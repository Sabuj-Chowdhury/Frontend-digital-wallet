import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import {
  useWalletInfoQuery,
  useUserTransectionInfoQuery,
} from "@/redux/features/user/user.api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const AgentOverview = () => {
  const { data: userData, isLoading: isUserLoading } =
    useUserInfoQuery(undefined);
  const slug = userData?.data?.slug;

  const { data: walletData, isLoading: isWalletLoading } = useWalletInfoQuery(
    slug,
    {
      skip: !slug,
    }
  );

  const { data: transectionData, isLoading: isTranLoading } =
    useUserTransectionInfoQuery(slug, {
      skip: !slug,
    });

  const isLoading = isUserLoading || isWalletLoading || isTranLoading;
  const wallet = walletData?.data;
  const transactions = transectionData?.data || [];

  // Compute cash-in / cash-out summary
  const totalCashIn = transactions
    .filter((t) => t.type === "ADD_MONEY")
    .reduce((acc, t) => acc + t.amount, 0);
  const totalCashOut = transactions
    .filter((t) => t.type === "WITHDRAW")
    .reduce((acc, t) => acc + t.amount, 0);

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2 className="animate-spin h-10 w-10 text-primary" />
      </div>
    );

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground">
          Agent Overview
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Welcome back, {userData?.data?.name || "Agent"} 👋
        </p>
      </div>

      {/* Wallet Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="rounded-2xl border border-border shadow-md">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Wallet Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {wallet?.wallet?.balance?.toFixed(2) || "0.00"} BDT
            </p>
            <p className="text-xs text-muted-foreground">
              Wallet ID: {wallet?.wallet?._id || "—"}
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border border-border shadow-md">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Total Cash In
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">
              {totalCashIn.toFixed(2)} BDT
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border border-border shadow-md">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Total Cash Out
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-600">
              {totalCashOut.toFixed(2)} BDT
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card className="border border-border shadow-md rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          {transactions.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground py-6">
              No recent transactions found.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.slice(0, 5).map((tx) => (
                  <TableRow
                    key={tx._id}
                    className="hover:bg-muted/10 transition"
                  >
                    <TableCell className="font-semibold flex items-center gap-1">
                      {tx.type === "ADD_MONEY" ? (
                        <ArrowDownRight className="w-4 h-4 text-green-600" />
                      ) : (
                        <ArrowUpRight className="w-4 h-4 text-red-600" />
                      )}
                      {tx.type}
                    </TableCell>
                    <TableCell
                      className={`font-medium ${
                        tx.type === "ADD_MONEY"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {tx.amount.toFixed(2)} BDT
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          tx.status === "COMPLETED"
                            ? "default"
                            : tx.status === "PENDING"
                            ? "warning"
                            : "destructive"
                        }
                      >
                        {tx.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(tx.createdAt).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentOverview;

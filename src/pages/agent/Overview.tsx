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
import {
  Loader2,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  Activity,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Overview = () => {
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
  console.log(transactions);
  if (isLoading)
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2 className="animate-spin h-10 w-10 text-primary" />
      </div>
    );

  const totalCashIn = transactions
    .filter((tx) => tx.type === "CASH_IN")
    .reduce((sum, tx) => sum + tx.amount, 0);
  const totalCashOut = transactions
    .filter((tx) => tx.type === "CASH_OUT")
    .reduce((sum, tx) => sum + tx.amount, 0);

  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-background to-muted/20 rounded-2xl shadow-sm">
      {/* Header */}
      <div className="text-center space-y-1">
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          Agent Overview
        </h1>
        <p className="text-muted-foreground text-sm">
          Welcome back, {userData?.data?.name || "Agent"} 👋
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="rounded-2xl border border-border shadow-sm hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm text-muted-foreground">
              Wallet Balance
            </CardTitle>
            <Wallet className="w-5 h-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground">
              {wallet?.wallet?.balance?.toFixed(2) || "0.00"} BDT
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Wallet ID: {wallet?.wallet?._id || "—"}
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border border-border shadow-sm hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm text-muted-foreground">
              Total Cash In
            </CardTitle>
            <ArrowDownRight className="w-5 h-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">
              {totalCashIn.toFixed(2)} BDT
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Based on recent transactions
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border border-border shadow-sm hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm text-muted-foreground">
              Total Cash Out
            </CardTitle>
            <ArrowUpRight className="w-5 h-5 text-red-600" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-600">
              {totalCashOut.toFixed(2)} BDT
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Based on recent transactions
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card className="border border-border shadow-sm rounded-2xl overflow-hidden">
        <CardHeader className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg font-semibold text-foreground">
              Recent Transactions
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {transactions.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground py-6">
              No recent transactions found.
            </p>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-border/40">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>TO</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.slice(0, 6).map((tx) => (
                    <TableRow
                      key={tx._id}
                      className="hover:bg-muted/10 transition"
                    >
                      <TableCell className="font-semibold flex items-center gap-1">
                        {tx.type === "CASH_IN" ? (
                          <ArrowDownRight className="w-4 h-4 text-green-600" />
                        ) : (
                          <ArrowUpRight className="w-4 h-4 text-red-600" />
                        )}
                        {tx.type}
                      </TableCell>

                      <TableCell className={`font-medium `}>
                        {tx.toUser?.phone}
                      </TableCell>

                      <TableCell
                        className={`font-medium ${
                          tx.type === "CASH_IN"
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
                      <TableCell className="text-xs text-muted-foreground">
                        {tx.meta?.method || "—"}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {new Date(tx.createdAt).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Overview;

import { useState } from "react";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { useUserTransectionInfoQuery } from "@/redux/features/user/user.api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import OriginPagination from "@/components/OriginPagination";
import type { TransactionData } from "@/types/transection";

const AgentTransactionHistory = () => {
  const { data: userData } = useUserInfoQuery(undefined);
  const slug = userData?.data?.slug;

  const { data: transectionData, isLoading } = useUserTransectionInfoQuery(
    slug,
    {
      skip: !slug,
    }
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const transactions: TransactionData[] = transectionData?.data || [];

  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  // Paginate transactions
  const paginatedTransactions: TransactionData[] = transactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2 className="animate-spin h-10 w-10 text-primary" />
      </div>
    );

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-1">
        <h1 className="text-2xl font-semibold text-foreground">
          Transaction History
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          View all your recent and past transactions.
        </p>
      </div>

      {/* Transactions Table */}
      <Card className="border border-border rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            All Transactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          {transactions.length === 0 ? (
            <p className="text-center text-muted-foreground py-6 text-sm">
              No transactions found.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>TO</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedTransactions.map((tx) => (
                    <TableRow key={tx._id} className="hover:bg-muted/10">
                      <TableCell
                        className={`font-semibold ${
                          tx?.type === "WITHDRAW"
                            ? "text-destructive"
                            : "text-success"
                        }`}
                      >
                        {tx?.type}
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

                      <TableCell className="text-muted-foreground">
                        {tx?.toUser?.name} ({tx?.toUser?.phone})
                      </TableCell>

                      <TableCell>
                        <Badge
                          variant={
                            tx.status === "COMPLETED"
                              ? "default"
                              : tx.status === "PENDING"
                              ? "secondary"
                              : "destructive"
                          }
                        >
                          {tx.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {new Date(tx.createdAt).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {totalPages > 1 && (
                <div className="flex justify-center mt-6">
                  <OriginPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    paginationItemsToDisplay={5}
                    onPageChange={(page: number) => setCurrentPage(page)}
                  />
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentTransactionHistory;

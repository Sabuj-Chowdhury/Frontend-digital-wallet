import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { useUserTransectionInfoQuery } from "@/redux/features/user/user.api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import OriginPagination from "@/components/OriginPagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TransectionHistory = () => {
  const { data: userData } = useUserInfoQuery(undefined);
  const slug = userData?.data?.slug;

  const { data: transectionData, isLoading } = useUserTransectionInfoQuery(
    slug,
    {
      skip: !slug,
    }
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState("ALL"); // Filter state
  const itemsPerPage = 10;

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2 className="animate-spin h-10 w-10 text-primary" />
      </div>
    );

  const transactions = transectionData?.data || [];

  // Filter transactions by type
  const filteredTransactions =
    filterType === "ALL"
      ? transactions
      : transactions.filter((tran) => tran.type === filterType);

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-8 space-y-6">
      <Card className="shadow-lg border border-border rounded-xl">
        <CardHeader className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <div>
            <CardTitle className="text-2xl font-semibold">
              Transaction History
            </CardTitle>
            <p className="text-sm text-foreground-muted mt-1">
              {filteredTransactions.length} transactions found
            </p>
          </div>

          {/* Filter dropdown */}
          <div className="mt-4 sm:mt-0">
            <Select
              value={filterType}
              onValueChange={(value) => {
                setFilterType(value);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All</SelectItem>
                <SelectItem value="WITHDRAW">Withdraw</SelectItem>
                <SelectItem value="ADD_MONEY">Deposit</SelectItem>
                <SelectItem value="SEND_MONEY">Transfer</SelectItem>
                {/* Add more types if needed */}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent>
          {filteredTransactions.length === 0 ? (
            <p className="foreground-muted text-center py-10">
              No transactions found.
            </p>
          ) : (
            <>
              <Table className="rounded-lg overflow-hidden">
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Fee</TableHead>
                    <TableHead>To</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedTransactions.map((tran) => (
                    <TableRow
                      key={tran._id}
                      className="hover:bg-muted/10 transition rounded-md"
                    >
                      <TableCell
                        className={`font-semibold ${
                          tran.type === "WITHDRAW"
                            ? "text-destructive"
                            : "text-success"
                        }`}
                      >
                        {tran.type}
                      </TableCell>
                      <TableCell className="font-medium">
                        {tran.amount}
                      </TableCell>
                      <TableCell className="foreground-muted">
                        {tran.fee}
                      </TableCell>
                      <TableCell className="foreground-muted">
                        {tran?.toUser?.name} ({tran?.toUser?.phone})
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            tran.status === "COMPLETED"
                              ? "bg-success/20 text-success"
                              : tran.status === "PENDING"
                              ? "bg-warning/20 text-warning"
                              : "bg-destructive/20 text-destructive"
                          }`}
                        >
                          {tran.status}
                        </span>
                      </TableCell>
                      <TableCell className="foreground-muted text-sm">
                        {new Date(tran.createdAt).toLocaleString()}
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
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TransectionHistory;

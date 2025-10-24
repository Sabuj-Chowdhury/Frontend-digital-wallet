import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAllTransactionsQuery } from "@/redux/features/admin/admin.api";
import OriginPagination from "@/components/OriginPagination";

import {
  PlusCircle,
  ArrowUpRight,
  MinusCircle,
  CreditCard,
  Loader2,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Transaction } from "@/types/adminOverviewTypes";

const AllTransactions = () => {
  const { data, isLoading } = useAllTransactionsQuery(undefined);

  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 8;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2 className="animate-spin h-10 w-10 text-primary" />
      </div>
    );
  }

  const transactions: Transaction[] = data?.data?.data || [];

  // Apply filter by type
  let filteredTransactions =
    filterType === "ALL"
      ? transactions
      : transactions.filter((tx: Transaction) => tx.type === filterType);

  // Apply search filter
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filteredTransactions = filteredTransactions.filter(
      (tx: Transaction) =>
        tx.fromUser?.name?.toLowerCase().includes(query) ||
        tx.toUser?.name?.toLowerCase().includes(query) ||
        tx.meta?.receiverPhone?.toLowerCase().includes(query) ||
        tx.meta?.agentPhone?.toLowerCase().includes(query)
    );
  }

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const typeColor = (type: string) => {
    switch (type) {
      case "ADD_MONEY":
        return "bg-green-100 text-green-700";
      case "SEND_MONEY":
        return "bg-blue-100 text-blue-700";
      case "WITHDRAW":
        return "bg-yellow-100 text-yellow-700";
      case "CASH_IN":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const typeIcon = (type: string) => {
    switch (type) {
      case "ADD_MONEY":
        return <PlusCircle className="inline w-4 h-4 mr-1" />;
      case "SEND_MONEY":
        return <ArrowUpRight className="inline w-4 h-4 mr-1" />;
      case "WITHDRAW":
        return <MinusCircle className="inline w-4 h-4 mr-1" />;
      case "CASH_IN":
        return <CreditCard className="inline w-4 h-4 mr-1" />;
      default:
        return null;
    }
  };

  const statusColor = (status: string) =>
    status === "COMPLETED"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700";

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold text-foreground mb-6">
        All Transactions
      </h1>

      {/* Filter & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
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
            <SelectItem value="ADD_MONEY">Deposit</SelectItem>
            <SelectItem value="SEND_MONEY">Transfer</SelectItem>
            <SelectItem value="WITHDRAW">Withdraw</SelectItem>
            <SelectItem value="CASH_IN">Cash In</SelectItem>
          </SelectContent>
        </Select>

        <Input
          placeholder="Search by user or phone..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full sm:w-60"
        />
      </div>

      <div className="overflow-x-auto rounded-lg shadow-md">
        <Table className="min-w-full bg-muted">
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Fee</TableHead>
              <TableHead>From → To</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedTransactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4">
                  No transactions found.
                </TableCell>
              </TableRow>
            ) : (
              paginatedTransactions.map((tx: Transaction) => (
                <TableRow
                  key={tx._id}
                  className="hover:bg-muted/50 transition-colors"
                >
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-semibold ${typeColor(
                        tx.type
                      )}`}
                    >
                      {typeIcon(tx.type)}
                      {tx.type}
                    </span>
                  </TableCell>
                  <TableCell className="text-foreground font-medium">
                    {tx.amount.toLocaleString()} BDT
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {tx.fee.toLocaleString()} BDT
                  </TableCell>
                  <TableCell className="text-foreground font-medium">
                    {tx.fromUser?.name || "System"} →{" "}
                    {tx.toUser?.name || "System"}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {tx.meta?.method}
                    {tx.meta?.receiverPhone &&
                      ` | Receiver: ${tx.meta.receiverPhone}`}
                    {tx.meta?.agentPhone && ` | Agent: ${tx.meta.agentPhone}`}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-semibold ${statusColor(
                        tx.status
                      )}`}
                    >
                      {tx.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(tx.createdAt).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

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
  );
};

export default AllTransactions;

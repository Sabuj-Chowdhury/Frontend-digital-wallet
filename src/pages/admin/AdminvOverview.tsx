import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useAllTransactionsQuery,
  useAllUsersQuery,
} from "@/redux/features/admin/admin.api";
import {
  Users,
  UserCheck,
  UserPlus,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  PlusCircle,
  MinusCircle,
  CreditCard,
  Loader2,
} from "lucide-react";

const AdminOverview = () => {
  const { data: usersData, isLoading: usersLoading } =
    useAllUsersQuery(undefined);
  const { data: transactionsData, isLoading: transactionsLoading } =
    useAllTransactionsQuery(undefined);

  if (usersLoading || transactionsLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2 className="animate-spin h-10 w-10 text-primary" />
      </div>
    );
  }

  const users = usersData?.data || [];
  const transactions = transactionsData?.data?.data || [];

  const totalUsers = users.filter((u) => u.role === "USER").length;
  const totalAgents = users.filter((u) => u.role === "AGENT").length;
  const totalAdmins = users.filter((u) => u.role === "ADMIN").length;
  const totalTransactions = transactions.length;
  const totalVolume = transactions.reduce(
    (acc, tx) => acc + (tx.amount || 0),
    0
  );

  const latestTransactions = [...transactions]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const typeColor = (type) => {
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

  const typeIcon = (type) => {
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

  const statusColor = (status) =>
    status === "COMPLETED"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700";

  const cardData = [
    {
      title: "Total Users",
      value: totalUsers,
      icon: <Users className="w-6 h-6" />,
    },
    {
      title: "Total Agents",
      value: totalAgents,
      icon: <UserCheck className="w-6 h-6" />,
    },
    {
      title: "Total Admins",
      value: totalAdmins,
      icon: <UserPlus className="w-6 h-6" />,
    },
    {
      title: "Transactions",
      value: totalTransactions,
      icon: <TrendingUp className="w-6 h-6" />,
    },
    {
      title: "Total Volume",
      value: `${totalVolume.toLocaleString()} BDT`,
      icon: <DollarSign className="w-6 h-6" />,
    },
  ];

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-4xl font-bold text-foreground mb-4">
        Admin Overview
      </h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {cardData.map((card) => (
          <Card
            key={card.title}
            className="bg-gradient-to-tr from-white/70 to-white/30 backdrop-blur-md shadow-lg rounded-xl hover:scale-105 transition-transform duration-300"
          >
            <CardHeader className="flex items-center gap-2">
              {card.icon}
              <CardTitle className="text-lg font-semibold text-foreground">
                {card.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-foreground">{card.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Latest Transactions Table */}
      <div className="overflow-x-auto rounded-lg shadow-md">
        <Table className="min-w-full bg-white">
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Fee</TableHead>
              <TableHead>From → To</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {latestTransactions.map((tx) => (
              <TableRow
                key={tx._id}
                className="hover:bg-gray-100 transition-colors"
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminOverview;

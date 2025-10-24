import {
  useAllUsersQuery,
  useBlockOrActiveMutation,
} from "@/redux/features/admin/admin.api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ManageAgents = () => {
  const { data: userData, isLoading } = useAllUsersQuery(undefined);
  const [blockOrActive, { isLoading: isUpdating }] = useBlockOrActiveMutation();
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2 className="animate-spin h-10 w-10 text-primary" />
      </div>
    );
  }

  const agents = (userData?.data || []).filter((user) => user.role === "AGENT");

  const handleStatusChange = async (
    id: string,
    status: "APPROVED" | "SUSPENDED"
  ) => {
    setSelectedAgent(id);
    const payload = { agentId: id, status };

    try {
      // Call the API
      await blockOrActive(payload).unwrap();
      // console.log(res);
      // Show toast
      toast.success(
        `Agent ${status === "APPROVED" ? "approved" : "blocked"} successfully!`
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to update agent status.");
    } finally {
      setSelectedAgent(null);
    }
  };

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold text-foreground mb-6">Manage Agents</h1>

      <div className="overflow-x-auto rounded-lg shadow-md">
        <Table className="min-w-full bg-muted">
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead>Wallet ID</TableHead>
              <TableHead>Agent Name</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Balance</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Active/Block</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {agents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  No agents found.
                </TableCell>
              </TableRow>
            ) : (
              agents.map((agent) => (
                <TableRow
                  key={agent._id}
                  className="hover:bg-muted/50 transition-colors"
                >
                  <TableCell className="font-medium">{agent.wallet}</TableCell>
                  <TableCell className="font-medium">{agent.name}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {agent.phone}
                  </TableCell>
                  <TableCell className="text-foreground font-medium">
                    0 BDT
                  </TableCell>
                  <TableCell className="font-medium">
                    {agent.isActive}
                  </TableCell>
                  <TableCell className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleStatusChange(agent._id, "APPROVED")}
                      disabled={isUpdating && selectedAgent === agent._id}
                    >
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleStatusChange(agent._id, "SUSPENDED")}
                      disabled={isUpdating && selectedAgent === agent._id}
                    >
                      Block
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ManageAgents;

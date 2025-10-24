import {
  useAllUsersQuery,
  useUserBlockOrActiveMutation,
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

import { toast } from "sonner";
import { useState } from "react";
import type { User } from "@/types/user";

const ManageUsers = () => {
  const { data: userData, isLoading } = useAllUsersQuery(undefined);
  const [userBlockOrActive, { isLoading: isUpdating }] =
    useUserBlockOrActiveMutation();
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  if (isLoading || isUpdating) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2 className="animate-spin h-10 w-10 text-primary" />
      </div>
    );
  }

  // Filter only users with role "USER"
  const users: User[] = (userData?.data || []).filter(
    (user: User) => user.role === "USER"
  );

  // ACTIVE or BLOCKED"

  const handleStatusChange = async (
    id: string,
    status: "ACTIVE" | "BLOCKED"
  ) => {
    setSelectedUser(id);
    const payload = { userId: id, status };

    try {
      // Call the API
      await userBlockOrActive(payload).unwrap();
      // console.log(res);
      // Show toast
      toast.success(
        `user ${status === "ACTIVE" ? "activated" : "blocked"} successfully!`
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to update user status.");
    } finally {
      setSelectedUser(null);
    }

    console.log(id, status);
  };

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold text-foreground mb-6">Manage Users</h1>

      <div className="overflow-x-auto rounded-lg shadow-md">
        <Table className="min-w-full bg-muted">
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  No users found.
                </TableCell>
              </TableRow>
            ) : (
              users.map((user: User) => (
                <TableRow
                  key={user._id}
                  className="hover:bg-muted/50 transition-colors"
                >
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {user.phone}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {user.email}
                  </TableCell>
                  <TableCell className="font-medium">{user.isActive}</TableCell>
                  <TableCell className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleStatusChange(user._id, "ACTIVE")}
                      disabled={isUpdating && selectedUser === user._id}
                    >
                      Active
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleStatusChange(user._id, "BLOCKED")}
                      disabled={isUpdating && selectedUser === user._id}
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

export default ManageUsers;

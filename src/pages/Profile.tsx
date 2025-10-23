import { useState } from "react";
import {
  useUserInfoQuery,
  useUpdateUserMutation,
} from "@/redux/features/auth/auth.api";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { motion } from "motion/react";

const Profile = () => {
  const { data: currentUser, isLoading, refetch } = useUserInfoQuery(undefined);
  const [updateUser, { isLoading: updating }] = useUpdateUserMutation();
  const user = currentUser?.data;

  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState(user?.address || "");

  const handleUpdate = async () => {
    try {
      await updateUser({
        id: user?._id,
        data: { address },
      }).unwrap();

      toast.success("updated successfully!");
      setOpen(false);
      refetch();
    } catch (err) {
      console.error(err);
      toast.error(" Failed to update");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <Loader2 className="animate-spin h-8 w-8 text-foreground" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-[70vh] text-foreground">
        No user data found.
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center w-full py-10"
    >
      <Card className="w-full max-w-lg shadow-md border border-gray-200/50 backdrop-blur-md bg-white/10">
        <CardHeader className="flex flex-col items-center space-y-3">
          <CardTitle className="text-2xl font-semibold text-foreground">
            {user?.name}
          </CardTitle>

          <Badge
            variant={user?.isActive ? "default" : "secondary"}
            className="text-sm"
          >
            {user?.isActive ? "Active" : "Inactive"}
          </Badge>
        </CardHeader>

        <CardContent className="space-y-4 px-6 py-4">
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="font-medium">{user?.email}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Phone</p>
            <p className="font-medium">{user?.phone}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Role</p>
            <p className="font-medium capitalize">{user?.role}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Address</p>
            <p className="font-medium">
              {user?.address || "No address provided"}
            </p>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <p>Verified:</p>
              <p className="font-medium text-green-600">
                {user?.isVerified ? "Yes" : "No"}
              </p>
            </div>
            <div>
              <p>Deleted:</p>
              <p className="font-medium text-red-600">
                {user?.isDeleted ? "Yes" : "No"}
              </p>
            </div>
            {user?.wallet && (
              <div>
                <p>Wallet:</p>
                <p className="font-medium text-gray-700">
                  {user?.wallet ? user?.wallet : "Not Applicable"}
                </p>
              </div>
            )}
          </div>

          <Separator />

          <div className="flex justify-center items-center mt-4">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="px-6">Update</Button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-[425px] rounded-xl">
                <DialogHeader>
                  <DialogTitle className="text-lg font-semibold">
                    Update Address
                  </DialogTitle>
                  <DialogDescription className="text-sm text-muted-foreground">
                    Enter your new address below and click save to update.
                  </DialogDescription>
                </DialogHeader>

                <div className="py-4">
                  <Input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter new address"
                  />
                </div>

                <DialogFooter className="flex justify-end space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => setOpen(false)}
                    disabled={updating}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleUpdate}
                    disabled={updating || !address}
                  >
                    {updating ? (
                      <Loader2 className="animate-spin h-4 w-4 mr-2" />
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Profile;

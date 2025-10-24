import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Wallet, Loader2, Info } from "lucide-react";
import { useAddMoneyMutation } from "@/redux/features/user/user.api";
import type { DepositData, DepositResponse } from "@/types";

const Deposit = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState<string>("");
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [transactionData, setTransactionData] = useState<DepositData | null>(
    null
  );

  const [addMoney, { isLoading }] = useAddMoneyMutation();

  const handleDeposit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!amount || Number(amount) <= 0) {
      toast.error("Please enter a valid amount greater than 0.");
      return;
    }

    try {
      const res: DepositResponse = await addMoney({
        amount: Number(amount),
      }).unwrap();
      setTransactionData(res.data);
      setShowDialog(true);
      setAmount("");
      toast.success("Deposit Successful 💰", {
        description: `You’ve successfully added ${amount} BDT to your wallet.`,
      });
    } catch (error) {
      toast.error("Deposit Failed", { description: "Something went wrong." });
      console.error(error);
    }
  };

  const handleDialogClose = () => {
    setShowDialog(false);
    navigate("/user/overview");
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <Card className="w-full max-w-md shadow-lg rounded-2xl border border-gray-200/50 backdrop-blur-md bg-white/10">
        <CardHeader className="flex flex-col items-center space-y-2">
          <Wallet className="w-10 h-10 text-primary" />
          <CardTitle className="text-xl font-semibold text-foreground">
            Add Money
          </CardTitle>
          <p className="text-sm text-muted-foreground text-center">
            Deposit funds into your wallet securely and instantly.
          </p>
          <div className="flex items-center text-xs text-muted-foreground gap-1 mt-1">
            <Info className="w-4 h-4" /> Only transfers to other users are
            allowed. Cannot send money to yourself or another agent. Transfer
            fee: 5%.
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleDeposit} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="amount" className="text-foreground">
                Amount (BDT)
              </Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full mt-2" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Deposit Now"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Success Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-green-600 flex items-center gap-2">
              <Wallet className="w-5 h-5" />
              Deposit Successful 🎉
            </DialogTitle>
            <DialogDescription>
              Your funds have been added to your wallet.
            </DialogDescription>
          </DialogHeader>

          {transactionData && (
            <div className="space-y-2 py-2 text-sm text-foreground">
              <p>
                <strong>Amount:</strong> {transactionData.balance} BDT
              </p>
              <p>
                <strong>Transaction ID:</strong> {transactionData._id}
              </p>
              <p>
                <strong>Status:</strong> {transactionData.status}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(transactionData.createdAt).toLocaleString()}
              </p>
            </div>
          )}

          <DialogFooter>
            <Button onClick={handleDialogClose} className="w-full">
              OK
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Deposit;

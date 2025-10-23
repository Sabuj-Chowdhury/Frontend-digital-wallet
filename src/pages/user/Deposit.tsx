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

import { Wallet, Loader2 } from "lucide-react";
import { useAddMoneyMutation } from "@/redux/features/user/user.api";
import type { DepositData, DepositResponse } from "@/types";

const Deposit = () => {
  const navigate = useNavigate();

  const [amount, setAmount] = useState<string>("");
  // const [note, setNote] = useState<string>("");
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [transactionData, setTransactionData] = useState<DepositData | null>(
    null
  );

  const [addMoney, { isLoading }] = useAddMoneyMutation();

  // -------------------- Handlers --------------------
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
      // setNote("");
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

  // -------------------- Render --------------------
  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <Card className="w-full max-w-md shadow-lg rounded-2xl">
        <CardHeader className="flex flex-col items-center space-y-2">
          <Wallet className="w-8 h-8 text-primary" />
          <CardTitle className="text-xl font-semibold text-foreground">
            Add Money
          </CardTitle>
          <p className="text-sm text-muted-foreground text-center">
            Deposit funds into your wallet securely and instantly.
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleDeposit} className="space-y-5">
            <div className="space-y-2">
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

            <div className="space-y-2">
              <Label htmlFor="note" className="text-foreground">
                Note (optional)
              </Label>
              <Input
                id="note"
                type="text"
                placeholder="Add a note or reference"
                // value={note}
                // onChange={(e) => setNote(e.target.value)}
              />
            </div>

            <Button type="submit" className="w-full mt-4" disabled={isLoading}>
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
            <DialogTitle className="text-green-600">
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

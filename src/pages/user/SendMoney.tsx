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

import { SendHorizonal, Loader2 } from "lucide-react";
import { useSendMoneyMutation } from "@/redux/features/user/user.api";
import type { SendMoneyResponse } from "@/types/wallet";

const SendMoney = () => {
  const navigate = useNavigate();

  const [receiverPhone, setReceiverPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [transactionData, setTransactionData] =
    useState<SendMoneyResponse | null>(null);

  const [sendMoney, { isLoading }] = useSendMoneyMutation();

  // -------------------- Handlers --------------------
  const handleSendMoney = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!receiverPhone.trim() || !amount || Number(amount) <= 0) {
      toast.error("Please enter a valid phone number and amount.");
      return;
    }

    try {
      const res = await sendMoney({
        receiverPhone,
        amount: Number(amount),
      }).unwrap();

      setTransactionData(res);
      setShowDialog(true);
      setReceiverPhone("");
      setAmount("");

      toast.success("Money Sent Successfully 💸", {
        description: `You sent ${amount} BDT to ${receiverPhone}`,
      });
    } catch (error) {
      console.error("Send money error:", error);
      toast.error("Failed to send money. Please try again.");
    }
  };

  console.log(transactionData);

  const handleDialogClose = () => {
    setShowDialog(false);
    navigate("/user/overview");
  };

  // -------------------- Render --------------------
  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <Card className="w-full max-w-md shadow-lg rounded-2xl">
        <CardHeader className="flex flex-col items-center space-y-2">
          <SendHorizonal className="w-8 h-8 text-primary" />
          <CardTitle className="text-xl font-semibold text-foreground">
            Send Money
          </CardTitle>
          <p className="text-sm text-muted-foreground text-center">
            Transfer money instantly and securely to another user.
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSendMoney} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="receiverPhone" className="text-foreground">
                Receiver Phone Number
              </Label>
              <Input
                id="receiverPhone"
                type="text"
                placeholder="+8801XXXXXXXXX"
                value={receiverPhone}
                onChange={(e) => setReceiverPhone(e.target.value)}
                required
              />
            </div>

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

            <Button type="submit" className="w-full mt-4" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Send Now"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* ✅ Success Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-green-600">
              Transfer Successful 🎉
            </DialogTitle>
            <DialogDescription>
              Your money has been transferred successfully.
            </DialogDescription>
          </DialogHeader>

          {transactionData && (
            <div className="space-y-2 py-2 text-sm text-foreground">
              <p>
                <strong>Amount:</strong>{" "}
                {transactionData.data?.fee
                  ? `${
                      Number(transactionData.data?.amount) +
                      Number(transactionData.data?.fee)
                    } BDT (incl. fee)`
                  : `${transactionData.data?.amount} BDT`}
              </p>
              <p>
                <strong>Fee:</strong> {transactionData.data?.fee ?? 0} BDT
              </p>
              <p>
                <strong>Sender Wallet:</strong>{" "}
                {transactionData.data?.senderWallet?._id ?? "N/A"}
              </p>
              <p>
                <strong>Receiver Wallet:</strong>{" "}
                {transactionData.data?.receiverWallet?._id ?? "N/A"}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {transactionData.data?.status ?? "Success"}
              </p>
              {/* <p>
                <strong>Date:</strong>{" "}
                {transactionData.data?.createdAt
                  ? new Date(transactionData.data.createdAt).toLocaleString()
                  : "N/A"}
              </p> */}
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

export default SendMoney;

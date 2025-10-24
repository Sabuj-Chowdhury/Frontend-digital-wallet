import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import { Loader2, Banknote, Info } from "lucide-react";
import { useAgentCashOutMutation } from "@/redux/features/user/user.api";
import type { AgentCashInData, AgentCashInResponse } from "@/types";

// ✅ Validation Schema
const cashOutSchema = z.object({
  receiverPhone: z.string().min(11, "Agent phone number is required"),
  amount: z
    .number()
    .min(1, "Amount must be greater than 0")
    .positive("Enter a valid amount"),
});

type CashOutForm = z.infer<typeof cashOutSchema>;

const AgentCashOut = () => {
  const navigate = useNavigate();
  const [cashOut, { isLoading }] = useAgentCashOutMutation();
  const [result, setResult] = useState<AgentCashInData>();
  const [openDialog, setOpenDialog] = useState(false);

  const form = useForm<CashOutForm>({
    resolver: zodResolver(cashOutSchema),
    defaultValues: { receiverPhone: "", amount: 0 },
  });

  const onSubmit = async (data: CashOutForm) => {
    try {
      const res: AgentCashInResponse = await cashOut(data).unwrap();
      setResult(res?.data);
      setOpenDialog(true);
      toast.success("Cash-Out Successful 💵", {
        description: `You have successfully withdrawn ৳${data.amount}.`,
      });
      form.reset();
    } catch (error: any) {
      toast.error("Cash-Out Failed", {
        description: error?.data?.message || "Something went wrong.",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] px-4">
      <Card className="w-full max-w-md border border-border bg-muted/40 backdrop-blur-sm rounded-2xl shadow-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold flex items-center justify-center gap-2 text-foreground">
            <Banknote className="w-6 h-6 text-primary" />
            Agent Cash Out
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-2 flex items-center justify-center gap-1">
            <Info size={14} /> Withdraw funds from your wallet securely.
          </p>
        </CardHeader>

        <CardContent className="pt-2">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 text-sm"
          >
            {/* Agent Phone */}
            <div className="space-y-2">
              <Label className="text-foreground/80">User Phone</Label>
              <Input
                type="text"
                placeholder="+8801XXXXXXXXX"
                {...form.register("receiverPhone")}
                className="h-11 rounded-xl bg-background border border-border"
              />
              {form.formState.errors.receiverPhone && (
                <p className="text-red-500 text-xs">
                  {form.formState.errors.receiverPhone.message}
                </p>
              )}
            </div>

            {/* Amount */}
            <div className="space-y-2">
              <Label className="text-foreground/80">Amount (৳)</Label>
              <Input
                type="number"
                placeholder="Enter amount"
                {...form.register("amount", { valueAsNumber: true })}
                className="h-11 rounded-xl bg-background border border-border"
              />
              {form.formState.errors.amount && (
                <p className="text-red-500 text-xs">
                  {form.formState.errors.amount.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-11 rounded-xl text-base"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Cash Out"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* ✅ Success Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <DialogHeader>
              <DialogTitle className="text-green-600 text-xl flex items-center gap-2">
                ✅ Cash-Out Successful
              </DialogTitle>
              <DialogDescription>
                Funds have been successfully withdrawn from your account.
              </DialogDescription>
            </DialogHeader>

            {result && (
              <div className="space-y-2 mt-4 text-sm text-foreground/80">
                <p>
                  <strong>Amount:</strong> ৳{result.amount}
                </p>
                <p>
                  <strong>Agent:</strong> {result?.agent?.name} (
                  {result?.agent?.phone})
                </p>
                <p>
                  <strong>New Balance:</strong> ৳{result?.agentWallet?.balance}
                </p>
                {/* <p>
                  <strong>Total Cash-Out Done:</strong> ৳{result?.agentWallet?.cashOut}
                </p> */}
              </div>
            )}

            <DialogFooter className="mt-6">
              <Button
                className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl"
                onClick={() => {
                  setOpenDialog(false);
                  navigate("/agent/overview");
                }}
              >
                OK
              </Button>
            </DialogFooter>
          </motion.div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AgentCashOut;

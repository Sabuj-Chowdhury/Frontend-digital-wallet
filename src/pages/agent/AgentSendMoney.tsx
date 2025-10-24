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

import { Loader2, Send, Info } from "lucide-react";
import { useAgentSendMoneyMutation } from "@/redux/features/user/user.api";
import type { AgentCashInData, AgentCashInResponse } from "@/types";

// ✅ Validation Schema
const sendMoneySchema = z.object({
  receiverPhone: z
    .string()
    .min(11, "Receiver phone number is required")
    .regex(/^(\+8801|01)[0-9]{9}$/, "Enter a valid Bangladeshi number"),
  amount: z
    .number()
    .min(1, "Amount must be greater than 0")
    .positive("Enter a valid amount"),
});

type SendMoneyForm = z.infer<typeof sendMoneySchema>;

const AgentSendMoney = () => {
  const navigate = useNavigate();
  const [sendMoney, { isLoading }] = useAgentSendMoneyMutation();
  const [result, setResult] = useState<AgentCashInData>();
  const [openDialog, setOpenDialog] = useState(false);

  const form = useForm<SendMoneyForm>({
    resolver: zodResolver(sendMoneySchema),
    defaultValues: { receiverPhone: "", amount: 0 },
  });

  const onSubmit = async (data: SendMoneyForm) => {
    try {
      const res: AgentCashInResponse = await sendMoney(data).unwrap();
      setResult(res?.data);
      setOpenDialog(true);
      toast.success("Cash-In Successful 💸", {
        description: `You’ve successfully sent ৳${data.amount} to ${data.receiverPhone}.`,
      });
      form.reset();
    } catch (error: any) {
      toast.error("Cash-In Failed", {
        description: error?.data?.message || "Something went wrong.",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] px-4">
      <Card className="w-full max-w-md border border-border bg-muted/40 backdrop-blur-sm rounded-2xl shadow-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold flex items-center justify-center gap-2 text-foreground">
            <Send className="w-6 h-6 text-primary" />
            Agent Send Money
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-2 flex items-center justify-center gap-1">
            <Info size={14} />
            Only send to{" "}
            <span className="font-medium text-foreground">Users</span>, not
            other Agents.
            <br /> A 5% service fee applies.
          </p>
        </CardHeader>

        <CardContent className="pt-2">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 text-sm"
          >
            {/* Receiver Phone */}
            <div className="space-y-2">
              <Label className="text-foreground/80">Receiver Phone</Label>
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
                "Send Money"
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
                ✅ Cash-In Successful
              </DialogTitle>
              <DialogDescription>
                Funds have been successfully transferred to the user.
              </DialogDescription>
            </DialogHeader>

            {result && (
              <div className="space-y-2 mt-4 text-sm text-foreground/80">
                <p>
                  <strong>Amount:</strong> ৳{result.amount}
                </p>
                <p>
                  <strong>Receiver:</strong> {result?.user?.name} (
                  {result?.user?.phone})
                </p>
                <p>
                  <strong>Your New Balance:</strong> ৳
                  {result?.agentWallet?.balance}
                </p>
                <p>
                  <strong>Total Cash-In Done:</strong> ৳
                  {result?.agentWallet?.cashIn}
                </p>
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

export default AgentSendMoney;

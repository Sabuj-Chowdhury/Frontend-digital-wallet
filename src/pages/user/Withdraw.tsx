import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useWithdrawMoneyMutation } from "@/redux/features/user/user.api";
import { useNavigate } from "react-router";
import type { UserWithdrawData, UserWithdrawResponse } from "@/types";

const withdrawSchema = z.object({
  amount: z.number("Amount is required").min(1, "Amount must be at least 1"),
  agentPhone: z
    .string()
    .min(11, "Agent phone number is required")
    .regex(/^(\+8801|01)[0-9]{9}$/, "Enter valid Bangladeshi number"),
});

type WithdrawForm = z.infer<typeof withdrawSchema>;

const Withdraw = () => {
  const [withdrawMoney, { isLoading }] = useWithdrawMoneyMutation();
  const [result, setResult] = useState<UserWithdrawData>();
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  const form = useForm<WithdrawForm>({
    resolver: zodResolver(withdrawSchema),
    defaultValues: { amount: 0, agentPhone: "" },
  });

  const onSubmit = async (data: WithdrawForm) => {
    try {
      const res: UserWithdrawResponse = await withdrawMoney(data).unwrap();
      toast.success(res?.message || "Withdraw successful");
      setResult(res?.data);
      setOpenDialog(true);
      form.reset();
    } catch (err) {
      toast.error("Withdraw failed");
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-[80vh]">
        <Card className="w-full max-w-md border border-border shadow-lg rounded-2xl bg-muted/50 backdrop-blur-md">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-3xl font-light text-foreground flex items-center justify-center gap-2">
              💸 Withdraw Money
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6 pt-4">
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 text-sm"
            >
              {/* Amount */}
              <div className="space-y-2">
                <Label className="text-foreground/80">Amount</Label>
                <Input
                  type="number"
                  {...form.register("amount", { valueAsNumber: true })}
                  placeholder="Enter amount (৳)"
                  className="h-11 rounded-xl bg-background border border-border text-foreground"
                />
                {form.formState.errors.amount && (
                  <p className="text-red-500 text-xs">
                    {form.formState.errors.amount.message}
                  </p>
                )}
              </div>

              {/* Agent Phone */}
              <div className="space-y-2">
                <Label className="text-foreground/80">Agent Phone</Label>
                <Input
                  type="text"
                  {...form.register("agentPhone")}
                  placeholder="+8801XXXXXXXXX"
                  className="h-11 rounded-xl bg-background border border-border text-foreground"
                />
                {form.formState.errors.agentPhone && (
                  <p className="text-red-500 text-xs">
                    {form.formState.errors.agentPhone.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-11 text-base rounded-xl"
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Withdraw
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/*  Success Dialog */}
      <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
        <AlertDialogDescription className="sr-only">
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </AlertDialogDescription>
        <AlertDialogContent className="sm:max-w-md rounded-2xl p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <AlertDialogHeader>
              <AlertDialogTitle className="text-xl text-green-700 font-medium flex items-center gap-2">
                🎉 Withdrawal Successful
              </AlertDialogTitle>
            </AlertDialogHeader>

            <div className="mt-4 text-sm space-y-2 text-foreground/80">
              <p>
                <strong>Amount:</strong> ৳{result?.amount}
              </p>
              <p>
                <strong>Fee:</strong> ৳{result?.fee}
              </p>
              <p>
                <strong>Your New Balance:</strong> ৳
                {result?.userWallet?.balance}
              </p>
              {/* <p>
                <strong>Agent Balance:</strong> ৳{result?.agentWallet?.balance}
              </p> */}
              <p>
                <strong>Agent:</strong> {result?.agent?.name} (
                {result?.agent?.phone})
              </p>
            </div>

            <AlertDialogFooter className="mt-6">
              <AlertDialogAction
                className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl"
                onClick={() => {
                  setOpenDialog(false);
                  navigate("/user/overview");
                }}
              >
                OK
              </AlertDialogAction>
            </AlertDialogFooter>
          </motion.div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Withdraw;

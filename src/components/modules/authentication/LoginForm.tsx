import { useState } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "react-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Eye, EyeOff } from "lucide-react";
import { useLoginMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";

//  Zod schema
const userSchema = z.object({
  phone: z
    .string()
    .regex(
      /^\+8801[3-9]\d{8}$/,
      "Enter a valid Bangladeshi phone number (e.g. +88017XXXXXXXX)"
    ),

  password: z.string().min(6, "Password must be at least 6 characters"),
});

export function LoginForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [showPassword, setShowPassword] = useState(false);
  const [login] = useLoginMutation();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof userSchema>) {
    try {
      const result = await login(values).unwrap();
      toast.success(result.message);
      // console.log(result);
      navigate("/");
    } catch (error) {
      toast.error("something went wrong!");
      console.log(error);
    }
    // console.log(values);
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Phone */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="+8801XXXXXXXXX"
                        type="tel"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="******"
                          {...field}
                        />
                      </FormControl>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1/2 -translate-y-1/2"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </Form>
        </CardContent>

        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link
            to="/registration"
            replace
            className="underline underline-offset-4"
          >
            Register
          </Link>
        </div>
      </Card>
    </div>
  );
}

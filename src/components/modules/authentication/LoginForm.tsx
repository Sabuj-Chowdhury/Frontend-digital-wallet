import { cn } from "@/lib/utils";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
        </CardHeader>
        <CardContent></CardContent>
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

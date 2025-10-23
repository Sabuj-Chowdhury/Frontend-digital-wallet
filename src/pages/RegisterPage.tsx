import Logo from "@/assets/icons/Logo";
import { RegisterForm } from "@/components/modules/authentication/RegisterForm";

export default function RegisterPage() {
  return (
    <div className=" flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex items-center gap-2 self-center font-medium">
          <div className=" text-primary-foreground flex size-10 items-center justify-center rounded-md">
            <Logo />
          </div>
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 transition duration-300">
            Digital Wallet
          </h1>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}

import Logo from "@/assets/icons/Logo";
import { AppSidebar } from "@/components/app-sidebar";

import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Link, Outlet } from "react-router";

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <div className="flex items-center justify-center gap-2">
            <Link to="/" className="text-foreground hover:text-primary/90">
              <Logo />
            </Link>
            <h1 className="text-2xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 transition duration-300">
              Digital Wallet
            </h1>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

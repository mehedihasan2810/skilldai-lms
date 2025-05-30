"use client";

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { SignOutDialog } from "../user-button/sign-out-dialog";
import { useState } from "react";
import { signOutAction } from "@/actions/auth";
import { toast } from "sonner";
export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  const [isSignoutDialogOpen, setIsSignoutDialogOpen] = useState(false);
  const handleOpenSignoutDialog = () => setIsSignoutDialogOpen(true);
  const handleCloseSignoutDialog = () => setIsSignoutDialogOpen(false);
  const { isMobile } = useSidebar();

  const router = useRouter();

  const handleSignOut: React.MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();

    try {
      const supabase = createClient();
      const res = await supabase.auth.signOut();

      if (res.error) throw new Error(res.error.message);

      router.refresh();
      router.replace("/");
    } catch (error) {
      console.error(error);
      alert("Error signing out");
    } finally {
      handleCloseSignoutDialog();
    }
  };

  const handleSignOut2 = async () => {
    const supabase = createClient();

    const res = await supabase.auth.signOut();

    if (res.error) throw new Error(res.error.message);

    router.refresh();
    router.replace("/");
  };

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">
                    {user.email.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="rounded-lg">
                      {user.email.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user.name}</span>
                    <span className="truncate text-xs">{user.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="flex items-center gap-2"
                onClick={() => {
                  toast.promise(handleSignOut2, {
                    loading: "Signing out...",
                    success: "Signed out successfully",
                    error: (error) => error.message,
                  });
                }}
              >
                <LogOut className="size-5" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>

      <SignOutDialog
        open={isSignoutDialogOpen}
        onOpenChange={setIsSignoutDialogOpen}
        handleSignOut={handleSignOut}
      />
    </>
  );
}

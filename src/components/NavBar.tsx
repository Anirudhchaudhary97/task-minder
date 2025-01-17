"use client";
import { Bell, LogOut, Settings } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useRouter } from "next/navigation";

export default function NavBar() {
  const router = useRouter();
  const handleLogout = () => {
    router.push("/login");
  };
  return (
    <nav className="w-full flex justify-end max-w-6xl pt-6 pb-4 border-b ">
      <div className="flex gap-5 items-center">
        {/* Notification Icon */}
        <Bell />

        {/* User Avatar */}
        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-full">
            <Avatar className="hover:cursor-pointer">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="Avatar Image"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Settings />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut />
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}

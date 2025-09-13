import React, { use } from "react";
import type { Workspace } from "@/types";
import { useAuth } from "@/provider/auth-context";
import { Button } from "../ui/button";
import { Bell } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { Link } from "react-router";

interface HeaderProps {
  onWorkspaceSelected: (workspace: Workspace) => void;
  selectedWorkspace: Workspace | null;
  onCreateWorkspace: () => void;
}

function Header({
  onWorkspaceSelected,
  selectedWorkspace,
  onCreateWorkspace,
}: HeaderProps) {
  const { user, logout } = useAuth();

  return (
    <div className="bg-background sticky top-0 z-40 border-b">
      <div className="flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
        <div></div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Bell />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="rounded-full border p-1 w-8 h-8">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={user?.profilePicture} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {user?.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to="/user/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>Log Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}

export default Header;

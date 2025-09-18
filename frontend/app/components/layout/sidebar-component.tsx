import { useState } from "react";
import type { Workspace } from "@/types";
import { ScrollArea } from "../ui/scroll-area";
import { useAuth } from "@/provider/auth-context";
import { Link } from "react-router";
import {
  CheckCircle2,
  LayoutDashboard,
  ListCheck,
  Settings,
  Users,
  Boxes,
  ChevronsRight,
  ChevronsLeft,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { SidebarNav } from "./sidebar-nav";

export const SidebarComponent = ({
  currentWorkspace,
}: {
  currentWorkspace: Workspace | null;
}) => {
  const { user, logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Workspaces",
      href: "/workspaces",
      icon: Users,
    },
    {
      title: "My Tasks",
      href: "/my-tasks",
      icon: ListCheck, // fixed spelling
    },
    {
      title: "Members",
      href: "/members",
      icon: Users,
    },
    {
      title: "Achieved",
      href: "/achieved",
      icon: CheckCircle2,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ];

  return (
    <div
      className={cn(
        "flex flex-col border-r bg-sidebar transition-all duration-300",
        isCollapsed ? "w-16 md:w-[86px]" : "w-16 md:w-[240px]" // fixed bracket
      )}
    >
      <div className="flex h-14 items-center border-b px-4 mb-4 gap-2 justify-center">
        <Link to="/dashboard" className="flex items-center">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <Boxes className="size-6 text-blue-600" />
              <span className="font-semibold text-lg hidden md:block">
                WorkHub
              </span>
            </div>
          )}

          {isCollapsed && <Boxes className="size-6 text-blue-600" />}
        </Link>

        <Button
          variant={"ghost"}
          size="icon"
          className="ml-auto hidden md:block"
          onClick={() => setIsCollapsed(!isCollapsed)}
          style={{ paddingLeft:"9px" }}
        >
          {isCollapsed ? (
            <ChevronsRight className="size-4" />
          ) : (
            <ChevronsLeft className="size-4" />
          )}
        </Button>
      </div>
      <ScrollArea className="flex-1 px-3 py-2">
        <SidebarNav
          items={navItems}
          isCollapsed={isCollapsed}
          className={cn(isCollapsed && "items-center space-y-2")}
          currentWorkspace={currentWorkspace}
        />
      </ScrollArea>
      <div>
        <Button
          variant={"ghost"}
          size={isCollapsed ? "icon" : "default"}
          onClick={logout}
        >
          <LogOut className={cn("size-4", isCollapsed && "mr-2")} />
          <span className="hidden md:block">Logout</span>
        </Button>
      </div>
    </div>
  );
};

export default SidebarComponent;

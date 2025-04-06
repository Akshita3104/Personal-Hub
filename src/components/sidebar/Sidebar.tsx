
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Calendar, 
  Clock, 
  Kanban, 
  Notes
} from "lucide-react";

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const NavItem = ({ href, icon, label, isActive }: NavItemProps) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
        isActive 
          ? "bg-dashboard-lightpurple text-dashboard-purple" 
          : "hover:bg-dashboard-lightpurple/50 text-slate-600"
      )}
    >
      <div className={cn(
        "h-5 w-5",
        isActive ? "text-dashboard-purple" : "text-slate-400"
      )}>
        {icon}
      </div>
      <span>{label}</span>
    </Link>
  );
};

export const Sidebar = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const navigation = [
    {
      href: "/",
      icon: <Clock className="h-5 w-5" />,
      label: "Dashboard",
    },
    {
      href: "/calendar",
      icon: <Calendar className="h-5 w-5" />,
      label: "Calendar",
    },
    {
      href: "/todo",
      icon: <Kanban className="h-5 w-5" />,
      label: "Tasks",
    },
    {
      href: "/notes",
      icon: <Notes className="h-5 w-5" />,
      label: "Notes",
    },
  ];

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-white">
      <div className="p-4">
        <h2 className="text-xl font-semibold text-dashboard-blue">
          Personal Hub
        </h2>
      </div>
      <div className="flex-1 px-3 py-4">
        <nav className="space-y-2">
          {navigation.map((item) => (
            <NavItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={item.label}
              isActive={
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href)
              }
            />
          ))}
        </nav>
      </div>
      <div className="border-t p-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-dashboard-blue text-white flex items-center justify-center">
            <span className="text-sm font-medium">U</span>
          </div>
          <div>
            <p className="text-sm font-medium">User</p>
            <p className="text-xs text-slate-500">user@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

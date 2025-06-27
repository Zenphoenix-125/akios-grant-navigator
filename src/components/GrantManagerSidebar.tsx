
import { ChevronLeft } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useLocation, Link } from "react-router-dom";

const menuItems = [
  {
    title: "Grant Discovery",
    url: "/",
    isActive: true
  },
  {
    title: "Applications",
    url: "/applications", 
    isActive: false
  },
  {
    title: "Deadlines",
    url: "/deadlines",
    isActive: false
  },
  {
    title: "Document Vault",
    url: "/documents",
    isActive: false
  },
];

export function GrantManagerSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const isActiveRoute = (url: string) => {
    if (url === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(url);
  };

  return (
    <Sidebar className="border-r border-border/25 bg-background/98 backdrop-blur-sm overflow-hidden">
      <SidebarHeader className="border-b border-border/15 p-6 pb-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center shadow-lg">
              <span className="text-primary-foreground font-bold text-sm">A</span>
            </div>
            {!isCollapsed && (
              <div>
                <h2 className="text-base font-bold text-foreground">AKIOS</h2>
                <p className="text-xs text-tribal-amber font-semibold">Grant Manager</p>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-accent/30 rounded-lg"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <ChevronLeft 
              className={`h-4 w-4 transition-transform ${isCollapsed ? 'rotate-180' : ''}`} 
            />
          </Button>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="py-6 overflow-y-auto overflow-x-hidden">
        <SidebarGroup>
          <SidebarGroupLabel className="akios-sidebar-section-header">
            {!isCollapsed && "MANAGEMENT"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link 
                      to={item.url} 
                      className={`akios-nav-item-clean ${isActiveRoute(item.url) ? 'akios-nav-item-active-clean' : ''}`}
                    >
                      {!isCollapsed && (
                        <div className="flex-1 min-w-0">
                          <div className="akios-nav-title-clean">
                            {item.title}
                          </div>
                        </div>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-6 border-t border-border/15">
        <div className="flex items-center justify-center">
          <div className="akios-tribal-watermark text-center">
            {!isCollapsed && (
              <div className="text-xs font-semibold text-muted-foreground/80">
                Saginaw Chippewa
              </div>
            )}
            <div className="w-10 h-0.5 bg-tribal-amber/30 mx-auto mt-3 rounded-full"></div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

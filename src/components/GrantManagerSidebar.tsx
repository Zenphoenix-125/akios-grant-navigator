
import { 
  Search, 
  FileText, 
  Calendar, 
  FolderOpen, 
  Calculator,
  Users,
  ChevronLeft
} from "lucide-react";
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

const menuItems = [
  {
    title: "Grant Discovery",
    url: "#discovery",
    description: "Find opportunities",
    isActive: true
  },
  {
    title: "Applications",
    url: "#applications", 
    description: "Track submissions",
    isActive: false
  },
  {
    title: "Deadlines",
    url: "#deadlines",
    description: "Timeline view",
    isActive: false
  },
  {
    title: "Document Vault",
    url: "#documents",
    description: "File storage",
    isActive: false
  },
  {
    title: "Budget Tools",
    url: "#budget",
    description: "Cost analysis",
    isActive: false
  },
  {
    title: "Team & Access",
    url: "#team",
    description: "User management",
    isActive: false
  },
];

export function GrantManagerSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <Sidebar className="border-r border-border/20 bg-background/95 backdrop-blur-sm">
      <SidebarHeader className="border-b border-border/10 p-6 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center shadow-sm">
              <span className="text-primary-foreground font-bold text-sm">A</span>
            </div>
            {!isCollapsed && (
              <div>
                <h2 className="text-base font-semibold text-foreground">AKIOS</h2>
                <p className="text-xs text-tribal-amber font-medium">Grant Manager</p>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 hover:bg-accent/20"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <ChevronLeft 
              className={`h-3.5 w-3.5 transition-transform ${isCollapsed ? 'rotate-180' : ''}`} 
            />
          </Button>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="py-6">
        <SidebarGroup>
          <SidebarGroupLabel className="akios-sidebar-section-header">
            {!isCollapsed && "MANAGEMENT"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    className={`akios-nav-item ${item.isActive ? 'akios-nav-item-active' : ''}`}
                  >
                    <a href={item.url} className="flex items-center w-full">
                      {!isCollapsed && (
                        <div className="flex-1 min-w-0">
                          <div className="akios-nav-title">
                            {item.title}
                          </div>
                          <div className="akios-nav-description">
                            {item.description}
                          </div>
                        </div>
                      )}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-border/10">
        <div className="flex items-center justify-center">
          <div className="akios-tribal-watermark text-center">
            {!isCollapsed && (
              <div className="text-xs font-medium text-muted-foreground/60">
                Saginaw Chippewa
              </div>
            )}
            <div className="w-8 h-0.5 bg-tribal-amber/20 mx-auto mt-2 rounded-full"></div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

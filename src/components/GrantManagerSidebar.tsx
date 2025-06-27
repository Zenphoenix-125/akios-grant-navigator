
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
    icon: Search,
    description: "Find opportunities",
    isActive: true
  },
  {
    title: "Applications",
    url: "#applications", 
    icon: FileText,
    description: "Track submissions",
    isActive: false
  },
  {
    title: "Deadlines",
    url: "#deadlines",
    icon: Calendar,
    description: "Timeline view",
    isActive: false
  },
  {
    title: "Document Vault",
    url: "#documents",
    icon: FolderOpen,
    description: "File storage",
    isActive: false
  },
  {
    title: "Budget Tools",
    url: "#budget",
    icon: Calculator,
    description: "Cost analysis",
    isActive: false
  },
  {
    title: "Team & Access",
    url: "#team",
    icon: Users,
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
      
      <SidebarContent className="py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="sidebar-section-header">
            {!isCollapsed && "MANAGEMENT"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    className={`nav-item ${item.isActive ? 'nav-item-active' : ''}`}
                  >
                    <a href={item.url} className="flex items-center space-x-3 w-full">
                      <item.icon className="functional-icon flex-shrink-0" />
                      {!isCollapsed && (
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium">
                            {item.title}
                          </div>
                          <div className="text-xs text-muted-foreground/70 leading-tight">
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
          <div className="tribal-watermark text-center">
            {!isCollapsed && (
              <div className="text-xs font-medium">
                Saginaw Chippewa
              </div>
            )}
            <div className="w-8 h-0.5 bg-tribal-amber/20 mx-auto mt-1 rounded-full"></div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

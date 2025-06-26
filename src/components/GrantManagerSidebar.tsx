
import { 
  Search, 
  FileText, 
  Calendar, 
  FolderOpen, 
  Calculator,
  Users
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
} from "@/components/ui/sidebar";

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
    title: "Team & Roles",
    url: "#team",
    icon: Users,
    description: "Access control",
    isActive: false
  },
];

export function GrantManagerSidebar() {
  return (
    <Sidebar className="border-r border-border/30">
      <SidebarHeader className="border-b border-border/30 p-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">A</span>
          </div>
          <div>
            <h2 className="text-base font-semibold text-foreground">AKIOS</h2>
            <p className="text-xs text-tribal-amber font-medium">Grant Manager</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground text-xs uppercase tracking-wider font-medium mb-3">
            Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    className={`nav-item ${item.isActive ? 'nav-item-active' : ''}`}
                  >
                    <a href={item.url} className="flex items-center space-x-3">
                      <item.icon className="functional-icon" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium">
                          {item.title}
                        </div>
                        <div className="text-xs text-muted-foreground/80">
                          {item.description}
                        </div>
                      </div>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

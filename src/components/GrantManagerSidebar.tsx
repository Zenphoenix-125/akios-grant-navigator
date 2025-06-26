
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
    description: "Find new opportunities"
  },
  {
    title: "Applications",
    url: "#applications", 
    icon: FileText,
    description: "Track submissions"
  },
  {
    title: "Deadlines",
    url: "#deadlines",
    icon: Calendar,
    description: "Manage timeline"
  },
  {
    title: "Document Vault",
    url: "#documents",
    icon: FolderOpen,
    description: "Store & organize"
  },
  {
    title: "Budget Tools",
    url: "#budget",
    icon: Calculator,
    description: "Calculate matches"
  },
  {
    title: "Team & Roles",
    url: "#team",
    icon: Users,
    description: "Manage access"
  },
];

export function GrantManagerSidebar() {
  return (
    <Sidebar className="border-r border-border/50">
      <SidebarHeader className="border-b border-border/50 p-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">A</span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">AKIOS</h2>
            <p className="text-xs text-tribal-amber font-medium">Grant Manager</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground text-xs uppercase tracking-wider font-medium mb-4">
            Grant Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    className="hover:bg-accent/50 transition-colors duration-200 rounded-lg p-3 group"
                  >
                    <a href={item.url} className="flex items-center space-x-3">
                      <item.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                          {item.title}
                        </div>
                        <div className="text-xs text-muted-foreground">
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

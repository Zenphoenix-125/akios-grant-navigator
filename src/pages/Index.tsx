
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { GrantManagerSidebar } from "@/components/GrantManagerSidebar";
import { PerformanceDashboard } from "@/components/PerformanceDashboard";
import { GrantFilters } from "@/components/GrantFilters";
import { GrantDiscoveryCard } from "@/components/GrantDiscoveryCard";
import { ApplicationTracker } from "@/components/ApplicationTracker";
import { Button } from "@/components/ui/button";
import { Plus, Bell, Settings, FileDown } from "lucide-react";

// Mock grant data
const mockGrants = [
  {
    title: "Tribal Health Services Expansion Grant",
    agency: "Health Resources and Services Administration (HRSA)",
    amount: "$750,000",
    deadline: "Aug 15, 2024",
    matchScore: 94,
    category: "Health",
    matchRequired: true,
    daysLeft: 12
  },
  {
    title: "Native Language Preservation Initiative",
    agency: "National Endowment for the Arts",
    amount: "$125,000",
    deadline: "Sep 1, 2024",
    matchScore: 87,
    category: "Cultural",
    matchRequired: false,
    daysLeft: 28
  },
  {
    title: "Rural Infrastructure Development Program",
    agency: "Department of Transportation",
    amount: "$2,500,000",
    deadline: "Oct 30, 2024",
    matchScore: 76,
    category: "Infrastructure",
    matchRequired: true,
    daysLeft: 87
  },
  {
    title: "Educational Technology Enhancement Grant",
    agency: "Department of Education",
    amount: "$450,000",
    deadline: "Jul 20, 2024",
    matchScore: 82,
    category: "Education",
    matchRequired: false,
    daysLeft: 7
  }
];

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background relative overflow-hidden">
        {/* Subtle tribal pattern overlay */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-tribal-amber/20 via-transparent to-primary/10" />
        </div>
        
        <GrantManagerSidebar />
        
        <main className="flex-1 overflow-hidden relative z-10">
          <div className="h-full flex flex-col">
            {/* Enhanced Header */}
            <header className="border-b border-border/30 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
              <div className="flex items-center justify-between p-6">
                <div className="flex items-center space-x-4">
                  <SidebarTrigger className="lg:hidden" />
                  <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                      Grant Discovery
                    </h1>
                    <p className="text-muted-foreground mt-1">
                      Saginaw Chippewa Indian Tribe • <span className="text-tribal-amber font-medium">FY 2024</span>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Button size="sm" variant="outline" className="bg-background/60 backdrop-blur-sm border-border/40 hover:border-primary/40">
                    <FileDown className="w-4 h-4 mr-2" />
                    Export PDF
                  </Button>
                  <Button size="sm" className="bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90 shadow-lg hover:shadow-primary/30 transition-all duration-300">
                    <Plus className="w-4 h-4 mr-2" />
                    New Application
                  </Button>
                  <Button variant="ghost" size="icon" className="hover:bg-primary/20">
                    <Bell className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="hover:bg-primary/20">
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </header>

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
              <div className="p-8 space-y-12 max-w-7xl mx-auto">
                {/* Performance Dashboard */}
                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-8 flex items-center">
                    Performance Overview
                    <div className="ml-3 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  </h2>
                  <PerformanceDashboard />
                </section>

                {/* Grant Discovery */}
                <section>
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-foreground">
                      Available Grants
                    </h2>
                    <div className="text-sm text-muted-foreground bg-background/60 backdrop-blur-sm px-4 py-2 rounded-full border border-border/30">
                      <span className="text-tribal-amber font-bold text-lg">{mockGrants.length}</span> opportunities found
                    </div>
                  </div>
                  
                  <div className="space-y-8">
                    <GrantFilters />
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {mockGrants.map((grant, index) => (
                        <GrantDiscoveryCard key={index} {...grant} />
                      ))}
                    </div>
                  </div>
                </section>

                {/* Application Tracker */}
                <section>
                  <ApplicationTracker />
                </section>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;

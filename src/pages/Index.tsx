
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { GrantManagerSidebar } from "@/components/GrantManagerSidebar";
import { PerformanceDashboard } from "@/components/PerformanceDashboard";
import { GrantFilters } from "@/components/GrantFilters";
import { GrantDiscoveryCard } from "@/components/GrantDiscoveryCard";
import { ApplicationTracker } from "@/components/ApplicationTracker";
import { Button } from "@/components/ui/button";
import { Plus, Bell, Settings } from "lucide-react";

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
      <div className="min-h-screen flex w-full bg-background">
        <GrantManagerSidebar />
        
        <main className="flex-1 overflow-hidden">
          <div className="h-full flex flex-col">
            {/* Header */}
            <header className="border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
              <div className="flex items-center justify-between p-6">
                <div className="flex items-center space-x-4">
                  <SidebarTrigger className="lg:hidden" />
                  <div>
                    <h1 className="text-2xl font-bold text-foreground">
                      Grant Discovery
                    </h1>
                    <p className="text-muted-foreground">
                      Saginaw Chippewa Indian Tribe • FY 2024
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    <Plus className="w-4 h-4 mr-2" />
                    New Application
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Bell className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </header>

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
              <div className="p-6 space-y-8">
                {/* Performance Dashboard */}
                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-6">
                    Performance Overview
                  </h2>
                  <PerformanceDashboard />
                </section>

                {/* Grant Discovery */}
                <section>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-foreground">
                      Available Grants
                    </h2>
                    <div className="text-sm text-muted-foreground">
                      <span className="text-tribal-amber font-medium">{mockGrants.length}</span> opportunities found
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <GrantFilters />
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

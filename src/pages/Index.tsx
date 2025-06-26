
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { GrantManagerSidebar } from "@/components/GrantManagerSidebar";
import { PerformanceDashboard } from "@/components/PerformanceDashboard";
import { GrantFilters } from "@/components/GrantFilters";
import { GrantDiscoveryCard } from "@/components/GrantDiscoveryCard";
import { ApplicationTracker } from "@/components/ApplicationTracker";
import { Button } from "@/components/ui/button";
import { Plus, Bell, Settings, FileDown, Calendar, Lightbulb } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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

const aiSuggestions = [
  {
    title: "EPA Environmental Justice Grant",
    matchScore: 92,
    amount: "$300,000",
    reason: "Perfect match for environmental sovereignty initiatives",
    tags: ["Sovereignty", "Environmental Justice"],
    tribalCategory: "Water Access"
  },
  {
    title: "USDA Rural Development Grant",
    matchScore: 88,
    amount: "$180,000", 
    reason: "Aligns with community infrastructure needs",
    tags: ["Infrastructure", "Community Development"],
    tribalCategory: "Cultural Revitalization"
  }
];

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background relative overflow-hidden">
        {/* Enhanced tribal pattern overlay */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none animate-fade-in">
          <div className="absolute inset-0 bg-gradient-to-br from-tribal-amber/10 via-transparent to-primary/5" />
          {/* Subtle tribal geometric pattern with animation */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 border border-tribal-amber/5 rotate-45 rounded-lg animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 border border-primary/5 rotate-12 rounded-full animate-pulse" />
          <div className="absolute top-1/2 right-1/3 text-6xl opacity-[0.02] animate-pulse">🪶</div>
        </div>
        
        <GrantManagerSidebar />
        
        <div className="flex-1 flex">
          <main className="flex-1 overflow-hidden relative z-10">
            <div className="h-full flex flex-col">
              {/* Enhanced Header */}
              <header className="border-b border-border/30 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
                <div className="flex items-center justify-between p-6">
                  <div className="flex items-center space-x-4">
                    <SidebarTrigger className="lg:hidden hover:scale-110 transition-transform" />
                    <div>
                      <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                        Grant Discovery
                      </h1>
                      <p className="text-muted-foreground mt-1">
                        Saginaw Chippewa Indian Tribe • <span className="text-tribal-amber font-medium animate-pulse">FY 2024</span>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="bg-background/60 backdrop-blur-sm border-border/40 hover:border-tribal-amber/60 hover:bg-tribal-amber/10 transition-all duration-300 executive-brief-btn group hover:scale-105 active:scale-95"
                      title="Generate executive summary report"
                    >
                      <FileDown className="w-4 h-4 mr-2 group-hover:animate-bounce" />
                      Executive Brief PDF
                    </Button>
                    <Button size="sm" className="bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90 shadow-lg hover:shadow-primary/30 transition-all duration-300 magnetic-button relative overflow-hidden hover:scale-105 active:scale-95">
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                      <Plus className="w-4 h-4 mr-2 relative z-10" />
                      <span className="relative z-10">New Application</span>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="hover:bg-primary/20 hover:scale-110 transition-all duration-300"
                      title="Toggle calendar view"
                    >
                      <Calendar className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="hover:bg-primary/20 hover:scale-110 transition-all duration-300">
                      <Bell className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="hover:bg-primary/20 hover:scale-110 transition-all duration-300">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </header>

              {/* Main Content */}
              <div className="flex-1 overflow-auto">
                <div className="flex">
                  <div className="flex-1 p-8 space-y-12 max-w-6xl">
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
                        <div className="text-sm text-muted-foreground bg-background/60 backdrop-blur-sm px-4 py-2 rounded-full border border-border/30 hover:scale-105 transition-transform">
                          <span className="text-tribal-amber font-bold text-lg animate-pulse">{mockGrants.length}</span> opportunities found
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

                  {/* Enhanced AI Suggestions Panel */}
                  <aside className="w-80 p-6 border-l border-border/30 bg-background/40 backdrop-blur-xl">
                    <div className="sticky top-24 space-y-6">
                      <div className="flex items-center space-x-2 mb-4">
                        <Lightbulb className="w-5 h-5 text-tribal-amber animate-pulse" />
                        <h3 className="text-lg font-semibold text-foreground">AI Suggestions</h3>
                        <Badge className="bg-tribal-amber/20 text-tribal-amber text-xs border-tribal-amber/40 animate-bounce">
                          Akios AI
                        </Badge>
                      </div>
                      
                      <div className="space-y-4">
                        {aiSuggestions.map((suggestion, index) => (
                          <div key={index} className={`p-4 backdrop-blur-sm border rounded-lg transition-all duration-500 hover:scale-[1.02] cursor-pointer group ${
                            suggestion.matchScore >= 90 
                              ? 'bg-gradient-to-br from-tribal-amber/10 to-green-500/10 border-tribal-amber/40 hover:border-tribal-amber/60 hover:shadow-tribal-amber/20 hover:shadow-lg' 
                              : 'bg-card/40 border-border/30 hover:border-primary/40'
                          }`}>
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-medium text-foreground text-sm line-clamp-2 group-hover:text-primary/90 transition-colors">{suggestion.title}</h4>
                              <Badge className={`text-xs ml-2 transition-transform group-hover:scale-110 ${
                                suggestion.matchScore >= 90 
                                  ? 'bg-green-500/20 text-green-400 animate-pulse' 
                                  : 'bg-tribal-amber/20 text-tribal-amber'
                              }`}>
                                {suggestion.matchScore}%
                              </Badge>
                            </div>
                            
                            {/* Tribal category tags */}
                            <div className="flex flex-wrap gap-1 mb-3">
                              {suggestion.tags.map((tag, tagIndex) => (
                                <Badge key={tagIndex} variant="outline" className="text-xs px-2 py-0.5 border-tribal-amber/30 text-tribal-amber/80 hover:bg-tribal-amber/10 transition-colors">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            
                            <p className="text-xs text-muted-foreground mb-3 group-hover:text-muted-foreground/90 transition-colors">{suggestion.reason}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-semibold text-tribal-amber group-hover:animate-pulse">{suggestion.amount}</span>
                              <Button size="sm" variant="ghost" className="text-xs h-7 px-2 hover:bg-primary/20 hover:scale-105 transition-all duration-300">
                                View Details
                              </Button>
                            </div>
                            
                            {/* Subtle tribal accent */}
                            <div className="absolute top-2 right-2 text-sm opacity-20 group-hover:opacity-40 transition-opacity">
                              🪶
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="p-4 bg-gradient-to-br from-primary/10 to-blue-500/10 border border-primary/20 rounded-lg hover:scale-[1.02] transition-transform cursor-pointer group">
                        <h4 className="font-medium text-foreground mb-2 flex items-center">
                          <span className="mr-2 group-hover:animate-bounce">💡</span>
                          Pro Tip
                        </h4>
                        <p className="text-xs text-muted-foreground group-hover:text-muted-foreground/90 transition-colors">
                          Submit applications 2-3 weeks before the deadline for higher success rates.
                        </p>
                      </div>
                    </div>
                  </aside>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;

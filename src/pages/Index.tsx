
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { GrantManagerSidebar } from "@/components/GrantManagerSidebar";
import { PerformanceDashboard } from "@/components/PerformanceDashboard";
import { GrantFilters } from "@/components/GrantFilters";
import { GrantDiscoveryCard } from "@/components/GrantDiscoveryCard";
import { ApplicationTracker } from "@/components/ApplicationTracker";
import { Button } from "@/components/ui/button";
import { Plus, Bell, Settings, FileDown, Calendar, Lightbulb, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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
    tribalCategory: "Water Access",
    agency: "Environmental Protection Agency",
    deadline: "Sep 15, 2024",
    daysLeft: 42,
    category: "Environment",
    matchRequired: false
  },
  {
    title: "USDA Rural Development Grant",
    matchScore: 88,
    amount: "$180,000", 
    reason: "Aligns with community infrastructure needs",
    tags: ["Infrastructure", "Community Development"],
    tribalCategory: "Cultural Revitalization",
    agency: "U.S. Department of Agriculture",
    deadline: "Oct 1, 2024",
    daysLeft: 58,
    category: "Infrastructure",
    matchRequired: true
  }
];

const impactData = [
  { department: "Health", amount: "$1.2M", grants: 4, color: "bg-green-500" },
  { department: "Education", amount: "$890K", grants: 3, color: "bg-blue-500" },
  { department: "Infrastructure", amount: "$2.1M", grants: 2, color: "bg-tribal-amber" },
  { department: "Cultural", amount: "$450K", grants: 5, color: "bg-purple-500" }
];

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background relative overflow-hidden">
        {/* Subtle tribal pattern overlay */}
        <div className="absolute inset-0 opacity-[0.01] pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-tribal-amber/5 via-transparent to-primary/3" />
          <div className="absolute top-1/2 right-1/3 text-6xl opacity-[0.015]">🪶</div>
        </div>
        
        <GrantManagerSidebar />
        
        <div className="flex-1 flex">
          <main className="flex-1 overflow-hidden relative z-10">
            <div className="h-full flex flex-col">
              {/* Header */}
              <header className="border-b border-border/20 bg-background/90 backdrop-blur-sm sticky top-0 z-40">
                <div className="flex items-center justify-between p-6">
                  <div className="flex items-center space-x-4">
                    <SidebarTrigger className="lg:hidden transition-transform hover:scale-105" />
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
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="bg-background/60 backdrop-blur-sm border-border/40 hover:border-tribal-amber/40 hover:bg-tribal-amber/5 transition-all duration-200"
                      title="Generate executive summary report"
                    >
                      <FileDown className="w-4 h-4 mr-2" />
                      Executive Brief PDF
                    </Button>
                    <Button size="sm" className="bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90 shadow-md hover:shadow-lg transition-all duration-200">
                      <Plus className="w-4 h-4 mr-2" />
                      New Application
                    </Button>
                    <Button variant="ghost" size="icon" className="hover:bg-primary/10 transition-colors duration-200">
                      <Calendar className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="hover:bg-primary/10 transition-colors duration-200">
                      <Bell className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="hover:bg-primary/10 transition-colors duration-200">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </header>

              {/* Main Content */}
              <div className="flex-1 overflow-auto">
                <div className="max-w-7xl mx-auto p-8 space-y-10">
                  {/* Performance Dashboard */}
                  <section>
                    <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                      Performance Overview
                      <div className="ml-3 w-2 h-2 bg-green-400 rounded-full" />
                    </h2>
                    <PerformanceDashboard />
                  </section>

                  {/* Grant Discovery with Tabs */}
                  <section>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-foreground">
                        Grant Opportunities
                      </h2>
                      <div className="text-sm text-muted-foreground bg-background/60 backdrop-blur-sm px-4 py-2 rounded-full border border-border/20">
                        <span className="text-tribal-amber font-bold text-lg">{mockGrants.length + aiSuggestions.length}</span> opportunities found
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <GrantFilters />
                      
                      <Tabs defaultValue="all" className="w-full">
                        <TabsList className="grid w-full grid-cols-3 bg-background/50 backdrop-blur-sm border border-border/20">
                          <TabsTrigger value="all" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
                            All Grants ({mockGrants.length})
                          </TabsTrigger>
                          <TabsTrigger value="ai-recommended" className="data-[state=active]:bg-tribal-amber/10 data-[state=active]:text-tribal-amber">
                            <Sparkles className="w-4 h-4 mr-2" />
                            AI Recommended ({aiSuggestions.length})
                          </TabsTrigger>
                          <TabsTrigger value="impact" className="data-[state=active]:bg-green-500/10 data-[state=active]:text-green-400">
                            Impact Dashboard
                          </TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="all" className="space-y-6 mt-6">
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {mockGrants.map((grant, index) => (
                              <GrantDiscoveryCard key={index} {...grant} />
                            ))}
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="ai-recommended" className="space-y-6 mt-6">
                          <div className="mb-4 p-4 bg-gradient-to-r from-tribal-amber/10 to-primary/10 border border-tribal-amber/20 rounded-lg">
                            <div className="flex items-center space-x-2 mb-2">
                              <Lightbulb className="w-5 h-5 text-tribal-amber" />
                              <h3 className="text-lg font-semibold text-foreground">AI-Powered Grant Matching</h3>
                              <Badge className="bg-tribal-amber/20 text-tribal-amber text-xs border-tribal-amber/40">
                                Akios AI
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              These grants are specifically recommended based on your tribal priorities, past success patterns, and current capacity.
                            </p>
                          </div>
                          
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {aiSuggestions.map((suggestion, index) => (
                              <GrantDiscoveryCard key={index} {...suggestion} />
                            ))}
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="impact" className="space-y-6 mt-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {impactData.map((dept, index) => (
                              <Card key={index} className="bg-card/50 backdrop-blur-sm border border-border/30 hover:border-border/50 transition-colors duration-200">
                                <CardHeader className="pb-3">
                                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                                    <div className={`w-3 h-3 rounded-full ${dept.color} mr-2`} />
                                    {dept.department}
                                  </CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="text-2xl font-bold text-foreground mb-1">{dept.amount}</div>
                                  <p className="text-xs text-muted-foreground">{dept.grants} active grants</p>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                          
                          <Card className="bg-gradient-to-br from-primary/5 to-blue-500/5 border border-primary/20">
                            <CardHeader>
                              <CardTitle className="text-lg font-semibold text-foreground">Quick Tips</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                              <div className="flex items-start space-x-3">
                                <div className="w-2 h-2 bg-tribal-amber rounded-full mt-2" />
                                <div>
                                  <p className="text-sm font-medium text-foreground">Next Priority Deadline</p>
                                  <p className="text-xs text-muted-foreground">Educational Technology Grant - 7 days left</p>
                                </div>
                              </div>
                              <div className="flex items-start space-x-3">
                                <div className="w-2 h-2 bg-green-400 rounded-full mt-2" />
                                <div>
                                  <p className="text-sm font-medium text-foreground">High Success Rate</p>
                                  <p className="text-xs text-muted-foreground">Infrastructure grants have 82% success rate this year</p>
                                </div>
                              </div>
                              <div className="flex items-start space-x-3">
                                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2" />
                                <div>
                                  <p className="text-sm font-medium text-foreground">Pro Tip</p>
                                  <p className="text-xs text-muted-foreground">Submit applications 2-3 weeks before deadline for higher success rates</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </TabsContent>
                      </Tabs>
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
      </div>
    </SidebarProvider>
  );
};

export default Index;

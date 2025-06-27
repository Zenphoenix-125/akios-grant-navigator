
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { GrantManagerSidebar } from "@/components/GrantManagerSidebar";
import { PerformanceDashboard } from "@/components/PerformanceDashboard";
import { GrantFilters } from "@/components/GrantFilters";
import { GrantDiscoveryCard } from "@/components/GrantDiscoveryCard";
import { ApplicationTracker } from "@/components/ApplicationTracker";
import { Button } from "@/components/ui/button";
import { Plus, Bell, Settings, FileDown, Calendar, Sparkles } from "lucide-react";
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
  { department: "Health", amount: "$1.2M", grants: 4, submissions: 8, successRate: "75%", color: "bg-green-500" },
  { department: "Education", amount: "$890K", grants: 3, submissions: 5, successRate: "82%", color: "bg-blue-500" },
  { department: "Infrastructure", amount: "$2.1M", grants: 2, submissions: 4, successRate: "68%", color: "bg-tribal-amber" },
  { department: "Cultural", amount: "$450K", grants: 5, submissions: 9, successRate: "71%", color: "bg-purple-500" }
];

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background relative overflow-hidden">
        <GrantManagerSidebar />
        
        <div className="flex-1 flex">
          <main className="flex-1 overflow-hidden">
            <div className="h-full flex flex-col">
              {/* Header */}
              <header className="border-b border-border/20 bg-background/95 backdrop-blur-sm sticky top-0 z-40">
                <div className="akios-layout">
                  <div className="flex items-center justify-between py-6">
                    <div className="flex items-center space-x-4">
                      <SidebarTrigger className="lg:hidden" />
                      <div>
                        <h1 className="text-2xl font-bold text-foreground">
                          Grant Discovery
                        </h1>
                        <p className="text-muted-foreground text-sm mt-1">
                          Saginaw Chippewa Indian Tribe • <span className="text-tribal-amber font-medium">FY 2024</span>
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="bg-background/60 backdrop-blur-sm border-border/40 hover:border-tribal-amber/40"
                      >
                        <FileDown className="system-icon mr-2" />
                        Executive Brief
                      </Button>
                      <Button size="sm" className="akios-button-primary">
                        <Plus className="system-icon mr-2" />
                        New Application
                      </Button>
                      <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                        <Calendar className="system-icon" />
                      </Button>
                      <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                        <Bell className="system-icon" />
                      </Button>
                      <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                        <Settings className="system-icon" />
                      </Button>
                    </div>
                  </div>
                </div>
              </header>

              {/* Main Content */}
              <div className="flex-1 overflow-auto">
                <div className="akios-layout py-8">
                  <div className="akios-spacing-lg">
                    {/* Performance Dashboard */}
                    <section className="akios-section">
                      <h2 className="section-header">
                        Performance Overview
                        <div className="w-2 h-2 bg-green-400 rounded-full" />
                      </h2>
                      <PerformanceDashboard />
                    </section>

                    {/* Grant Discovery with Enhanced Tabs */}
                    <section className="akios-section">
                      <div className="flex items-center justify-between mb-8">
                        <h2 className="section-header">Grant Opportunities</h2>
                        <div className="text-sm text-muted-foreground bg-background/60 backdrop-blur-sm px-4 py-2 rounded-full border border-border/20">
                          <span className="text-tribal-amber font-semibold">{mockGrants.length + aiSuggestions.length}</span> opportunities
                        </div>
                      </div>
                      
                      <div className="akios-spacing-lg">
                        <GrantFilters />
                        
                        <Tabs defaultValue="all" className="w-full">
                          <div className="flex justify-center mb-8">
                            <TabsList className="bg-background/50 backdrop-blur-sm border border-border/20">
                              <TabsTrigger value="all" className="text-sm font-semibold px-6">
                                All Grants
                              </TabsTrigger>
                              <TabsTrigger value="ai-recommended" className="text-sm font-semibold px-6">
                                <Sparkles className="system-icon mr-2" />
                                AI Recommended
                              </TabsTrigger>
                              <TabsTrigger value="impact" className="text-sm font-semibold px-6">
                                Impact Dashboard
                              </TabsTrigger>
                            </TabsList>
                          </div>
                          
                          <TabsContent value="all">
                            <div className="akios-grid">
                              {mockGrants.map((grant, index) => (
                                <GrantDiscoveryCard key={index} {...grant} />
                              ))}
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="ai-recommended">
                            <div className="mb-6 p-6 bg-gradient-to-r from-tribal-amber/5 to-primary/5 border border-tribal-amber/20 rounded-xl max-w-4xl mx-auto">
                              <div className="flex items-center space-x-2 mb-3">
                                <h3 className="text-base font-semibold text-foreground">AI-Powered Matching</h3>
                                <Badge className="bg-tribal-amber/20 text-tribal-amber text-xs border-tribal-amber/40">
                                  Akios AI
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Recommendations based on tribal priorities and success patterns.
                              </p>
                            </div>
                            
                            <div className="akios-grid">
                              {aiSuggestions.map((suggestion, index) => (
                                <GrantDiscoveryCard key={index} {...suggestion} />
                              ))}
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="impact">
                            <div className="akios-stats-grid mb-8">
                              {impactData.map((dept, index) => (
                                <Card key={index} className="akios-card">
                                  <CardHeader className="pb-3">
                                    <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                                      <div className={`w-3 h-3 rounded-full ${dept.color} mr-2`} />
                                      {dept.department}
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="text-xl font-bold text-foreground mb-1">{dept.amount}</div>
                                    <p className="text-xs text-muted-foreground">{dept.grants} active grants</p>
                                  </CardContent>
                                </Card>
                              ))}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                              <Card className="akios-card border-green-500/20">
                                <CardHeader className="pb-3">
                                  <CardTitle className="text-sm font-semibold text-foreground">Top Funded</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="text-lg font-bold text-green-400 mb-1">Infrastructure</div>
                                  <p className="text-xs text-muted-foreground">$2.1M awarded</p>
                                </CardContent>
                              </Card>

                              <Card className="akios-card border-tribal-amber/20">
                                <CardHeader className="pb-3">
                                  <CardTitle className="text-sm font-semibold text-foreground">Most Active</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="text-lg font-bold text-tribal-amber mb-1">Cultural</div>
                                  <p className="text-xs text-muted-foreground">9 submissions</p>
                                </CardContent>
                              </Card>

                              <Card className="akios-card border-blue-500/20">
                                <CardHeader className="pb-3">
                                  <CardTitle className="text-sm font-semibold text-foreground">Highest Success</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="text-lg font-bold text-blue-400 mb-1">Education</div>
                                  <p className="text-xs text-muted-foreground">82% success rate</p>
                                </CardContent>
                              </Card>
                            </div>
                          </TabsContent>
                        </Tabs>
                      </div>
                    </section>

                    {/* Application Tracker */}
                    <section className="akios-section">
                      <ApplicationTracker />
                    </section>
                  </div>
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

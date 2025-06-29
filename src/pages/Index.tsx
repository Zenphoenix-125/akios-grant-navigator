import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { GrantManagerSidebar } from "@/components/GrantManagerSidebar";
import { PerformanceDashboard } from "@/components/PerformanceDashboard";
import { GrantFilters } from "@/components/GrantFilters";
import { GrantDiscoveryCard } from "@/components/GrantDiscoveryCard";
import { ApplicationTracker } from "@/components/ApplicationTracker";
import { Button } from "@/components/ui/button";
import { Plus, Bell, Settings, FileDown, Calendar, Sparkles, AlertCircle, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useGrants } from "@/hooks/useGrants";
import { GrantFilters as GrantFiltersType } from "@/services/api";
import { useState } from "react";

// AI suggestions data (keeping this as mock for now)
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

// Loading skeleton component
const GrantSkeleton = () => (
  <Card className="akios-card animate-pulse">
    <CardHeader className="pb-4">
      <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-muted rounded w-1/2"></div>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="h-3 bg-muted rounded"></div>
        <div className="h-3 bg-muted rounded"></div>
      </div>
      <div className="h-2 bg-muted rounded"></div>
      <div className="h-3 bg-muted rounded w-1/3"></div>
    </CardContent>
  </Card>
);

// Error message component
const ErrorMessage = ({ error, onRetry }: { error: string; onRetry: () => void }) => (
  <div className="flex flex-col items-center justify-center py-12 text-center">
    <AlertCircle className="w-12 h-12 text-red-400 mb-4" />
    <h3 className="text-lg font-semibold text-foreground mb-2">Failed to load grants</h3>
    <p className="text-muted-foreground mb-4 max-w-md">{error}</p>
    <Button onClick={onRetry} variant="outline" type="button">
      Try Again
    </Button>
  </div>
);

// Empty state component
const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-12 text-center">
    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
      <Sparkles className="w-8 h-8 text-muted-foreground" />
    </div>
    <h3 className="text-lg font-semibold text-foreground mb-2">No grants found</h3>
    <p className="text-muted-foreground max-w-md">
      Try adjusting your search criteria or filters to find more grant opportunities.
    </p>
  </div>
);

const Index = () => {
  const [filters, setFilters] = useState<GrantFiltersType>({});
  const { grants, loading, error, refetch } = useGrants(filters);

  const handleFiltersChange = (newFilters: GrantFiltersType) => {
    setFilters(newFilters);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background relative overflow-hidden">
        <GrantManagerSidebar />
        
        <div className="flex-1 flex">
          <main className="flex-1 overflow-hidden">
            <div className="h-full flex flex-col">
              {/* Header */}
              <header className="border-b border-border/20 bg-background backdrop-blur-sm sticky top-0 z-40">
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
                        asChild
                      >
                        <Link to="/executive-brief">
                          <FileDown className="system-icon mr-2" />
                          Executive Brief
                        </Link>
                      </Button>
                      <Button size="sm" className="akios-button-primary" asChild>
                        <Link to="/apply">
                          <Plus className="system-icon mr-2" />
                          New Application
                        </Link>
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
                        {loading && (
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Loading grants...</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="akios-spacing-lg">
                        <GrantFilters onFiltersChange={handleFiltersChange} filters={filters} />
                        
                        <Tabs defaultValue="all" className="w-full">
                          <div className="flex justify-center mb-8">
                            <TabsList className="akios-tabs-list">
                              <TabsTrigger value="all" className="akios-tab-trigger">
                                All Grants
                                {grants.length > 0 && (
                                  <Badge variant="secondary" className="ml-2 text-xs">
                                    {grants.length}
                                  </Badge>
                                )}
                              </TabsTrigger>
                              <TabsTrigger value="ai-recommended" className="akios-tab-trigger">
                                <Sparkles className="system-icon mr-2" />
                                AI Recommended
                              </TabsTrigger>
                              <TabsTrigger value="impact" className="akios-tab-trigger">
                                Impact Dashboard
                              </TabsTrigger>
                            </TabsList>
                          </div>
                          
                          <TabsContent value="all">
                            {loading ? (
                              <div className="akios-grid">
                                {Array.from({ length: 6 }).map((_, index) => (
                                  <GrantSkeleton key={index} />
                                ))}
                              </div>
                            ) : error ? (
                              <ErrorMessage error={error} onRetry={refetch} />
                            ) : grants.length === 0 ? (
                              <EmptyState />
                            ) : (
                              <div className="akios-grid">
                                {grants.map((grant) => (
                                  <GrantDiscoveryCard key={grant.id} {...grant} />
                                ))}
                              </div>
                            )}
                          </TabsContent>
                          
                          <TabsContent value="ai-recommended">
                            <div className="mb-6 p-6 bg-gradient-to-r from-tribal-amber/5 to-primary/5 border border-tribal-amber/20 rounded-xl max-w-4xl mx-auto">
                              <div className="flex items-center space-x-2 mb-3">
                                <h3 className="text-base font-semibold text-foreground">AI-Powered Matching</h3>
                                <Sparkles className="w-4 h-4 text-tribal-amber" />
                              </div>
                              <p className="text-sm text-muted-foreground mb-4">
                                Our AI has analyzed your tribal profile and identified these high-priority opportunities based on sovereignty keywords, cultural relevance, and strategic alignment.
                              </p>
                            </div>
                            
                            <div className="akios-grid">
                              {aiSuggestions.map((suggestion, index) => (
                                <Card key={index} className="akios-card border-tribal-amber/30 hover:border-tribal-amber/50">
                                  <CardHeader>
                                    <div className="flex items-start justify-between">
                                      <div className="flex-1">
                                        <CardTitle className="text-base mb-2">{suggestion.title}</CardTitle>
                                        <CardDescription className="text-sm mb-3">
                                          {suggestion.agency}
                                        </CardDescription>
                                        <div className="flex flex-wrap gap-2 mb-3">
                                          {suggestion.tags.map((tag, tagIndex) => (
                                            <Badge key={tagIndex} variant="outline" className="text-xs">
                                              {tag}
                                            </Badge>
                                          ))}
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                          {suggestion.reason}
                                        </p>
                                      </div>
                                      <div className="flex flex-col items-end space-y-2">
                                        <div className="text-right">
                                          <div className="text-lg font-bold text-tribal-amber">{suggestion.amount}</div>
                                          <div className="text-sm text-muted-foreground">{suggestion.deadline}</div>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                          <span className="text-sm font-bold text-green-400">{suggestion.matchScore}%</span>
                                          <span className="text-xs text-muted-foreground">match</span>
                                        </div>
                                      </div>
                                    </div>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="flex items-center justify-between">
                                      <div className="text-sm text-muted-foreground">
                                        {suggestion.daysLeft} days left
                                      </div>
                                      <Button size="sm" className="akios-button-primary">
                                        Apply Now
                                      </Button>
                                    </div>
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="impact">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                              {impactData.map((impact, index) => (
                                <Card key={index} className="akios-card">
                                  <CardHeader className="pb-3">
                                    <div className="flex items-center space-x-3">
                                      <div className={`w-3 h-3 rounded-full ${impact.color}`} />
                                      <CardTitle className="text-base">{impact.department}</CardTitle>
                                    </div>
                                  </CardHeader>
                                  <CardContent className="space-y-3">
                                    <div className="text-2xl font-bold text-foreground">{impact.amount}</div>
                                    <div className="grid grid-cols-3 gap-2 text-sm">
                                      <div>
                                        <div className="text-muted-foreground">Grants</div>
                                        <div className="font-semibold">{impact.grants}</div>
                                      </div>
                                      <div>
                                        <div className="text-muted-foreground">Submissions</div>
                                        <div className="font-semibold">{impact.submissions}</div>
                                      </div>
                                      <div>
                                        <div className="text-muted-foreground">Success</div>
                                        <div className="font-semibold text-green-400">{impact.successRate}</div>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              ))}
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

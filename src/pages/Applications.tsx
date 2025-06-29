import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { GrantManagerSidebar } from "@/components/GrantManagerSidebar";
import { Button } from "@/components/ui/button";
import { Bell, Settings, FileDown, Calendar, Eye, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";

const mockApplications = [
  {
    id: "app-001",
    grantTitle: "Tribal Health Services Expansion Grant",
    agency: "Health Resources and Services Administration (HRSA)",
    submissionDate: "July 15, 2024",
    status: "In Review",
    progress: 85,
    amount: "$750,000",
    statusColor: "bg-yellow-500/15 text-yellow-400 border-yellow-500/25"
  },
  {
    id: "app-002",
    grantTitle: "Native Language Preservation Initiative",
    agency: "National Endowment for the Arts",
    submissionDate: "June 20, 2024",
    status: "Approved",
    progress: 100,
    amount: "$125,000",
    statusColor: "bg-green-500/15 text-green-400 border-green-500/25"
  },
  {
    id: "app-003",
    grantTitle: "Educational Technology Enhancement Grant",
    agency: "Department of Education",
    submissionDate: "August 1, 2024",
    status: "Rejected",
    progress: 100,
    amount: "$450,000",
    statusColor: "bg-red-500/15 text-red-400 border-red-500/25"
  },
  {
    id: "app-004",
    grantTitle: "Rural Infrastructure Development Program",
    agency: "Department of Transportation",
    submissionDate: "July 30, 2024",
    status: "Under Review",
    progress: 90,
    amount: "$2,500,000",
    statusColor: "bg-blue-500/15 text-blue-400 border-blue-500/25"
  }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Approved":
      return <CheckCircle className="w-4 h-4 text-green-400" />;
    case "Rejected":
      return <XCircle className="w-4 h-4 text-red-400" />;
    case "In Review":
    case "Under Review":
      return <Clock className="w-4 h-4 text-yellow-400" />;
    default:
      return <AlertCircle className="w-4 h-4 text-muted-foreground" />;
  }
};

const Applications = () => {
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
                          Applications
                        </h1>
                        <p className="text-muted-foreground text-sm mt-1">
                          Track your grant submissions and status updates
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
                        Export Report
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
                    {/* Stats Overview */}
                    <section className="akios-section">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <Card className="akios-card">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Total Applications</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold text-foreground">34</div>
                            <p className="text-xs text-muted-foreground">This fiscal year</p>
                          </CardContent>
                        </Card>
                        
                        <Card className="akios-card">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Approved</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold text-green-400">12</div>
                            <p className="text-xs text-muted-foreground">68% success rate</p>
                          </CardContent>
                        </Card>
                        
                        <Card className="akios-card">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium text-muted-foreground">In Review</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold text-yellow-400">8</div>
                            <p className="text-xs text-muted-foreground">Pending decision</p>
                          </CardContent>
                        </Card>
                        
                        <Card className="akios-card">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Total Value</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold text-tribal-amber">$4.2M</div>
                            <p className="text-xs text-muted-foreground">Applied for</p>
                          </CardContent>
                        </Card>
                      </div>
                    </section>

                    {/* Applications List */}
                    <section className="akios-section">
                      <h2 className="section-header mb-6">Recent Applications</h2>
                      
                      <div className="space-y-4">
                        {mockApplications.map((application) => (
                          <Card key={application.id} className="akios-card group cursor-pointer hover:border-primary/30 transition-all">
                            <CardHeader className="pb-4">
                              <div className="flex items-start justify-between">
                                <div className="flex-1 min-w-0 pr-4">
                                  <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary/90 transition-colors line-clamp-1 mb-2">
                                    {application.grantTitle}
                                  </CardTitle>
                                  <CardDescription className="text-muted-foreground">
                                    {application.agency}
                                  </CardDescription>
                                </div>
                                <div className="flex items-center space-x-2">
                                  {getStatusIcon(application.status)}
                                  <Badge className={`category-pill ${application.statusColor}`}>
                                    {application.status}
                                  </Badge>
                                </div>
                              </div>
                            </CardHeader>

                            <CardContent className="space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                  <p className="text-xs text-muted-foreground mb-1">Submitted</p>
                                  <p className="text-sm font-medium text-foreground">{application.submissionDate}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground mb-1">Amount</p>
                                  <p className="text-sm font-semibold text-green-400">{application.amount}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground mb-1">Progress</p>
                                  <div className="flex items-center space-x-2">
                                    <Progress value={application.progress} className="h-2 flex-1" />
                                    <span className="text-xs font-medium text-foreground">{application.progress}%</span>
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center justify-end pt-3 border-t border-border/20">
                                <Button 
                                  size="sm" 
                                  className="akios-button-primary"
                                  asChild
                                >
                                  <Link to={`/applications/${application.id}`}>
                                    <Eye className="w-3 h-3 mr-1.5" />
                                    View Application
                                  </Link>
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
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

export default Applications;


import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { GrantManagerSidebar } from "@/components/GrantManagerSidebar";
import { Button } from "@/components/ui/button";
import { Bell, Settings, FileDown, Calendar, Plus, Clock, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const mockDeadlines = [
  {
    id: "deadline-001",
    grantTitle: "EPA Environmental Justice Grant",
    agency: "Environmental Protection Agency",
    deadline: "September 15, 2024",
    daysLeft: 8,
    amount: "$300,000",
    category: "Environment",
    urgency: "high"
  },
  {
    id: "deadline-002",
    grantTitle: "USDA Rural Development Grant",
    agency: "U.S. Department of Agriculture",
    deadline: "October 1, 2024",
    daysLeft: 24,
    amount: "$180,000",
    category: "Infrastructure",
    urgency: "medium"
  },
  {
    id: "deadline-003",
    grantTitle: "NSF STEM Education Initiative",
    agency: "National Science Foundation",
    deadline: "November 30, 2024",
    daysLeft: 84,
    amount: "$425,000",
    category: "Education",
    urgency: "low"
  },
  {
    id: "deadline-004",
    grantTitle: "HUD Housing Development Grant",
    agency: "Department of Housing and Urban Development",
    deadline: "October 15, 2024",
    daysLeft: 38,
    amount: "$850,000",
    category: "Infrastructure",
    urgency: "medium"
  }
];

const getUrgencyColor = (urgency: string) => {
  switch (urgency) {
    case "high":
      return "bg-red-500/15 text-red-400 border-red-500/25";
    case "medium":
      return "bg-yellow-500/15 text-yellow-400 border-yellow-500/25";
    case "low":
      return "bg-green-500/15 text-green-400 border-green-500/25";
    default:
      return "bg-muted/15 text-muted-foreground border-muted/25";
  }
};

const getDaysLeftColor = (days: number) => {
  if (days <= 7) return "text-red-400";
  if (days <= 30) return "text-yellow-400";
  return "text-green-400";
};

const Deadlines = () => {
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
                          Deadlines
                        </h1>
                        <p className="text-muted-foreground text-sm mt-1">
                          Track upcoming submission deadlines and set reminders
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="bg-background/60 backdrop-blur-sm border-border/40 hover:border-tribal-amber/40"
                      >
                        <Calendar className="system-icon mr-2" />
                        Sync Calendar
                      </Button>
                      <Button size="sm" className="akios-button-primary">
                        <Plus className="system-icon mr-2" />
                        Add Reminder
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
                    {/* Urgency Stats */}
                    <section className="akios-section">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <Card className="akios-card border-red-500/20">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                              <AlertTriangle className="w-4 h-4 text-red-400 mr-2" />
                              Urgent (≤7 days)
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold text-red-400">1</div>
                            <p className="text-xs text-muted-foreground">Needs immediate attention</p>
                          </CardContent>
                        </Card>
                        
                        <Card className="akios-card border-yellow-500/20">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                              <Clock className="w-4 h-4 text-yellow-400 mr-2" />
                              Upcoming (≤30 days)
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold text-yellow-400">2</div>
                            <p className="text-xs text-muted-foreground">Plan preparation</p>
                          </CardContent>
                        </Card>
                        
                        <Card className="akios-card border-green-500/20">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                              <Calendar className="w-4 h-4 text-green-400 mr-2" />
                              Future ({'>'}30 days)
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold text-green-400">1</div>
                            <p className="text-xs text-muted-foreground">Monitor progress</p>
                          </CardContent>
                        </Card>
                      </div>
                    </section>

                    {/* Deadlines List */}
                    <section className="akios-section">
                      <h2 className="section-header mb-6">Upcoming Deadlines</h2>
                      
                      <div className="space-y-4">
                        {mockDeadlines
                          .sort((a, b) => a.daysLeft - b.daysLeft)
                          .map((deadline) => (
                          <Card key={deadline.id} className="akios-card group cursor-pointer hover:border-primary/30 transition-all">
                            <CardHeader className="pb-4">
                              <div className="flex items-start justify-between">
                                <div className="flex-1 min-w-0 pr-4">
                                  <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary/90 transition-colors line-clamp-1 mb-2">
                                    {deadline.grantTitle}
                                  </CardTitle>
                                  <CardDescription className="text-muted-foreground">
                                    {deadline.agency}
                                  </CardDescription>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Badge className={`category-pill ${getUrgencyColor(deadline.urgency)}`}>
                                    {deadline.urgency === "high" ? "Urgent" : 
                                     deadline.urgency === "medium" ? "Upcoming" : "Future"}
                                  </Badge>
                                </div>
                              </div>
                            </CardHeader>

                            <CardContent className="space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div>
                                  <p className="text-xs text-muted-foreground mb-1">Deadline</p>
                                  <p className="text-sm font-medium text-foreground">{deadline.deadline}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground mb-1">Days Left</p>
                                  <p className={`text-sm font-semibold ${getDaysLeftColor(deadline.daysLeft)}`}>
                                    {deadline.daysLeft} days
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground mb-1">Amount</p>
                                  <p className="text-sm font-semibold text-green-400">{deadline.amount}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground mb-1">Category</p>
                                  <p className="text-sm font-medium text-foreground">{deadline.category}</p>
                                </div>
                              </div>

                              <div className="flex items-center justify-between pt-3 border-t border-border/20">
                                <div className="flex items-center space-x-2">
                                  {deadline.daysLeft <= 7 && (
                                    <AlertTriangle className="w-4 h-4 text-red-400" />
                                  )}
                                  <span className={`text-sm font-medium ${getDaysLeftColor(deadline.daysLeft)}`}>
                                    {deadline.daysLeft <= 7 ? "Action Required" : 
                                     deadline.daysLeft <= 30 ? "Plan Ahead" : "Monitor"}
                                  </span>
                                </div>
                                <div className="flex space-x-2">
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    className="text-xs"
                                  >
                                    Set Reminder
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    className="akios-button-primary text-xs"
                                  >
                                    Start Application
                                  </Button>
                                </div>
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

export default Deadlines;

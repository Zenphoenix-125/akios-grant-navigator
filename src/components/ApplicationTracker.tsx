
import { Calendar, User, CheckCircle, Clock, AlertCircle, ExternalLink, Edit, Send, FileCheck } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const applications = [
  {
    id: 1,
    title: "Tribal Health Center Expansion",
    agency: "HRSA",
    status: "In Review",
    progress: 75,
    deadline: "2024-08-15",
    assignee: "Sarah Johnson",
    assigneeInitials: "SJ",
    amount: "$500,000",
    daysLeft: 12,
    department: "Health",
    departmentColor: "bg-green-500/20 text-green-400"
  },
  {
    id: 2,
    title: "Cultural Education Program",
    agency: "NEA",
    status: "Draft",
    progress: 45,
    deadline: "2024-09-01",
    assignee: "Michael Bear",
    assigneeInitials: "MB",
    amount: "$125,000",
    daysLeft: 28,
    department: "Education",
    departmentColor: "bg-blue-500/20 text-blue-400"
  },
  {
    id: 3,
    title: "Infrastructure Development",
    agency: "DOT",
    status: "Submitted",
    progress: 100,
    deadline: "2024-07-30",
    assignee: "Lisa White Eagle",
    assigneeInitials: "LW",
    amount: "$750,000",
    daysLeft: 5,
    department: "Infrastructure",
    departmentColor: "bg-purple-500/20 text-purple-400"
  }
];

const getStatusConfig = (status: string) => {
  switch (status) {
    case "Submitted": 
      return {
        color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
        emoji: "📨",
        icon: Send,
        microIcon: "📨"
      };
    case "In Review": 
      return {
        color: "bg-tribal-amber/20 text-tribal-amber border-tribal-amber/30",
        emoji: "🕒",
        icon: Clock,
        microIcon: "🕒"
      };
    case "Draft": 
      return {
        color: "bg-purple-500/20 text-purple-400 border-purple-500/30",
        emoji: "✍️",
        icon: Edit,
        microIcon: "✍️"
      };
    case "Awarded": 
      return {
        color: "bg-green-500/20 text-green-400 border-green-500/30",
        emoji: "🏆",
        icon: CheckCircle,
        microIcon: "🏆"
      };
    default: 
      return {
        color: "bg-gray-500/20 text-gray-400 border-gray-500/30",
        emoji: "⚪",
        icon: Clock,
        microIcon: "⚪"
      };
  }
};

export function ApplicationTracker() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-foreground">Active Applications</h3>
        <Badge variant="outline" className="border-primary/40 text-primary bg-primary/10 px-4 py-2 text-sm">
          {applications.length} Active
        </Badge>
      </div>
      
      <div className="grid gap-6">
        {applications.map((app) => {
          const statusConfig = getStatusConfig(app.status);
          return (
            <Card key={app.id} className="relative bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border border-border/30 hover:border-primary/40 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 animate-fade-in group overflow-hidden cursor-pointer">
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <CardHeader className="pb-4 relative z-10">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-lg">{statusConfig.microIcon}</span>
                      <Badge className={`${app.departmentColor} border px-2 py-1 text-xs font-medium`}>
                        {app.department}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary/90 transition-colors mb-2">
                      {app.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground text-base">
                      {app.agency} • <span className="font-semibold text-green-400">{app.amount}</span>
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge className={`${statusConfig.color} border px-3 py-1 font-medium`}>
                      <statusConfig.icon className="w-3 h-3 mr-1" />
                      {statusConfig.emoji} {app.status}
                    </Badge>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="hover:bg-primary/20"
                      title="View full application status"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6 relative z-10">
                {/* Enhanced Progress Section */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Progress</span>
                    <span className="text-lg font-bold text-foreground">{app.progress}%</span>
                  </div>
                  <div className="relative">
                    <Progress value={app.progress} className="h-4 bg-secondary/20 overflow-hidden" />
                    <div 
                      className="absolute top-0 left-0 h-4 rounded-full transition-all duration-1000 group-hover:animate-pulse overflow-hidden"
                      style={{ width: `${app.progress}%` }}
                    >
                      <div className="h-full w-full bg-gradient-to-r from-primary via-blue-500 to-cyan-400 animate-gradient-flow" />
                    </div>
                  </div>
                </div>

                {/* Details Row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10 border-2 border-primary/30 group-hover:border-primary/50 transition-colors">
                      <AvatarFallback className="bg-primary/20 text-primary font-semibold text-sm">
                        {app.assigneeInitials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <span className="text-xs text-muted-foreground">Assigned to</span>
                      <div className="font-medium text-foreground">{app.assignee}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-right">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <div className="text-xs text-muted-foreground">Due in</div>
                      <div className={`font-bold ${
                        app.daysLeft <= 7 ? 'text-red-400 animate-pulse' :
                        app.daysLeft <= 14 ? 'text-tribal-amber' :
                        'text-green-400'
                      }`}>
                        {app.daysLeft} days
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

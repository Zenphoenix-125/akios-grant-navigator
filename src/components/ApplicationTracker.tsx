
import { Calendar, User, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const applications = [
  {
    id: 1,
    title: "Tribal Health Center Expansion",
    agency: "HRSA",
    status: "In Review",
    progress: 75,
    deadline: "2024-08-15",
    assignee: "Sarah Johnson",
    amount: "$500,000",
    daysLeft: 12
  },
  {
    id: 2,
    title: "Cultural Education Program",
    agency: "NEA",
    status: "Draft",
    progress: 45,
    deadline: "2024-09-01",
    assignee: "Michael Bear",
    amount: "$125,000",
    daysLeft: 28
  },
  {
    id: 3,
    title: "Infrastructure Development",
    agency: "DOT",
    status: "Submitted",
    progress: 100,
    deadline: "2024-07-30",
    assignee: "Lisa White Eagle",
    amount: "$750,000",
    daysLeft: 5
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Submitted": return "bg-blue-500/20 text-blue-400";
    case "In Review": return "bg-tribal-amber/20 text-tribal-amber";
    case "Draft": return "bg-gray-500/20 text-gray-400";
    case "Awarded": return "bg-green-500/20 text-green-400";
    default: return "bg-gray-500/20 text-gray-400";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Submitted": return CheckCircle;
    case "In Review": return Clock;
    case "Draft": return AlertCircle;
    case "Awarded": return CheckCircle;
    default: return Clock;
  }
};

export function ApplicationTracker() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-foreground">Active Applications</h3>
        <Badge variant="outline" className="border-primary/30 text-primary">
          {applications.length} Active
        </Badge>
      </div>
      
      <div className="space-y-4">
        {applications.map((app) => {
          const StatusIcon = getStatusIcon(app.status);
          return (
            <Card key={app.id} className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 animate-fade-in">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg font-semibold text-foreground">
                      {app.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground mt-1">
                      {app.agency} • {app.amount}
                    </CardDescription>
                  </div>
                  <Badge className={getStatusColor(app.status)}>
                    <StatusIcon className="w-3 h-3 mr-1" />
                    {app.status}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium text-foreground">{app.progress}%</span>
                  </div>
                  <Progress value={app.progress} className="h-2" />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Assigned to</span>
                    <span className="font-medium text-foreground">{app.assignee}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Due in</span>
                    <span className={`font-medium ${
                      app.daysLeft <= 7 ? 'text-red-400' :
                      app.daysLeft <= 14 ? 'text-tribal-amber' :
                      'text-green-400'
                    }`}>
                      {app.daysLeft} days
                    </span>
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

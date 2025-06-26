
import { TrendingUp, DollarSign, FileText, Award } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  {
    title: "Total Awarded",
    value: "$2.4M",
    change: "+12%",
    changeType: "increase",
    icon: DollarSign,
    description: "This fiscal year"
  },
  {
    title: "Applications",
    value: "34",
    change: "+8",
    changeType: "increase", 
    icon: FileText,
    description: "Submitted this quarter"
  },
  {
    title: "Success Rate",
    value: "68%",
    change: "+5%",
    changeType: "increase",
    icon: Award,
    description: "Above tribal average"
  },
  {
    title: "Active Grants",
    value: "12",
    change: "3 new",
    changeType: "neutral",
    icon: TrendingUp,
    description: "In progress"
  }
];

export function PerformanceDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-up">
      {stats.map((stat, index) => (
        <Card key={stat.title} className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            <div className="flex items-center space-x-2 mt-1">
              <span className={`text-xs font-medium ${
                stat.changeType === 'increase' ? 'text-green-400' : 
                stat.changeType === 'decrease' ? 'text-red-400' : 
                'text-tribal-amber'
              }`}>
                {stat.change}
              </span>
              <span className="text-xs text-muted-foreground">
                {stat.description}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

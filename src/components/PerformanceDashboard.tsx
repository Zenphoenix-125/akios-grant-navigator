
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
    <div className="akios-stats-grid">
      {stats.map((stat, index) => (
        <Card 
          key={stat.title} 
          className="akios-card hover-glow group cursor-pointer h-full"
          title="View detailed analytics"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
              {stat.title}
            </CardTitle>
            <stat.icon className="functional-icon text-primary/60 group-hover:text-primary transition-colors" />
          </CardHeader>
          
          <CardContent className="pt-0">
            <div className="text-2xl font-bold text-foreground mb-2">
              {stat.value}
            </div>
            <div className="flex items-center space-x-2">
              <div className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                stat.changeType === 'increase' ? 'bg-green-500/15 text-green-400' : 
                stat.changeType === 'decrease' ? 'bg-red-500/15 text-red-400' : 
                'bg-tribal-amber/15 text-tribal-amber'
              }`}>
                {stat.change}
              </div>
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

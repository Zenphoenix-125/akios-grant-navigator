import { TrendingUp, DollarSign, FileText, Award } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  {
    title: "Total Awarded",
    value: "$2.4M",
    change: "+12%",
    changeType: "increase",
    icon: DollarSign,
    description: "This fiscal year",
    emoji: "💰",
    tribalIcon: "🏛️",
    sparklineData: [1.8, 2.0, 2.1, 2.3, 2.4],
    clickAction: "View grant history"
  },
  {
    title: "Applications",
    value: "34",
    change: "+8",
    changeType: "increase", 
    icon: FileText,
    description: "Submitted this quarter",
    emoji: "📄",
    tribalIcon: "📜",
    sparklineData: [26, 28, 30, 32, 34],
    clickAction: "View all applications"
  },
  {
    title: "Success Rate",
    value: "68%",
    change: "+5%",
    changeType: "increase",
    icon: Award,
    description: "Above tribal average",
    emoji: "📈",
    tribalIcon: "🪶",
    sparklineData: [58, 62, 65, 66, 68],
    clickAction: "View success analytics"
  },
  {
    title: "Active Grants",
    value: "12",
    change: "3 new",
    changeType: "neutral",
    icon: TrendingUp,
    description: "In progress",
    emoji: "⚡",
    tribalIcon: "⛰️",
    sparklineData: [8, 9, 10, 11, 12],
    clickAction: "View active grants"
  }
];

function MiniSparkline({ data }: { data: number[] }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min;
  
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 60;
    const y = 20 - ((value - min) / range) * 20;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width="60" height="20" className="opacity-40 group-hover:opacity-70 transition-opacity duration-200">
      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-tribal-amber"
      />
    </svg>
  );
}

export function PerformanceDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card 
          key={stat.title} 
          className="relative bg-card/60 backdrop-blur-sm border border-border/30 hover:border-border/50 transition-all duration-200 hover:shadow-md group overflow-hidden cursor-pointer rounded-xl"
          title={stat.clickAction}
        >
          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/2 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          
          {/* Tribal pattern overlay */}
          <div className="absolute top-3 right-3 text-2xl opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-200">
            {stat.tribalIcon}
          </div>
          
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <span className="text-lg group-hover:scale-105 transition-transform duration-200">{stat.tribalIcon}</span>
                <span className="text-sm opacity-50 group-hover:opacity-80 transition-opacity">{stat.emoji}</span>
              </div>
              <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                {stat.title}
              </CardTitle>
            </div>
            <stat.icon className="h-4 w-4 text-primary/40 group-hover:text-primary/60 transition-colors duration-200" />
          </CardHeader>
          
          <CardContent className="relative z-10">
            <div className="flex items-end justify-between mb-3">
              <div className="text-3xl font-bold text-foreground mb-2 group-hover:text-primary/90 transition-colors">
                {stat.value}
              </div>
              <MiniSparkline data={stat.sparklineData} />
            </div>
            <div className="flex items-center space-x-3">
              <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-semibold transition-colors duration-200 ${
                stat.changeType === 'increase' ? 'bg-green-500/15 text-green-400' : 
                stat.changeType === 'decrease' ? 'bg-red-500/15 text-red-400' : 
                'bg-tribal-amber/15 text-tribal-amber'
              }`}>
                <span>{stat.change}</span>
              </div>
              <span className="text-xs text-muted-foreground group-hover:text-muted-foreground/80 transition-colors">
                {stat.description}
              </span>
            </div>
          </CardContent>
          
          {/* Click hint */}
          <div className="absolute bottom-2 right-2 text-xs text-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Click to explore →
          </div>
        </Card>
      ))}
    </div>
  );
}

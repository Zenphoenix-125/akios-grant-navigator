
import { Calendar, DollarSign, Target, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface GrantDiscoveryCardProps {
  title: string;
  agency: string;
  amount: string;
  deadline: string;
  matchScore: number;
  category: string;
  matchRequired: boolean;
  daysLeft: number;
}

export function GrantDiscoveryCard({
  title,
  agency,
  amount,
  deadline,
  matchScore,
  category,
  matchRequired,
  daysLeft
}: GrantDiscoveryCardProps) {
  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return "text-green-400";
    if (score >= 70) return "text-tribal-amber";
    return "text-orange-400";
  };

  const getUrgencyColor = (days: number) => {
    if (days <= 7) return "text-red-400";
    if (days <= 30) return "text-tribal-amber";
    return "text-green-400";
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 animate-fade-in group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0 pr-4">
            <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-2">
              {title}
            </CardTitle>
            <CardDescription className="text-muted-foreground mt-1">
              {agency}
            </CardDescription>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <Badge variant="outline" className="border-tribal-amber/30 text-tribal-amber">
              {category}
            </Badge>
            {matchRequired && (
              <Badge variant="secondary" className="text-xs">
                Match Required
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <DollarSign className="w-4 h-4 text-green-400" />
            <span className="text-sm font-medium text-foreground">{amount}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{deadline}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Target className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Match Score</span>
            </div>
            <span className={`text-sm font-semibold ${getMatchScoreColor(matchScore)}`}>
              {matchScore}%
            </span>
          </div>
          <Progress value={matchScore} className="h-2" />
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border/30">
          <div className="flex items-center space-x-2">
            <Clock className={`w-4 h-4 ${getUrgencyColor(daysLeft)}`} />
            <span className={`text-sm font-medium ${getUrgencyColor(daysLeft)}`}>
              {daysLeft} days left
            </span>
          </div>
          <Button size="sm" className="bg-primary hover:bg-primary/90">
            Apply Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

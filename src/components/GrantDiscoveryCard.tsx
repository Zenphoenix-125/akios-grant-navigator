
import { Calendar, DollarSign, Target, Clock, Heart, ExternalLink, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";

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
  const [isBookmarked, setIsBookmarked] = useState(false);

  const getCategoryClasses = (category: string) => {
    const categoryMap = {
      "Health": "category-health",
      "Cultural": "category-cultural", 
      "Infrastructure": "category-infrastructure",
      "Education": "category-education",
      "Environment": "category-environment",
      "Economic": "category-economic"
    };
    return categoryMap[category as keyof typeof categoryMap] || "category-pill";
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return "text-green-400";
    if (score >= 70) return "text-tribal-amber";
    return "text-red-400";
  };

  const getUrgencyColor = (days: number) => {
    if (days <= 7) return "text-red-400";
    if (days <= 30) return "text-tribal-amber";
    return "text-green-400";
  };

  const getGrantValue = (amount: string) => {
    const numericAmount = parseFloat(amount.replace(/[$,]/g, ''));
    return numericAmount;
  };

  const grantValue = getGrantValue(amount);
  const isHighValue = grantValue >= 1000000;
  const isUrgent = daysLeft <= 10;
  const isHighPriority = matchScore >= 90 && (isHighValue || isUrgent);

  return (
    <Card className={`akios-card ${isHighPriority ? 'border-tribal-amber/40 hover:border-tribal-amber/60' : ''} group cursor-pointer`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0 pr-3">
            {isHighPriority && (
              <Badge className="mb-2 bg-tribal-amber/15 text-tribal-amber border-tribal-amber/30 text-xs">
                <Zap className="w-2.5 h-2.5 mr-1" />
                Priority
              </Badge>
            )}
            <CardTitle className="text-base font-semibold text-foreground group-hover:text-primary/90 transition-colors line-clamp-2 mb-2">
              {title}
            </CardTitle>
            <CardDescription className="text-muted-foreground text-sm">
              {agency}
            </CardDescription>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 hover:bg-primary/10"
              onClick={() => setIsBookmarked(!isBookmarked)}
            >
              <Heart className={`system-icon transition-colors ${
                isBookmarked ? 'fill-red-500 text-red-500' : 'hover:text-red-400'
              }`} />
            </Button>
            <div className={`category-pill ${getCategoryClasses(category)}`}>
              {category}
            </div>
            {matchRequired && (
              <Badge variant="secondary" className="text-xs bg-secondary/50 px-2 py-0.5">
                Match Req.
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center space-x-2">
            <DollarSign className={`system-icon ${isHighValue ? 'text-tribal-amber' : 'text-green-400'}`} />
            <span className="text-sm font-semibold text-foreground">
              {amount}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="system-icon text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{deadline}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Target className="system-icon text-primary" />
              <span className="text-sm text-muted-foreground">Match</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`text-sm font-bold ${getMatchScoreColor(matchScore)}`}>
                {matchScore}%
              </span>
            </div>
          </div>
          <Progress value={matchScore} className="h-1.5 bg-secondary/20" />
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border/20">
          <div className="flex items-center space-x-2">
            <Clock className={`system-icon ${getUrgencyColor(daysLeft)}`} />
            <span className={`text-sm font-medium ${getUrgencyColor(daysLeft)}`}>
              {daysLeft} days left
            </span>
          </div>
          <Button 
            size="sm" 
            className="akios-button-primary text-xs px-3 py-1.5"
            title="FastFill AI Application"
          >
            Apply Now
            <ExternalLink className="w-3 h-3 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

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

const categoryIcons = {
  "Health": "🏥",
  "Cultural": "🪶", 
  "Infrastructure": "🛠️",
  "Education": "🧑‍🏫",
  "Environment": "🌱",
  "Economic": "💼"
};

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

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return "text-green-400";
    if (score >= 70) return "text-tribal-amber";
    return "text-red-400";
  };

  const getMatchScoreGrade = (score: number) => {
    if (score >= 90) return "High Probability";
    if (score >= 70) return "Viable";
    return "Low Match";
  };

  const getMatchScoreBarColor = (score: number) => {
    if (score >= 90) return "bg-gradient-to-r from-green-500 to-green-400";
    if (score >= 70) return "bg-gradient-to-r from-tribal-amber to-yellow-400";
    return "bg-gradient-to-r from-red-500 to-orange-400";
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

  const getCardClasses = () => {
    let baseClasses = "relative bg-card/60 backdrop-blur-sm border rounded-xl transition-all duration-200 hover:shadow-lg group overflow-hidden hover:bg-card/80";
    
    if (isHighPriority) {
      return `${baseClasses} border-tribal-amber/40 hover:border-tribal-amber/60 shadow-tribal-amber/5 hover:shadow-tribal-amber/10`;
    } else if (isHighValue) {
      return `${baseClasses} border-yellow-500/30 hover:border-yellow-500/50 shadow-yellow-500/3 hover:shadow-yellow-500/8`;
    } else if (isUrgent) {
      return `${baseClasses} border-red-400/30 hover:border-red-400/50`;
    } else {
      return `${baseClasses} border-border/30 hover:border-border/50`;
    }
  };

  const categoryIcon = categoryIcons[category as keyof typeof categoryIcons] || "📋";

  return (
    <Card className={getCardClasses()}>
      {/* Subtle priority overlay */}
      <div className={`absolute inset-0 transition-opacity duration-200 ${
        isHighPriority ? 'bg-gradient-to-br from-tribal-amber/3 to-transparent opacity-60' :
        isHighValue ? 'bg-gradient-to-br from-yellow-500/2 to-transparent opacity-0 group-hover:opacity-100' :
        isUrgent ? 'bg-gradient-to-br from-red-400/2 to-transparent opacity-0 group-hover:opacity-100' :
        'bg-gradient-to-br from-primary/1 to-transparent opacity-0 group-hover:opacity-100'
      }`} />
      
      <CardHeader className="pb-4 relative z-10">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0 pr-4">
            {isHighPriority && (
              <Badge className="mb-3 bg-tribal-amber/15 text-tribal-amber border-tribal-amber/30">
                <Zap className="w-2.5 h-2.5 mr-1" />
                Featured Grant
              </Badge>
            )}
            <CardTitle className={`text-lg font-semibold transition-colors duration-200 line-clamp-2 mb-2 ${
              isHighPriority ? 'text-tribal-amber' : 'text-foreground group-hover:text-primary/90'
            }`}>
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
              className="h-8 w-8 hover:bg-primary/10 transition-colors duration-200"
              onClick={() => setIsBookmarked(!isBookmarked)}
            >
              <Heart className={`w-3 h-3 transition-colors duration-200 ${
                isBookmarked ? 'fill-red-500 text-red-500' : 'text-muted-foreground hover:text-red-400'
              }`} />
            </Button>
            <Badge 
              variant="outline" 
              className="border-tribal-amber/30 text-tribal-amber bg-tribal-amber/8 hover:bg-tribal-amber/15 transition-colors duration-200"
            >
              <span className="mr-1 text-xs">{categoryIcon}</span>
              {category}
            </Badge>
            {matchRequired && (
              <Badge variant="secondary" className="text-xs bg-secondary/50">
                Match Required
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 relative z-10">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <DollarSign className={`w-3.5 h-3.5 opacity-70 ${isHighValue ? 'text-tribal-amber' : 'text-green-400'}`} />
            <span className={`text-sm font-semibold ${isHighValue ? 'text-tribal-amber' : 'text-foreground'}`}>
              {amount}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-3.5 h-3.5 text-muted-foreground opacity-70" />
            <span className="text-sm text-muted-foreground">{deadline}</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Target className="w-3.5 h-3.5 text-primary opacity-70" />
              <span className="text-sm text-muted-foreground">Match Score</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`text-sm font-bold ${getMatchScoreColor(matchScore)}`}>
                {matchScore}%
              </span>
              <Badge className={`text-xs px-2 py-0.5 ${
                matchScore >= 90 ? 'bg-green-500/15 text-green-400 border-green-500/30' :
                matchScore >= 70 ? 'bg-tribal-amber/15 text-tribal-amber border-tribal-amber/30' :
                'bg-red-500/15 text-red-400 border-red-500/30'
              }`}>
                {getMatchScoreGrade(matchScore)}
              </Badge>
            </div>
          </div>
          <div className="relative">
            <Progress value={matchScore} className="h-2 bg-secondary/20" />
            <div 
              className={`absolute top-0 left-0 h-2 rounded-full transition-all duration-300 ${getMatchScoreBarColor(matchScore)}`}
              style={{ width: `${matchScore}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-border/20">
          <div className="flex items-center space-x-2">
            <Clock className={`w-3.5 h-3.5 opacity-70 ${getUrgencyColor(daysLeft)}`} />
            <span className={`text-sm font-medium ${getUrgencyColor(daysLeft)}`}>
              {daysLeft} days left
            </span>
          </div>
          <Button 
            size="sm" 
            className="bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90 shadow-md hover:shadow-lg transition-all duration-200 group/btn relative"
            title="Use Akios FastFill AI to apply instantly"
          >
            <span className="mr-2 relative z-10">Apply Now</span>
            <ExternalLink className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform relative z-10" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}


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

  // Calculate grant value for visual hierarchy
  const getGrantValue = (amount: string) => {
    const numericAmount = parseFloat(amount.replace(/[$,]/g, ''));
    return numericAmount;
  };

  const grantValue = getGrantValue(amount);
  const isHighValue = grantValue >= 1000000; // $1M+
  const isUrgent = daysLeft <= 10;
  const isHighPriority = matchScore >= 90 && (isHighValue || isUrgent);

  const getCardClasses = () => {
    let baseClasses = "relative bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border transition-all duration-500 hover:shadow-2xl animate-fade-in group overflow-hidden";
    
    if (isHighPriority) {
      return `${baseClasses} border-tribal-amber/60 hover:border-tribal-amber shadow-tribal-amber/20 hover:shadow-tribal-amber/30 ring-1 ring-tribal-amber/20`;
    } else if (isHighValue) {
      return `${baseClasses} border-yellow-500/40 hover:border-yellow-500/60 shadow-yellow-500/10 hover:shadow-yellow-500/20`;
    } else if (isUrgent) {
      return `${baseClasses} border-red-400/40 hover:border-red-400/60 shadow-red-400/10 hover:shadow-red-400/20 animate-pulse`;
    } else {
      return `${baseClasses} border-border/30 hover:border-primary/40 hover:shadow-primary/20`;
    }
  };

  return (
    <Card className={getCardClasses()}>
      {/* Priority overlay glow */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${
        isHighPriority ? 'bg-gradient-to-br from-tribal-amber/8 to-transparent opacity-100' :
        isHighValue ? 'bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100' :
        isUrgent ? 'bg-gradient-to-br from-red-400/5 to-transparent opacity-0 group-hover:opacity-100' :
        'bg-gradient-to-br from-primary/3 to-transparent opacity-0 group-hover:opacity-100'
      }`} />
      
      <CardHeader className="pb-4 relative z-10">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0 pr-4">
            {isHighPriority && (
              <Badge className="mb-2 bg-tribal-amber/20 text-tribal-amber border-tribal-amber/40 animate-pulse">
                <Zap className="w-3 h-3 mr-1" />
                Featured Grant
              </Badge>
            )}
            <CardTitle className={`text-lg font-semibold transition-colors duration-300 line-clamp-2 mb-2 ${
              isHighPriority ? 'text-tribal-amber' : 'text-foreground group-hover:text-primary/90'
            }`}>
              {title}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {agency}
            </CardDescription>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-primary/20"
              onClick={() => setIsBookmarked(!isBookmarked)}
            >
              <Heart className={`w-4 h-4 transition-colors ${isBookmarked ? 'fill-red-500 text-red-500' : 'text-muted-foreground hover:text-red-400'}`} />
            </Button>
            <Badge variant="outline" className="border-tribal-amber/40 text-tribal-amber bg-tribal-amber/10">
              {category}
            </Badge>
            {matchRequired && (
              <Badge variant="secondary" className="text-xs bg-secondary/60">
                Match Required
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-5 relative z-10">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <DollarSign className={`w-4 h-4 ${isHighValue ? 'text-tribal-amber' : 'text-green-400'}`} />
            <span className={`text-sm font-semibold ${isHighValue ? 'text-tribal-amber' : 'text-foreground'}`}>
              {amount}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{deadline}</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Target className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Match Score</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`text-sm font-bold ${getMatchScoreColor(matchScore)}`}>
                {matchScore}%
              </span>
              <Badge className={`text-xs px-2 py-0.5 ${
                matchScore >= 90 ? 'bg-green-500/20 text-green-400' :
                matchScore >= 70 ? 'bg-tribal-amber/20 text-tribal-amber' :
                'bg-red-500/20 text-red-400'
              }`}>
                {getMatchScoreGrade(matchScore)}
              </Badge>
            </div>
          </div>
          <div className="relative">
            <Progress value={matchScore} className="h-3 bg-secondary/30" />
            <div 
              className={`absolute top-0 left-0 h-3 rounded-full transition-all duration-700 group-hover:animate-pulse ${getMatchScoreBarColor(matchScore)}`}
              style={{ width: `${matchScore}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-border/30">
          <div className="flex items-center space-x-2">
            <Clock className={`w-4 h-4 ${getUrgencyColor(daysLeft)} ${isUrgent ? 'animate-pulse' : ''}`} />
            <span className={`text-sm font-medium ${getUrgencyColor(daysLeft)}`}>
              {daysLeft} days left
            </span>
          </div>
          <Button 
            size="sm" 
            className="bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90 shadow-lg hover:shadow-primary/40 transition-all duration-300 hover:scale-105 group/btn relative overflow-hidden magnetic-button"
            title="Use FastFill AI to apply instantly"
          >
            {/* Magnetic glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 animate-pulse" />
            <span className="mr-2 relative z-10">Apply Now</span>
            <ExternalLink className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform relative z-10" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

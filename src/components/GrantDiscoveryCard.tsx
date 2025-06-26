
import { Calendar, DollarSign, Target, Clock, Heart, ExternalLink } from "lucide-react";
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

  return (
    <Card className="relative bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border border-border/30 hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 animate-fade-in group overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <CardHeader className="pb-4 relative z-10">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0 pr-4">
            <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary/90 transition-colors duration-300 line-clamp-2 mb-2">
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
            <DollarSign className="w-4 h-4 text-green-400" />
            <span className="text-sm font-semibold text-foreground">{amount}</span>
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
            <Clock className={`w-4 h-4 ${getUrgencyColor(daysLeft)}`} />
            <span className={`text-sm font-medium ${getUrgencyColor(daysLeft)}`}>
              {daysLeft} days left
            </span>
          </div>
          <Button 
            size="sm" 
            className="bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90 shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:scale-105 group/btn"
          >
            <span className="mr-2">Apply Now</span>
            <ExternalLink className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

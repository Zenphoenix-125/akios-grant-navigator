
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const activeFilters = [
  "Education",
  "Health", 
  "Match Required",
  "> $100K"
];

export function GrantFilters() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Main Filter Row */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative group">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="Search grants by title, agency, or keyword..."
            className="pl-12 h-12 bg-background/60 backdrop-blur-sm border-border/40 focus:border-primary/60 focus:bg-background/80 transition-all duration-300 text-foreground placeholder:text-muted-foreground/70"
          />
        </div>
        
        <div className="flex gap-3">
          <Select>
            <SelectTrigger className="w-52 h-12 bg-background/60 backdrop-blur-sm border-border/40 hover:border-primary/40 transition-all">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="bg-background/95 backdrop-blur-xl border-border/50">
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="education">Education</SelectItem>
              <SelectItem value="health">Health</SelectItem>
              <SelectItem value="infrastructure">Infrastructure</SelectItem>
              <SelectItem value="cultural">Cultural</SelectItem>
              <SelectItem value="economic">Economic Development</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="flex items-center gap-3 flex-wrap p-4 bg-background/30 backdrop-blur-sm rounded-xl border border-border/30">
          {activeFilters.map((filter) => (
            <Badge 
              key={filter}
              variant="secondary" 
              className="bg-primary/20 text-primary hover:bg-primary/30 cursor-pointer transition-all duration-200 hover:scale-105 px-3 py-1"
            >
              {filter}
              <span className="ml-2 text-xs hover:text-red-400 transition-colors">×</span>
            </Badge>
          ))}
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all">
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
}

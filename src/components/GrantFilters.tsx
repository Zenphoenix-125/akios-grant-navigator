
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
    <div className="space-y-4 animate-fade-in">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search grants by title, agency, or keyword..."
            className="pl-10 bg-background/50 border-border/50 focus:border-primary/50"
          />
        </div>
        
        <div className="flex gap-2">
          <Select>
            <SelectTrigger className="w-48 bg-background/50 border-border/50">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="bg-background border-border/50">
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="education">Education</SelectItem>
              <SelectItem value="health">Health</SelectItem>
              <SelectItem value="infrastructure">Infrastructure</SelectItem>
              <SelectItem value="cultural">Cultural</SelectItem>
              <SelectItem value="economic">Economic Development</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-48 bg-background/50 border-border/50">
              <SelectValue placeholder="Grant Size" />
            </SelectTrigger>
            <SelectContent className="bg-background border-border/50">
              <SelectItem value="all">All Sizes</SelectItem>
              <SelectItem value="small">Under $50K</SelectItem>
              <SelectItem value="medium">$50K - $500K</SelectItem>
              <SelectItem value="large">$500K - $1M</SelectItem>
              <SelectItem value="major">Over $1M</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon" className="border-border/50">
            <SlidersHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {activeFilters.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {activeFilters.map((filter) => (
            <Badge 
              key={filter}
              variant="secondary" 
              className="bg-primary/20 text-primary hover:bg-primary/30 cursor-pointer"
            >
              {filter}
              <span className="ml-1 text-xs">×</span>
            </Badge>
          ))}
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
}

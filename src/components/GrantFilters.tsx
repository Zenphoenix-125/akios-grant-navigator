
import { Search, Filter, SlidersHorizontal, Bookmark, Plus } from "lucide-react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const activeFilters = [
  "Education",
  "Health", 
  "Match Required",
  "> $100K"
];

const savedFilters = [
  "Health Grants over $100K",
  "Education - No Match Required",
  "Infrastructure - High Priority",
  "Cultural Preservation Grants"
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
              <SelectItem value="education">📚 Education</SelectItem>
              <SelectItem value="health">🏥 Health</SelectItem>
              <SelectItem value="infrastructure">🏗️ Infrastructure</SelectItem>
              <SelectItem value="cultural">🎭 Cultural</SelectItem>
              <SelectItem value="economic">💼 Economic Development</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-52 h-12 bg-background/60 backdrop-blur-sm border-border/40 hover:border-primary/40 transition-all">
              <SelectValue placeholder="Grant Size" />
            </SelectTrigger>
            <SelectContent className="bg-background/95 backdrop-blur-xl border-border/50">
              <SelectItem value="all">All Sizes</SelectItem>
              <SelectItem value="small">💰 Under $50K</SelectItem>
              <SelectItem value="medium">💵 $50K - $500K</SelectItem>
              <SelectItem value="large">💸 $500K - $1M</SelectItem>
              <SelectItem value="major">🏆 Over $1M</SelectItem>
            </SelectContent>
          </Select>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-12 px-4 bg-background/60 backdrop-blur-sm border-border/40 hover:border-primary/40 hover:bg-primary/10 transition-all">
                <Bookmark className="w-4 h-4 mr-2" />
                Saved Filters
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 bg-background/95 backdrop-blur-xl border-border/50">
              {savedFilters.map((filter) => (
                <DropdownMenuItem key={filter} className="hover:bg-primary/10">
                  {filter}
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem className="text-primary hover:bg-primary/10">
                <Plus className="w-4 h-4 mr-2" />
                Save Current Filter
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" size="icon" className="h-12 w-12 border-border/40 bg-background/60 backdrop-blur-sm hover:border-primary/40 hover:bg-primary/10 transition-all">
            <SlidersHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="flex items-center gap-3 flex-wrap p-4 bg-background/30 backdrop-blur-sm rounded-xl border border-border/30">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Active filters:</span>
          </div>
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

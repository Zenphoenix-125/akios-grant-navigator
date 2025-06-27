
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    </div>
  );
}

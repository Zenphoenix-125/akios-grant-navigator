import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGrantCategories } from "@/hooks/useGrantCategories";
import { GrantFilters as GrantFiltersType } from "@/services/api";
import { useState, useEffect } from "react";

interface GrantFiltersProps {
  onFiltersChange: (filters: GrantFiltersType) => void;
  filters: GrantFiltersType;
}

export function GrantFilters({ onFiltersChange, filters }: GrantFiltersProps) {
  const { categories, loading: categoriesLoading } = useGrantCategories();
  const [searchValue, setSearchValue] = useState(filters.search || "");

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      onFiltersChange({ ...filters, search: searchValue || undefined });
    }, 300);

    return () => clearTimeout(timer);
  }, [searchValue, filters, onFiltersChange]);

  const handleCategoryChange = (category: string) => {
    const newCategory = category === "all" ? undefined : category;
    onFiltersChange({ ...filters, category: newCategory });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Main Filter Row */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative group">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="Search grants by title, agency, or keyword..."
            className="pl-12 h-12 bg-background/60 backdrop-blur-sm border-border/40 focus:border-primary/60 focus:bg-background/80 transition-all duration-300 text-foreground placeholder:text-muted-foreground/70"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        
        <div className="flex gap-3">
          <Select 
            value={filters.category || "all"} 
            onValueChange={handleCategoryChange}
            disabled={categoriesLoading}
          >
            <SelectTrigger className="w-52 h-12 bg-background/60 backdrop-blur-sm border-border/40 hover:border-primary/40 transition-all">
              <SelectValue placeholder={categoriesLoading ? "Loading..." : "Category"} />
            </SelectTrigger>
            <SelectContent className="bg-background/95 backdrop-blur-xl border-border/50">
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

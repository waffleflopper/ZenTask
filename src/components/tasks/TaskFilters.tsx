import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useCategories } from "@/hooks/useCategories";
import type { FilterOption, SortOption, SortDirection, Task } from "@/types";

interface TaskFiltersProps {
  filterBy: FilterOption;
  sortBy: SortOption;
  sortDirection: SortDirection;
  onFilterChange: (filter: FilterOption) => void;
  onSortChange: (sort: SortOption) => void;
  onSortDirectionChange: (direction: SortDirection) => void;
  categoryFilter: string | null;
  onCategoryFilterChange: (category: string | null) => void;
  priorityFilter: Task["priority"] | null;
  onPriorityFilterChange: (priority: Task["priority"] | null) => void;
}

export const TaskFilters: React.FC<TaskFiltersProps> = ({
  filterBy,
  sortBy,
  sortDirection,
  onFilterChange,
  onSortChange,
  onSortDirectionChange,
  categoryFilter,
  onCategoryFilterChange,
  priorityFilter,
  onPriorityFilterChange,
}) => {
  const { categories } = useCategories();

  const handleCategoryFilterChange = (value: string) => {
    onCategoryFilterChange(value === "all" ? null : value);
  };

  const handlePriorityFilterChange = (value: string) => {
    onPriorityFilterChange(
      value === "all" ? null : (value as Task["priority"])
    );
  };

  return (
    <div className="flex space-x-4 mb-8 gap-4">
      <FilterSelect
        label="Filter by"
        value={filterBy}
        onValueChange={(value) => onFilterChange(value as FilterOption)}
        options={[
          { value: "all", label: "All" },
          { value: "completed", label: "Completed" },
          { value: "pending", label: "Pending" },
          { value: "category", label: "Category" },
          { value: "dueDate", label: "Due Date" },
          { value: "priority", label: "Priority" },
        ]}
      />

      {filterBy === "category" && (
        <FilterSelect
          label="Select Category"
          value={categoryFilter ?? "all"}
          onValueChange={handleCategoryFilterChange}
          options={[
            { value: "all", label: "All Categories" },
            ...categories.map((category) => ({
              value: category.name,
              label: category.name,
            })),
          ]}
        />
      )}

      {filterBy === "priority" && (
        <FilterSelect
          label="Select Priority"
          value={priorityFilter ?? "all"}
          onValueChange={handlePriorityFilterChange}
          options={[
            { value: "all", label: "All Priorities" },
            { value: "low", label: "Low" },
            { value: "medium", label: "Medium" },
            { value: "high", label: "High" },
          ]}
        />
      )}

      <FilterSelect
        label="Sort by"
        value={sortBy}
        onValueChange={(value) => onSortChange(value as SortOption)}
        options={[
          { value: "dueDate", label: "Due Date" },
          { value: "priority", label: "Priority" },
          { value: "category", label: "Category" },
          { value: "name", label: "Name" },
        ]}
      />

      <FilterSelect
        label="Sort Direction"
        value={sortDirection}
        onValueChange={(value) => onSortDirectionChange(value as SortDirection)}
        options={[
          { value: "asc", label: "Ascending" },
          { value: "desc", label: "Descending" },
        ]}
      />
    </div>
  );
};

interface FilterSelectProps {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  options: { value: string; label: string }[];
}

const FilterSelect: React.FC<FilterSelectProps> = ({
  label,
  value,
  onValueChange,
  options,
}) => (
  <div className="w-full">
    <Label htmlFor={`${label.toLowerCase()}-select`}>{label}</Label>
    <Select
      value={value}
      onValueChange={onValueChange}>
      <SelectTrigger id={`${label.toLowerCase()}-select`}>
        <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

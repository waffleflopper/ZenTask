import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import type { FilterOption, SortOption, SortDirection } from "@/types";

interface TaskFiltersProps {
  filterBy: FilterOption;
  sortBy: SortOption;
  sortDirection: SortDirection;
  onFilterChange: (filter: FilterOption) => void;
  onSortChange: (sort: SortOption) => void;
  onSortDirectionChange: (direction: SortDirection) => void;
}

export const TaskFilters: React.FC<TaskFiltersProps> = ({
  filterBy,
  sortBy,
  sortDirection,
  onFilterChange,
  onSortChange,
  onSortDirectionChange,
}) => {
  return (
    <div className="flex space-x-4 mb-8 gap-4">
      <div className="w-full">
        <Label htmlFor="filter-select">Filter by</Label>
        <Select
          value={filterBy}
          onValueChange={onFilterChange}>
          <SelectTrigger id="filter-select">
            <SelectValue placeholder="Select a filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="category">Category</SelectItem>
            <SelectItem value="dueDate">Due Date</SelectItem>
            <SelectItem value="priority">Priority</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="w-full">
        <Label htmlFor="sort-select">Sort by</Label>
        <Select
          value={sortBy}
          onValueChange={onSortChange}>
          <SelectTrigger id="sort-select">
            <SelectValue placeholder="Select a sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dueDate">Due Date</SelectItem>
            <SelectItem value="priority">Priority</SelectItem>
            <SelectItem value="category">Category</SelectItem>
            <SelectItem value="name">Name</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="w-full">
        <Label htmlFor="sort-direction-select">Sort Direction</Label>
        <Select
          value={sortDirection}
          onValueChange={onSortDirectionChange}>
          <SelectTrigger id="sort-direction-select">
            <SelectValue placeholder="Select a sort direction" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Ascending</SelectItem>
            <SelectItem value="desc">Descending</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

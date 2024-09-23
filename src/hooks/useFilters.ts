import { useMemo } from "react";
import type { FilterOption, SortDirection, SortOption, Task } from "@/types";

export const useFilters = () => {
  const filterTasks = (
    tasks: Task[],
    filterBy: FilterOption,
    categoryFilter: string | null,
    priorityFilter: Task["priority"] | null
  ) => {
    return tasks.filter((task) => {
      if (filterBy === "completed") return task.completed;
      if (filterBy === "pending") return !task.completed;
      if (filterBy === "category")
        return categoryFilter === null || task.category === categoryFilter;
      if (filterBy === "priority")
        return priorityFilter === null || task.priority === priorityFilter;
      return true;
    });
  };

  const sortTasks = (
    tasks: Task[],
    sortBy: SortOption,
    direction: SortDirection = "asc"
  ) => {
    const sortedTasks = [...tasks].sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case "name":
          comparison = a.title.localeCompare(b.title);
          break;
        case "category":
          comparison = a.category.localeCompare(b.category);
          break;
        case "priority": {
          const priorityOrder = { low: 1, medium: 2, high: 3 };
          comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
          break;
        }
        case "dueDate":
          comparison =
            new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
          break;
      }
      return direction === "asc" ? comparison : comparison * -1;
    });

    return sortedTasks;
  };

  const applyFiltersAndSort = useMemo(
    () =>
      (
        tasks: Task[],
        filterBy: FilterOption,
        categoryFilter: string | null,
        priorityFilter: Task["priority"] | null,
        sortBy: SortOption,
        sortDirection: SortDirection
      ) => {
        const filteredTasks = filterTasks(
          tasks,
          filterBy,
          categoryFilter,
          priorityFilter
        );
        return sortTasks(filteredTasks, sortBy, sortDirection);
      },
    []
  );

  return {
    filterTasks,
    sortTasks,
    applyFiltersAndSort,
  };
};

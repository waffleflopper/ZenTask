import React from "react";
import TaskItem from "./TaskItem";
import { useTasks } from "@/hooks/useTasks";
import { useFilters } from "@/hooks/useFilters";
import type { Task, FilterOption, SortOption, SortDirection } from "@/types";

interface TaskListProps {
  filterBy: FilterOption;
  sortBy: SortOption;
  sortDirection: SortDirection;
  limitBy?: number;
}

export const TaskList: React.FC<TaskListProps> = ({
  filterBy,
  sortBy,
  sortDirection,
  limitBy,
}) => {
  const { tasks, toggleTaskCompletion, deleteTask } = useTasks();
  const { applyFiltersAndSort } = useFilters();

  const filteredAndSortedTasks = applyFiltersAndSort(
    tasks,
    filterBy,
    undefined,
    sortBy,
    sortDirection
  );
  const tasksToDisplay = limitBy
    ? filteredAndSortedTasks.slice(0, limitBy)
    : filteredAndSortedTasks;

  return (
    <ul className="space-y-2">
      {tasksToDisplay.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={toggleTaskCompletion}
          onDelete={deleteTask}
        />
      ))}
    </ul>
  );
};

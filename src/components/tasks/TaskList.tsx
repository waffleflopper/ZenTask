import React from "react";
import TaskItem from "./TaskItem";
import { useTasks } from "@/hooks/useTasks";
import { useFilters } from "@/hooks/useFilters";
import type { FilterOption, SortOption, SortDirection, Task } from "@/types";

interface TaskListProps {
  filterBy: FilterOption;
  sortBy: SortOption;
  sortDirection: SortDirection;
  limitBy?: number;
  categoryFilter: string | null;
  priorityFilter: Task["priority"] | null;
}

export const TaskList: React.FC<TaskListProps> = ({
  filterBy,
  sortBy,
  sortDirection,
  limitBy,
  categoryFilter,
  priorityFilter,
}) => {
  const { tasks, toggleTaskCompletion, deleteTask, updateTask } = useTasks();
  const { applyFiltersAndSort } = useFilters();

  const filteredAndSortedTasks = applyFiltersAndSort(
    tasks,
    filterBy,
    categoryFilter,
    priorityFilter,
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
          onToggle={() => toggleTaskCompletion(task.id)}
          onDelete={() => deleteTask(task.id)}
          onEdit={(updates) => updateTask(task.id, updates)}
        />
      ))}
    </ul>
  );
};

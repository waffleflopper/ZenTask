import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TaskList } from "../tasks/TaskList";
import { TaskStats } from "../tasks/TaskStats";
import { TaskFilters } from "../tasks/TaskFilters";
import { ActionCenter } from "@/components/dashboard/ActionCenter";
import { MetricsCard } from "@/components/dashboard/MetricsCard";
import { useTasks } from "@/hooks/useTasks";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { TaskForm } from "@/components/tasks/TaskForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { FilterOption, SortOption, SortDirection, Task } from "@/types";

export const Dashboard: React.FC = () => {
  const { tasks, addTask } = useTasks();
  const [filterBy, setFilterBy] = React.useState<FilterOption>("all");
  const [sortBy, setSortBy] = React.useState<SortOption>("dueDate");
  const [sortDirection, setSortDirection] =
    React.useState<SortDirection>("asc");
  const [isAddingTask, setIsAddingTask] = React.useState(false);
  const [categoryFilter, setCategoryFilter] = React.useState<string | null>(
    null
  );
  const [priorityFilter, setPriorityFilter] = React.useState<
    Task["priority"] | null
  >(null);

  const handleAddTask = (
    taskData: Omit<Task, "id" | "completed" | "dateCompleted">
  ) => {
    addTask(taskData);
    setIsAddingTask(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Button onClick={() => setIsAddingTask(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Task
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TaskStats tasks={tasks} />
        <ActionCenter tasks={tasks} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricsCard
          title="Overdue Tasks"
          value={
            tasks.filter(
              (t) => new Date(t.dueDate) < new Date() && !t.completed
            ).length
          }
        />
        <MetricsCard
          title="Due Today"
          value={
            tasks.filter(
              (t) =>
                new Date(t.dueDate).toDateString() ===
                  new Date().toDateString() && !t.completed
            ).length
          }
        />
        <MetricsCard
          title="Completed Today"
          value={
            tasks.filter(
              (t) =>
                t.completed &&
                new Date(t.dueDate).toDateString() === new Date().toDateString()
            ).length
          }
        />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>My Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <TaskFilters
            filterBy={filterBy}
            sortBy={sortBy}
            sortDirection={sortDirection}
            onFilterChange={setFilterBy}
            onSortChange={setSortBy}
            onSortDirectionChange={setSortDirection}
            categoryFilter={categoryFilter}
            onCategoryFilterChange={setCategoryFilter}
            priorityFilter={priorityFilter}
            onPriorityFilterChange={setPriorityFilter}
          />
          <TaskList
            filterBy={filterBy}
            sortBy={sortBy}
            sortDirection={sortDirection}
            categoryFilter={categoryFilter}
            priorityFilter={priorityFilter}
          />
        </CardContent>
      </Card>

      <Dialog
        open={isAddingTask}
        onOpenChange={setIsAddingTask}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Task</DialogTitle>
          </DialogHeader>
          <TaskForm
            onSubmit={handleAddTask}
            onCancel={() => setIsAddingTask(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

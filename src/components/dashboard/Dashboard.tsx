import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TaskList } from "../tasks/TaskList";
import { TaskStats } from "../tasks/TaskStats";
import { TaskFilters } from "../tasks/TaskFilters";
import { ActionCenter } from "@/components/dashboard/ActionCenter";
import { MetricsCard } from "@/components/dashboard/MetricsCard";
import { useTasks } from "@/hooks/useTasks";
import type { FilterOption, SortOption, SortDirection } from "@/types";

export const Dashboard: React.FC = () => {
  const { tasks } = useTasks();
  const [filterBy, setFilterBy] = React.useState<FilterOption>("all");
  const [sortBy, setSortBy] = React.useState<SortOption>("dueDate");
  const [sortDirection, setSortDirection] =
    React.useState<SortDirection>("asc");

  return (
    <div className="space-y-6">
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
          />
          <TaskList
            filterBy={filterBy}
            sortBy={sortBy}
            sortDirection={sortDirection}
          />
        </CardContent>
      </Card>
    </div>
  );
};

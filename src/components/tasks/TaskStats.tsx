import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import type { Task } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TaskStatsProps {
  tasks: Task[];
}

type TaskFilter = "all" | "completed" | "pending";

export const TaskStats: React.FC<TaskStatsProps> = ({ tasks }) => {
  const [taskFilter, setTaskFilter] = useState<TaskFilter>("all");

  const stats = useMemo(() => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((task) => task.completed).length;
    const pendingTasks = totalTasks - completedTasks;

    const getFilteredTasks = (filter: TaskFilter) => {
      switch (filter) {
        case "completed":
          return tasks.filter((task) => task.completed);
        case "pending":
          return tasks.filter((task) => !task.completed);
        default:
          return tasks;
      }
    };

    const filteredTasks = getFilteredTasks(taskFilter);

    const priorityCounts = filteredTasks.reduce((acc, task) => {
      acc[task.priority] = (acc[task.priority] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const chartData = [
      { name: "Low", value: priorityCounts.low || 0, priority: "low" },
      { name: "Medium", value: priorityCounts.medium || 0, priority: "medium" },
      { name: "High", value: priorityCounts.high || 0, priority: "high" },
    ];

    return { totalTasks, completedTasks, pendingTasks, chartData };
  }, [tasks, taskFilter]);

  const getColorForPriority = (priority: string) => {
    switch (priority) {
      case "low":
        return "hsl(var(--accent))";
      case "medium":
        return "hsl(var(--secondary))";
      case "high":
        return "hsl(var(--primary))";
      default:
        return "hsl(var(--muted))";
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Task Statistics</CardTitle>
        <Select
          value={taskFilter}
          onValueChange={(value: TaskFilter) => setTaskFilter(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter tasks" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tasks</SelectItem>
            <SelectItem value="completed">Completed Tasks</SelectItem>
            <SelectItem value="pending">Pending Tasks</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">
              {stats.totalTasks}
            </p>
            <p className="text-sm text-muted-foreground">Total Tasks</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-500">
              {stats.completedTasks}
            </p>
            <p className="text-sm text-muted-foreground">Completed</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-500">
              {stats.pendingTasks}
            </p>
            <p className="text-sm text-muted-foreground">Pending</p>
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer
            width="100%"
            height="100%">
            <BarChart data={stats.chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-popover p-2 rounded shadow">
                        <p className="font-semibold">{`${data.name} Priority`}</p>
                        <p>{`Tasks: ${data.value}`}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="value">
                {stats.chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={getColorForPriority(entry.priority)}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-sm text-center mt-2 text-muted-foreground">
          {taskFilter === "all"
            ? "All Tasks"
            : taskFilter === "completed"
            ? "Completed Tasks"
            : "Pending Tasks"}{" "}
          by Priority
        </p>
      </CardContent>
    </Card>
  );
};

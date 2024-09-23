import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Task } from "@/types";
import { format, isToday, isTomorrow, isThisWeek, isPast } from "date-fns";
import { CheckCircle, AlertCircle, Clock, Check } from "lucide-react";
import { useTasks } from "@/hooks/useTasks";

interface ActionCenterProps {
  tasks: Task[];
}

export const ActionCenter: React.FC<ActionCenterProps> = ({ tasks }) => {
  const { toggleTaskCompletion } = useTasks();

  const sortedTasks = [...tasks].sort(
    (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  );

  const getTaskStatus = (task: Task) => {
    const dueDate = new Date(task.dueDate);
    if (task.completed) return "completed";
    if (isPast(dueDate)) return "overdue";
    if (isToday(dueDate)) return "dueToday";
    if (isTomorrow(dueDate)) return "dueTomorrow";
    if (isThisWeek(dueDate)) return "dueThisWeek";
    return "upcoming";
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "overdue":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-500" />;
    }
  };

  const renderTask = (task: Task) => {
    const status = getTaskStatus(task);
    return (
      <div
        key={task.id}
        className="flex items-center justify-between p-2 hover:bg-accent rounded-md">
        <div className="flex items-center space-x-2">
          {getStatusIcon(status)}
          <span
            className={`font-medium ${
              task.completed ? "line-through text-muted-foreground" : ""
            }`}>
            {task.title}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            {format(new Date(task.dueDate), "MMM d")}
          </span>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => toggleTaskCompletion(task.id)}>
            <Check className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  };

  const overdueTask = sortedTasks.find(
    (task) => !task.completed && isPast(new Date(task.dueDate))
  );
  const todayTasks = sortedTasks.filter(
    (task) => !task.completed && isToday(new Date(task.dueDate))
  );
  const tomorrowTasks = sortedTasks.filter(
    (task) => !task.completed && isTomorrow(new Date(task.dueDate))
  );
  const upcomingTasks = sortedTasks.filter(
    (task) =>
      !task.completed &&
      isThisWeek(new Date(task.dueDate)) &&
      !isToday(new Date(task.dueDate)) &&
      !isTomorrow(new Date(task.dueDate))
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Action Center</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[350px] pr-4">
          {overdueTask && (
            <div className="mb-4">
              <h3 className="font-semibold text-red-500 mb-2">Overdue</h3>
              {renderTask(overdueTask)}
            </div>
          )}
          {todayTasks.length > 0 && (
            <div className="mb-4">
              <h3 className="font-semibold text-yellow-500 mb-2">Due Today</h3>
              {todayTasks.map(renderTask)}
            </div>
          )}
          {tomorrowTasks.length > 0 && (
            <div className="mb-4">
              <h3 className="font-semibold text-blue-500 mb-2">Due Tomorrow</h3>
              {tomorrowTasks.map(renderTask)}
            </div>
          )}
          {upcomingTasks.length > 0 && (
            <div>
              <h3 className="font-semibold text-green-500 mb-2">
                Coming Up This Week
              </h3>
              {upcomingTasks.map(renderTask)}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

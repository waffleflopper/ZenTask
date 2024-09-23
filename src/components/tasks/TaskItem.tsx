import React from "react";
import { Checkbox } from "@/components/common/Checkbox";
import { Button } from "@/components/ui/button";
import { Trash, Edit } from "lucide-react";
import type { Task } from "@/types";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { format } from "date-fns";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggle,
  onDelete,
  onEdit,
}) => {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "rounded-lg p-3 flex space-x-4 items-center border-l-4 hover:shadow-md transition-all duration-150 shadow-sm",
        {
          "border-priority-low hover:bg-priority-low/10":
            task.priority === "low",
          "border-priority-medium hover:bg-priority-medium/10":
            task.priority === "medium",
          "border-priority-high hover:bg-priority-high/10":
            task.priority === "high",
          "text-muted-foreground": task.completed,
        }
      )}>
      <Checkbox
        checked={task.completed}
        onCheckedChange={() => onToggle(task.id)}
        className="flex-shrink-0"
      />
      <div className="flex-grow flex justify-between items-center">
        <div>
          <div className="text-sm font-medium">{task.title}</div>
          <div className="text-xs text-muted-foreground">#{task.category}</div>
          {task.completed && task.dateCompleted && (
            <div className="text-xs text-muted-foreground">
              Completed on:{" "}
              {format(new Date(task.dateCompleted), "MMM d, yyyy")}
            </div>
          )}
        </div>
        <div>
          <Button
            variant="outline"
            size="icon"
            className="mr-2"
            onClick={() => onEdit(task)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onDelete(task.id)}>
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.li>
  );
};

export default TaskItem;

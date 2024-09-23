import { useAtom } from "jotai";
import {
  tasksAtom,
  addTaskAtom,
  toggleTaskCompletionAtom,
  updateTaskAtom,
  deleteTaskAtom,
} from "@/store/taskAtoms";
import type { Task } from "@/types";

export const useTasks = () => {
  const [tasks] = useAtom(tasksAtom);
  const [, addTask] = useAtom(addTaskAtom);
  const [, updateTask] = useAtom(updateTaskAtom);
  const [, deleteTask] = useAtom(deleteTaskAtom);
  const [, toggleCompletion] = useAtom(toggleTaskCompletionAtom);

  return {
    tasks,
    addTask: (task: Omit<Task, "id" | "completed" | "dateCompleted">) =>
      addTask({ ...task, completed: false, dateCompleted: undefined }),
    updateTask,
    deleteTask,
    toggleTaskCompletion: toggleCompletion,
  };
};

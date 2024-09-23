import { useState, useEffect } from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import {
  addTask,
  updateTask,
  deleteTask,
  getTasks,
} from "@/firebase/firestore";
import { FirestoreTask, Task } from "@/types";

// Helper function to convert Firestore timestamps to Date objects
const convertTimestamps = (task: FirestoreTask): Task => ({
  ...task,
  dueDate: task.dueDate instanceof Date ? task.dueDate : task.dueDate.toDate(),
  dateCompleted:
    task.dateCompleted instanceof Date
      ? task.dateCompleted
      : task.dateCompleted?.toDate() ?? null,
});

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { user } = useAuthContext();

  useEffect(() => {
    if (user) {
      const fetchTasks = async () => {
        const fetchedTasks = await getTasks(user.uid);
        setTasks(
          fetchedTasks.map((task) => convertTimestamps(task as FirestoreTask))
        );
      };
      fetchTasks();
    } else {
      setTasks([]);
    }
  }, [user]);

  const addNewTask = async (
    task: Omit<Task, "id" | "completed" | "dateCompleted">
  ) => {
    if (user) {
      const newTask = await addTask(user.uid, {
        ...task,
        completed: false,
        dueDate:
          task.dueDate instanceof Date ? task.dueDate : new Date(task.dueDate),
        dateCompleted: null,
      });
      setTasks((prevTasks) => [
        ...prevTasks,
        convertTimestamps(newTask as FirestoreTask),
      ]);
    }
  };

  const updateExistingTask = async (
    taskId: string,
    updates: Partial<Omit<Task, "id">>
  ) => {
    if (!updates || Object.keys(updates).length === 0) {
      console.warn("No updates provided to updateExistingTask");
      return;
    }

    const updatesToSend: Partial<Omit<Task, "id">> = {};

    (Object.keys(updates) as Array<keyof Omit<Task, "id">>).forEach((k) => {
      if (k === "dueDate" || k === "dateCompleted") {
        if (updates[k] instanceof Date) {
          updatesToSend[k] = updates[k] as Date;
        } else if (typeof updates[k] === "string") {
          updatesToSend[k] = new Date(updates[k] as string);
        }
      } else if (updates[k] !== undefined) {
        switch (k) {
          case "title":
          case "details":
          case "category":
            if (typeof updates[k] === "string") {
              updatesToSend[k] = updates[k] as string;
            }
            break;
          case "priority":
            if (
              typeof updates[k] === "string" &&
              ["low", "medium", "high"].includes(updates[k] as string)
            ) {
              updatesToSend[k] = updates[k] as "low" | "medium" | "high";
            }
            break;
          case "completed":
            if (typeof updates[k] === "boolean") {
              updatesToSend[k] = updates[k] as boolean;
            }
            break;
        }
      }
    });

    if (Object.keys(updatesToSend).length === 0) {
      console.warn("No valid updates provided to updateExistingTask");
      return;
    }

    try {
      await updateTask(taskId, updatesToSend);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, ...updatesToSend } : task
        )
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteExistingTask = async (taskId: string) => {
    await deleteTask(taskId);
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const toggleTaskCompletion = async (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      const updates = {
        completed: !task.completed,
        dateCompleted: !task.completed ? new Date() : null,
      };
      await updateExistingTask(taskId, updates);
    }
  };

  return {
    tasks,
    addTask: addNewTask,
    updateTask: updateExistingTask,
    deleteTask: deleteExistingTask,
    toggleTaskCompletion,
  };
};

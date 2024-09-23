import { useState, useEffect } from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import {
  addTask,
  updateTask,
  deleteTask,
  getTasks,
} from "@/firebase/firestore";
import { Task } from "@/types";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { user } = useAuthContext();

  useEffect(() => {
    if (user) {
      const fetchTasks = async () => {
        const fetchedTasks = await getTasks(user.uid);
        setTasks(fetchedTasks);
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
      });
      setTasks((prevTasks) => [...prevTasks, newTask]);
    }
  };
  const updateExistingTask = async (taskId: string, updates: Partial<Task>) => {
    await updateTask(taskId, updates);
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, ...updates } : task
      )
    );
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
        dateCompleted: !task.completed ? new Date() : undefined,
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

import { useAtom } from "jotai";
import { tasksAtom } from "@/store/taskAtoms";
import { useEffect, useCallback } from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import {
  getTasks,
  addTask as addTaskToFirestore,
  updateTask as updateTaskInFirestore,
  deleteTask as deleteTaskFromFirestore,
} from "@/firebase/firestore";
import type { Task, FirestoreTask } from "@/types";
import { Timestamp } from "firebase/firestore";

const convertToDate = (
  dateOrTimestamp: Date | Timestamp | null
): Date | null => {
  if (dateOrTimestamp instanceof Timestamp) {
    return dateOrTimestamp.toDate();
  }
  return dateOrTimestamp;
};

const convertFirestoreTaskToTask = (firestoreTask: FirestoreTask): Task => ({
  ...firestoreTask,
  dueDate: convertToDate(firestoreTask.dueDate) as Date,
  dateCompleted: convertToDate(firestoreTask.dateCompleted),
});

export const useTasks = () => {
  const [tasks, setTasks] = useAtom(tasksAtom);
  const { user } = useAuthContext();

  useEffect(() => {
    if (user) {
      const fetchTasks = async () => {
        const fetchedTasks = await getTasks(user.uid);
        setTasks(fetchedTasks.map(convertFirestoreTaskToTask));
      };
      fetchTasks();
    } else {
      setTasks([]);
    }
  }, [user, setTasks]);

  const addTask = useCallback(
    async (task: Omit<Task, "id" | "completed" | "dateCompleted">) => {
      if (user) {
        const newFirestoreTask = await addTaskToFirestore(user.uid, {
          ...task,
          completed: false,
          dateCompleted: null,
        });
        const newTask = convertFirestoreTaskToTask(newFirestoreTask);
        setTasks((prevTasks) => [...prevTasks, newTask]);
      }
    },
    [user, setTasks]
  );

  const updateTask = useCallback(
    async (taskId: string, updates: Partial<Omit<Task, "id">>) => {
      if (user) {
        await updateTaskInFirestore(taskId, updates);
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === taskId ? { ...task, ...updates } : task
          )
        );
      }
    },
    [user, setTasks]
  );

  const deleteTask = useCallback(
    async (taskId: string) => {
      if (user) {
        await deleteTaskFromFirestore(taskId);
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      }
    },
    [user, setTasks]
  );

  const toggleTaskCompletion = useCallback(
    async (taskId: string) => {
      const task = tasks.find((t) => t.id === taskId);
      if (task && user) {
        const updates = {
          completed: !task.completed,
          dateCompleted: !task.completed ? new Date() : null,
        };
        await updateTaskInFirestore(taskId, updates);
        setTasks((prevTasks) =>
          prevTasks.map((t) => (t.id === taskId ? { ...t, ...updates } : t))
        );
      }
    },
    [tasks, user, setTasks]
  );

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
  };
};

import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import { FirestoreTask, Task } from "@/types";

export const addTask = async (
  userId: string,
  task: Omit<Task, "id">
): Promise<FirestoreTask> => {
  const tasksCollection = collection(db, "tasks");
  const docRef = await addDoc(tasksCollection, {
    ...task,
    userId,
    dueDate: Timestamp.fromDate(task.dueDate),
    dateCompleted: task.dateCompleted
      ? Timestamp.fromDate(task.dateCompleted)
      : null,
  });
  return { ...task, id: docRef.id } as FirestoreTask;
};

export const updateTask = async (taskId: string, updates: Partial<Task>) => {
  const taskRef = doc(db, "tasks", taskId);
  const updatesToSend = {
    ...updates,
    dueDate: updates.dueDate ? Timestamp.fromDate(updates.dueDate) : undefined,
    dateCompleted: updates.dateCompleted
      ? Timestamp.fromDate(updates.dateCompleted)
      : null,
  };
  await updateDoc(taskRef, updatesToSend);
};

export const deleteTask = async (taskId: string) => {
  const taskRef = doc(db, "tasks", taskId);
  await deleteDoc(taskRef);
};

export const getTasks = async (userId: string): Promise<Task[]> => {
  const tasksCollection = collection(db, "tasks");
  const q = query(tasksCollection, where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      dueDate: data.dueDate.toDate(),
      dateCompleted: data.dateCompleted ? data.dateCompleted.toDate() : null,
    } as Task;
  });
};

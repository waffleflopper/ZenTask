import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { Task } from "@/types";

export const addTask = async (userId: string, task: Omit<Task, "id">) => {
  const taskCollection = collection(db, "tasks");
  const docRef = await addDoc(taskCollection, { ...task, userId });
  return { ...task, id: docRef.id };
};

export const updateTask = async (taskId: string, updates: Partial<Task>) => {
  const taskRef = doc(db, "tasks", taskId);
  await updateDoc(taskRef, updates);
};

export const deleteTask = async (taskId: string) => {
  const taskRef = doc(db, "tasks", taskId);
  await deleteDoc(taskRef);
};

export const getTasks = async (userId: string) => {
  const taskCollection = collection(db, "tasks");
  const q = query(taskCollection, where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as Task)
  );
};

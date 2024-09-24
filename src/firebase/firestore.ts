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
import { FirestoreTask } from "@/types";

export const addTask = async (
  userId: string,
  task: Omit<FirestoreTask, "id">
): Promise<FirestoreTask> => {
  const tasksCollection = collection(db, "tasks");
  const docRef = await addDoc(tasksCollection, {
    ...task,
    userId,
  });
  return { ...task, id: docRef.id } as FirestoreTask;
};

export const updateTask = async (
  taskId: string,
  updates: Partial<FirestoreTask>
) => {
  const taskRef = doc(db, "tasks", taskId);
  const updatesToSend: Partial<FirestoreTask> = {};

  (Object.keys(updates) as Array<keyof FirestoreTask>).forEach((key) => {
    const value = updates[key];
    if (value !== undefined) {
      switch (key) {
        case "dueDate":
          updatesToSend[key] =
            value instanceof Date
              ? Timestamp.fromDate(value)
              : (value as Timestamp);
          break;
        case "dateCompleted":
          if (value === null) {
            updatesToSend[key] = null;
          } else {
            updatesToSend[key] =
              value instanceof Date
                ? Timestamp.fromDate(value)
                : (value as Timestamp);
          }
          break;
        case "title":
          updatesToSend.title = value as string;
          break;
        case "details":
          updatesToSend.details = value as string;
          break;
        case "category":
          updatesToSend.category = value as string;
          break;
        case "priority":
          updatesToSend.priority = value as "low" | "medium" | "high";
          break;
        case "completed":
          updatesToSend.completed = value as boolean;
          break;
        // Ignore id and any other fields
        default:
          break;
      }
    }
  });

  await updateDoc(taskRef, updatesToSend);
};

export const deleteTask = async (taskId: string) => {
  const taskRef = doc(db, "tasks", taskId);
  await deleteDoc(taskRef);
};

export const getTasks = async (userId: string): Promise<FirestoreTask[]> => {
  const tasksCollection = collection(db, "tasks");
  const q = query(tasksCollection, where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
    } as FirestoreTask;
  });
};

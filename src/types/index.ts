import { Timestamp } from "firebase/firestore";

export interface Task {
  id: string;
  title: string;
  details?: string;
  category: string;
  dueDate: Date;
  priority: "low" | "medium" | "high";
  completed: boolean;
  dateCompleted?: Date | null;
}

export type ThemeMode = "light" | "dark" | "system";

export interface UIState {
  darkMode: ThemeMode;
  showCompleted: boolean;
  showOverdue: boolean;
}

export interface Category {
  id: string;
  name: string;
}

export type SortOption = "name" | "category" | "dueDate" | "priority";
export type SortDirection = "asc" | "desc";
export type FilterOption =
  | "all"
  | "completed"
  | "pending"
  | "category"
  | "priority"
  | "dueDate";

export interface FirestoreTask extends Omit<Task, "dueDate" | "dateCompleted"> {
  dueDate: Date | Timestamp;
  dateCompleted: Date | Timestamp | null;
}

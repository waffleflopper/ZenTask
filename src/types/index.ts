import { Timestamp } from "firebase/firestore";

export interface BaseTask {
  id: string;
  title: string;
  details?: string;
  category: string;
  priority: "low" | "medium" | "high";
  completed: boolean;
}

export interface Task extends BaseTask {
  dueDate: Date;
  dateCompleted: Date | null;
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

export interface FirestoreTask extends BaseTask {
  dueDate: Date | Timestamp;
  dateCompleted: Date | Timestamp | null;
}

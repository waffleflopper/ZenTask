import { atom } from "jotai";
import type { Task, Category } from "../types";

//TASKS RELATED
const initialTasks: Task[] = [
  {
    id: "1",
    title: "Add local storage syncing",
    details: "Details of task 1",
    category: "Work",
    dueDate: new Date("2024-07-03"),
    priority: "high",
    completed: false,
  },
  {
    id: "2",
    title: "implement pocketbase or something",
    details: "Details of task 2",
    category: "Personal",
    dueDate: new Date("2024-07-02"),
    priority: "medium",
    completed: false,
  },
  {
    id: "3",
    title: "user system w/ auth",
    details: "Details of task 3",
    category: "Other",
    dueDate: new Date("2024-07-01"),
    priority: "low",
    completed: false,
  },
  {
    id: "4",
    title: "create an action center",
    details: "Details of task 4",
    category: "Work",
    dueDate: new Date("2024-07-04"),
    priority: "low",
    completed: true,
    dateCompleted: new Date("2024-07-04"),
  },
  {
    id: "5",
    title: "introduce a lot more customizability",
    details: "Details of task 5",
    category: "Personal",
    dueDate: new Date("2024-07-05"),
    priority: "medium",
    completed: false,
  },
  {
    id: "6",
    title: "theming",
    details: "Details of task 6",
    category: "Work",
    dueDate: new Date("2024-07-06"),
    priority: "high",
    completed: false,
  },
  {
    id: "7",
    title: "refactor some of my aweful code lol",
    details: "Details of task 7",
    category: "Other",
    dueDate: new Date("2024-07-07"),
    priority: "low",
    completed: false,
  },
  {
    id: "8",
    title: "calendar view",
    details: "Details of task 8",
    category: "Personal",
    dueDate: new Date("2024-07-08"),
    priority: "medium",
    completed: false,
  },
  {
    id: "9",
    title: "implement a side bar",
    details: "Details of task 9",
    category: "Work",
    dueDate: new Date("2024-07-09"),
    priority: "high",
    completed: false,
  },
  {
    id: "10",
    title: "draggable cards to put things were you want them",
    details: "Details of task 10",
    category: "Personal",
    dueDate: new Date("2024-07-10"),
    priority: "low",
    completed: true,
    dateCompleted: new Date("2024-07-10"),
  },
];

export const tasksAtom = atom<Task[]>(initialTasks);

export const addTaskAtom = atom(null, (get, set, newTask: Omit<Task, "id">) => {
  const tasks = get(tasksAtom);
  const task: Task = { ...newTask, id: Date.now().toString() };
  set(tasksAtom, [...tasks, task]);
});

export const updateTaskAtom = atom(
  null,
  (get, set, updatedTask: Partial<Task> & { id: string }) => {
    const tasks = get(tasksAtom);
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id
        ? {
            ...task,
            ...updatedTask,
            dateCompleted: updatedTask.completed
              ? updatedTask.dateCompleted || new Date()
              : undefined,
          }
        : task
    );
    set(tasksAtom, updatedTasks);
  }
);

export const deleteTaskAtom = atom(null, (get, set, taskId: string) => {
  const tasks = get(tasksAtom);
  const updatedTasks = tasks.filter((task) => task.id !== taskId);
  set(tasksAtom, updatedTasks);
});

export const toggleTaskCompletionAtom = atom(
  null,
  (get, set, taskId: string) => {
    const tasks = get(tasksAtom);
    const updatedTasks = tasks.map((task) =>
      task.id === taskId
        ? {
            ...task,
            completed: !task.completed,
            dateCompleted: !task.completed ? new Date() : undefined,
          }
        : task
    );
    set(tasksAtom, updatedTasks);
  }
);

//CATEGORIES RELATED

const initialCategories: Category[] = [
  { id: "1", name: "Work" },
  { id: "2", name: "Personal" },
  { id: "3", name: "Other" },
];

export const categoriesAtom = atom<Category[]>(initialCategories);

export const addCategoryAtom = atom(null, (get, set, newCategory: Category) => {
  const categories = get(categoriesAtom);
  const category: Category = { ...newCategory, id: Date.now().toString() };
  set(categoriesAtom, [...categories, category]);
});

export const updateCategoryAtom = atom(
  null,
  (get, set, updatedCategory: Category) => {
    const categories = get(categoriesAtom);
    const updatedCategories = categories.map((category) =>
      category.id === updatedCategory.id ? updatedCategory : category
    );
    set(categoriesAtom, updatedCategories);
  }
);

export const deleteCategoryAtom = atom(null, (get, set, categoryId: string) => {
  const categories = get(categoriesAtom);
  const updatedCategories = categories.filter(
    (category) => category.id !== categoryId
  );
  set(categoriesAtom, updatedCategories);
});

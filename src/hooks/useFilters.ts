import { useMemo } from "react"
import type { FilterOption, SortDirection, SortOption, Task } from "@/types"

export const useFilters = () => {
  const filterTasks = (
    tasks: Task[],
    filterBy: FilterOption,
    filterValue?: string,
  ) => {
    switch (filterBy) {
      case "completed":
        return tasks.filter(task => task.completed)
      case "pending":
        return tasks.filter(task => !task.completed)
      case "category":
        return tasks.filter(task => task.category === filterValue)
      case "priority":
        return tasks.filter(task => task.priority === filterValue)
      case "dueDate": {
        const filterDate = filterValue ? new Date(filterValue) : new Date()
        return tasks.filter(task => {
          const taskDate = new Date(task.dueDate)
          return taskDate.toDateString() === filterDate.toDateString()
        })
      }
      default:
        return tasks
    }
  }

  const sortTasks = (
    tasks: Task[],
    sortBy: SortOption,
    direction: SortDirection = "asc",
  ) => {
    const sortedTasks = [...tasks].sort((a, b) => {
      let comparison = 0
      switch (sortBy) {
        case "name":
          comparison = a.title.localeCompare(b.title)
          break
        case "category":
          comparison = a.category.localeCompare(b.category)
          break
        case "priority": {
          const priorityOrder = { low: 1, medium: 2, high: 3 }
          comparison = priorityOrder[a.priority] - priorityOrder[b.priority]
          break
        }
        case "dueDate":
          comparison =
            new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
          break
      }
      return direction === "asc" ? comparison : comparison * -1
    })

    return sortedTasks
  }

  const applyFiltersAndSort = useMemo(
    () =>
      (
        tasks: Task[],
        filterBy: FilterOption,
        filterValue: string | undefined,
        sortBy: SortOption,
        sortDirection: SortDirection,
      ) => {
        const filteredTasks = filterTasks(tasks, filterBy, filterValue)
        return sortTasks(filteredTasks, sortBy, sortDirection)
      },
    [],
  )

  return {
    filterTasks,
    sortTasks,
    applyFiltersAndSort,
  }
}

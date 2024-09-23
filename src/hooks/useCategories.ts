import { useAtom } from "jotai";
import {
  categoriesAtom,
  addCategoryAtom,
  updateCategoryAtom,
  deleteCategoryAtom,
} from "@/store/taskAtoms";

export const useCategories = () => {
  const [categories] = useAtom(categoriesAtom);
  const [, addCategory] = useAtom(addCategoryAtom);
  const [, updateCategory] = useAtom(updateCategoryAtom);
  const [, deleteCategory] = useAtom(deleteCategoryAtom);

  return {
    categories,
    addCategory: (name: string) =>
      addCategory({ name, id: Date.now().toString() }),
    updateCategory,
    deleteCategory,
  };
};

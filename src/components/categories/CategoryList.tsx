import React, { useState } from "react";
import { useCategories } from "@/hooks/useCategories";
import { CategoryItem } from "./CategoryItem";
import { CategoryForm } from "./CategoryForm";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import type { Category } from "@/types";

export const CategoryList: React.FC = () => {
  const { categories, addCategory, updateCategory, deleteCategory } =
    useCategories();
  const [isAdding, setIsAdding] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const handleAddCategory = (name: string) => {
    addCategory(name);
    setIsAdding(false);
  };

  const handleUpdateCategory = (category: Category) => {
    updateCategory(category);
    setEditingCategory(null);
  };

  const handleDeleteCategory = (id: string) => {
    deleteCategory(id);
  };

  return (
    <div className="space-y-4">
      {categories.map((category) => (
        <CategoryItem
          key={category.id}
          category={category}
          onEdit={() => setEditingCategory(category)}
          onDelete={() => handleDeleteCategory(category.id)}
        />
      ))}
      {isAdding ? (
        <CategoryForm
          onSubmit={handleAddCategory}
          onCancel={() => setIsAdding(false)}
        />
      ) : (
        <Button
          onClick={() => setIsAdding(true)}
          className="w-full">
          <Plus className="mr-2 h-4 w-4" /> Add Category
        </Button>
      )}
      {editingCategory && (
        <CategoryForm
          initialValue={editingCategory.name}
          onSubmit={(name) =>
            handleUpdateCategory({ ...editingCategory, name })
          }
          onCancel={() => setEditingCategory(null)}
        />
      )}
    </div>
  );
};

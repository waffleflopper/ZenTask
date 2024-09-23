import React from "react";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import type { Category } from "@/types";

interface CategoryItemProps {
  category: Category;
  onEdit: () => void;
  onDelete: () => void;
}

export const CategoryItem: React.FC<CategoryItemProps> = ({
  category,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="flex items-center justify-between p-2 bg-background rounded-md shadow-sm">
      <span className="text-foreground">{category.name}</span>
      <div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onEdit}
          className="mr-2">
          <Edit className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onDelete}>
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

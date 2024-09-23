import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CategoryList } from "./CategoryList";

export const CategoryManagement: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Category Management</CardTitle>
      </CardHeader>
      <CardContent>
        <CategoryList />
      </CardContent>
    </Card>
  );
};

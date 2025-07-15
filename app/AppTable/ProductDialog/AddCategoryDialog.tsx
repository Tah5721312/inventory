"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useProductStore } from "@/app/useProductStore";
import { useToast } from "@/hooks/use-toast";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useAuth } from "@/app/authContext";
import axiosInstance from "@/utils/axiosInstance";

export default function AddCategoryDialog() {
  const [categoryName, setCategoryName] = useState("");
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Button loading state
  const {
    categories,
    addCategory,
    editCategory,
    deleteCategory,
    loadCategories,
  } = useProductStore();
  const { toast } = useToast();
  const { user, isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      loadCategories();
    }
  }, [isLoggedIn, loadCategories]);

  const handleAddCategory = async () => {
    if (categoryName.trim() === "") {
      toast({
        title: "Error",
        description: "Category name cannot be empty",
      });
      return;
    }

    setIsSubmitting(true); // Start loading
    try {
      const response = await axiosInstance.post("/categories", {
        name: categoryName,
        userId: user?.id,
      });

      if (response.status !== 201) {
        throw new Error("Failed to add category");
      }

      const newCategory = response.data;
      addCategory(newCategory);
      setCategoryName("");
      toast({
        title: "Success",
        description: "Category added successfully!",
      });
    } catch (error) {
      console.error("Error adding category:", error);
      toast({
        title: "Error",
        description: "Failed to add category.",
      });
    } finally {
      setIsSubmitting(false); // Stop loading
    }
  };

  const handleEditCategory = async (categoryId: string) => {
    if (newCategoryName.trim() === "") {
      toast({
        title: "Error",
        description: "Category name cannot be empty",
      });
      return;
    }

    setIsSubmitting(true); // Start loading
    try {
      const response = await axiosInstance.put("/categories", {
        id: categoryId,
        name: newCategoryName,
      });

      if (response.status !== 200) {
        throw new Error("Failed to edit category");
      }

      const updatedCategory = response.data;
      editCategory(categoryId, updatedCategory.name);
      setEditingCategory(null);
      setNewCategoryName("");
      toast({
        title: "Success",
        description: "Category edited successfully!",
      });
    } catch (error) {
      console.error("Error editing category:", error);
      toast({
        title: "Error",
        description: "Failed to edit category.",
      });
    } finally {
      setIsSubmitting(false); // Stop loading
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    setIsSubmitting(true); // Start loading
    try {
      const response = await axiosInstance.delete("/categories", {
        data: { id: categoryId },
      });

      if (response.status !== 204) {
        throw new Error("Failed to delete category");
      }

      deleteCategory(categoryId);
      toast({
        title: "Success",
        description: "Category deleted successfully!",
      });
    } catch (error) {
      console.error("Error deleting category:", error);
      toast({
        title: "Error",
        description: "Failed to delete category.",
      });
    } finally {
      setIsSubmitting(false); // Stop loading
    }
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-10 font-semibold">+Add Category</Button>
      </DialogTrigger>
      <DialogContent className="p-4 sm:p-7 sm:px-8 poppins max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-[22px]">Add Category</DialogTitle>
          <DialogDescription>
            Enter the name of the new category
          </DialogDescription>
        </DialogHeader>
        <Input
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="New Category"
          className="mt-4"
        />
        <DialogFooter className="mt-9 mb-4 flex flex-col sm:flex-row items-center gap-4">
          <DialogClose asChild>
            <Button
              variant={"secondary"}
              className="h-11 w-full sm:w-auto px-11"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={handleAddCategory}
            className="h-11 w-full sm:w-auto px-11"
            isLoading={isSubmitting} // Button loading effect
          >
            {isSubmitting ? "Loading..." : "Add Category"}
          </Button>
        </DialogFooter>
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Categories</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {categories.map((category) => (
              <div
                key={category.id}
                className="p-4 border rounded-lg shadow-sm flex flex-col justify-between"
              >
                {editingCategory === category.id ? (
                  <div className="flex flex-col space-y-2">
                    <Input
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      placeholder="Edit Category"
                      className="h-8"
                    />
                    <div className="flex justify-between gap-2">
                      <Button
                        onClick={() => handleEditCategory(category.id)}
                        className="h-8 w-full"
                        isLoading={isSubmitting}
                      >
                        Save
                      </Button>
                      <Button
                        onClick={() => setEditingCategory(null)}
                        className="h-8 w-full"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <span className="font-medium">{category.name}</span>
                    <div className="flex justify-between gap-2">
                      <Button
                        onClick={() => {
                          setEditingCategory(category.id);
                          setNewCategoryName(category.name);
                        }}
                        className="h-8 w-full"
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        onClick={() => handleDeleteCategory(category.id)}
                        className="h-8 w-full"
                        isLoading={isSubmitting}
                      >
                        <FaTrash />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

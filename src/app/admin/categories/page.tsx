"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { Badge } from "~/components/ui/badge";
import { Card } from "~/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { api } from "~/trpc/react";
import { toast } from "sonner";

export default function CategoriesPage() {
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<{
    id: number;
    name: string;
    slug: string;
    description: string | null;
  } | null>(null);

  const { data: categories, isLoading, refetch } = api.category.getAll.useQuery();

  const createCategory = api.category.create.useMutation({
    onSuccess: () => {
      toast.success("Category created!");
      setCreateOpen(false);
      void refetch();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const updateCategory = api.category.update.useMutation({
    onSuccess: () => {
      toast.success("Category updated!");
      setEditOpen(false);
      setEditingCategory(null);
      void refetch();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const deleteCategory = api.category.delete.useMutation({
    onSuccess: () => {
      toast.success("Category deleted!");
      void refetch();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    createCategory.mutate({
      name: formData.get("name") as string,
      description: formData.get("description") as string,
    });
  };

  const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingCategory) return;
    const formData = new FormData(e.currentTarget);
    updateCategory.mutate({
      id: editingCategory.id,
      name: formData.get("name") as string,
      slug: formData.get("slug") as string,
      description: formData.get("description") as string,
    });
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">
              Categories
            </h1>
            <p className="text-muted-foreground">
              Organize your posts with categories
            </p>
          </div>
          <Dialog open={createOpen} onOpenChange={setCreateOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-full w-full sm:w-auto">
                <Plus className="mr-2 h-4 w-4" />
                New Category
              </Button>
            </DialogTrigger>
            <DialogContent>
              <form onSubmit={handleCreate}>
                <DialogHeader>
                  <DialogTitle>Create Category</DialogTitle>
                  <DialogDescription>
                    Add a new category for organizing posts
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="e.g., Technology"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Brief description..."
                      rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCreateOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={createCategory.isPending}>
                  {createCategory.isPending ? "Creating..." : "Create"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-muted/40">
        {isLoading ? (
          <div className="p-16 text-center">
            <p className="text-muted-foreground">Loading categories...</p>
          </div>
        ) : !categories || categories.length === 0 ? (
          <div className="p-16 text-center">
            <p className="text-muted-foreground mb-4">No categories yet</p>
            <Button onClick={() => setCreateOpen(true)} size="sm" className="rounded-full">
              Create your first category
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-semibold">Name</TableHead>
                <TableHead className="font-semibold">Slug</TableHead>
                <TableHead className="font-semibold">Description</TableHead>
                <TableHead className="font-semibold">Posts</TableHead>
                <TableHead className="text-right font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id} className="group">
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell>
                    <code className="text-sm bg-muted/50 px-2 py-1 rounded">{category.slug}</code>
                  </TableCell>
                  <TableCell className="max-w-xs truncate text-sm text-muted-foreground">
                    {category.description ?? "—"}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="rounded-full">{category.postCount}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Dialog open={editOpen && editingCategory?.id === category.id} onOpenChange={(open) => {
                        setEditOpen(open);
                        if (!open) setEditingCategory(null);
                      }}>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setEditingCategory(category)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <form onSubmit={handleEdit}>
                            <DialogHeader>
                              <DialogTitle>Edit Category</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="space-y-2">
                                <Label htmlFor="edit-name">Name *</Label>
                                <Input
                                  id="edit-name"
                                  name="name"
                                  defaultValue={editingCategory?.name}
                                  required
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="edit-slug">Slug *</Label>
                                <Input
                                  id="edit-slug"
                                  name="slug"
                                  defaultValue={editingCategory?.slug}
                                  required
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="edit-description">Description</Label>
                                <Textarea
                                  id="edit-description"
                                  name="description"
                                  defaultValue={editingCategory?.description ?? ""}
                                  rows={3}
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                  setEditOpen(false);
                                  setEditingCategory(null);
                                }}
                              >
                                Cancel
                              </Button>
                              <Button type="submit" disabled={updateCategory.isPending}>
                                {updateCategory.isPending ? "Updating..." : "Update"}
                              </Button>
                            </DialogFooter>
                          </form>
                        </DialogContent>
                      </Dialog>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Category?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete &quot;{category.name}&quot;.
                              {category.postCount > 0 && (
                                <span className="block mt-2 text-destructive font-medium">
                                  Warning: This category has {category.postCount} post(s).
                                  Remove posts from this category first.
                                </span>
                              )}
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deleteCategory.mutate({ id: category.id })}
                              className="bg-destructive hover:bg-destructive/90"
                              disabled={category.postCount > 0}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
      </div>
    </div>
  );
}

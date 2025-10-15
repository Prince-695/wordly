"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
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
    <div className="container py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Manage Categories
          </h1>
          <p className="text-muted-foreground">
            Organize your posts with categories
          </p>
        </div>
        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogTrigger asChild>
            <Button>
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

      <Card>
        {isLoading ? (
          <div className="p-12 text-center">
            <p className="text-muted-foreground">Loading categories...</p>
          </div>
        ) : !categories || categories.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-muted-foreground mb-4">No categories yet</p>
            <Button onClick={() => setCreateOpen(true)} size="sm">
              Create your first category
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Posts</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell>
                    <code className="text-sm">{category.slug}</code>
                  </TableCell>
                  <TableCell className="max-w-xs truncate text-sm text-muted-foreground">
                    {category.description || "—"}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{category.postCount}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Dialog open={editOpen && editingCategory?.id === category.id} onOpenChange={(open) => {
                        setEditOpen(open);
                        if (!open) setEditingCategory(null);
                      }}>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
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
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Category?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will delete &quot;{category.name}&quot;.
                              {category.postCount > 0 && (
                                <span className="block mt-2 text-destructive">
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
  );
}

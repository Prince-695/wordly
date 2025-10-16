"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Eye, Trash2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";
import { MarkdownEditor } from "~/components/markdown-editor";
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
import Link from "next/link";

interface PostData {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  published: boolean;
  categories: Array<{ id: number; name: string; slug: string }>;
}

interface PostEditorProps {
  post?: PostData;
  mode: "create" | "edit";
}

export function PostEditor({ post, mode }: PostEditorProps) {
  const router = useRouter();
  const [title, setTitle] = useState(post?.title ?? "");
  const [postSlug, setPostSlug] = useState(post?.slug ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [published, setPublished] = useState(post?.published ?? false);
  const [selectedCategories, setSelectedCategories] = useState<number[]>(
    post?.categories.map((c) => c.id) ?? []
  );

  const { data: categories } = api.category.getAll.useQuery();

  const createPost = api.post.create.useMutation({
    onSuccess: (data) => {
      toast.success("Post created successfully!");
      if (data) {
        router.push(`/blog/${data.slug}`);
      } else {
        router.push("/admin/posts");
      }
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create post");
    },
  });

  const updatePost = api.post.update.useMutation({
    onSuccess: () => {
      toast.success("Post updated successfully!");
      router.push("/admin/posts");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const deletePost = api.post.delete.useMutation({
    onSuccess: () => {
      toast.success("Post deleted successfully!");
      router.push("/admin/posts");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Please enter a title");
      return;
    }

    if (!content.trim()) {
      toast.error("Please enter some content");
      return;
    }

    if (mode === "create") {
      createPost.mutate({
        title: title.trim(),
        content: content.trim(),
        excerpt: excerpt.trim() || undefined,
        slug: postSlug.trim() || undefined,
        published,
        categoryIds: selectedCategories,
      });
    } else if (post) {
      updatePost.mutate({
        id: post.id,
        title: title.trim(),
        content: content.trim(),
        excerpt: excerpt.trim() || undefined,
        slug: postSlug.trim() || undefined,
        published,
        categoryIds: selectedCategories,
      });
    }
  };

  const handleDelete = () => {
    if (post) {
      deletePost.mutate({ id: post.id });
    }
  };

  const toggleCategory = (categoryId: number) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const isLoading = createPost.isPending || updatePost.isPending;

  return (
    <div className="min-h-screen flex flex-col items-center bg-background pt-24 pb-16">
      <div className="container max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">
              {mode === "create" ? "Create Post" : "Edit Post"}
            </h1>
            <p className="text-muted-foreground">
              {mode === "create"
                ? "Write and publish your blog post"
                : "Update your blog post"}
            </p>
          </div>
          <Button variant="ghost" asChild>
            <Link href="/admin/posts">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Link>
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title..."
              className="text-2xl font-semibold h-auto py-3"
              required
            />
          </div>

          {/* Slug */}
          <div className="space-y-2">
            <Label htmlFor="slug">Slug (optional)</Label>
            <Input
              id="slug"
              value={postSlug}
              onChange={(e) => setPostSlug(e.target.value)}
              placeholder="custom-url-slug (leave empty for auto-generation)"
            />
            <p className="text-xs text-muted-foreground">
              URL-friendly version of the title. Leave empty to auto-generate.
            </p>
          </div>

          {/* Excerpt */}
          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt (optional)</Label>
            <Input
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Brief summary of your post..."
            />
            <p className="text-xs text-muted-foreground">
              A short description that appears in post listings.
            </p>
          </div>

          {/* Content */}
          <MarkdownEditor
            value={content}
            onChange={setContent}
            label="Content *"
            placeholder="Write your post content in Markdown..."
          />

          {/* Categories */}
          <Card className="border-muted/40">
            <CardHeader>
              <CardTitle>Categories</CardTitle>
              <CardDescription>
                Select categories for your post (optional)
              </CardDescription>
            </CardHeader>
            <CardContent>
              {categories && categories.length > 0 ? (
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`category-${category.id}`}
                        checked={selectedCategories.includes(category.id)}
                        onCheckedChange={() => toggleCategory(category.id)}
                      />
                      <label
                        htmlFor={`category-${category.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {category.name}
                      </label>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No categories available.{" "}
                  <Link href="/admin/categories" className="text-primary hover:underline">
                    Create some first
                  </Link>
                  .
                </p>
              )}
            </CardContent>
          </Card>

          {/* Publishing Options */}
          <Card className="border-muted/40">
            <CardHeader>
              <CardTitle>Publishing Options</CardTitle>
              <CardDescription>
                Choose whether to publish immediately or save as draft
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Switch
                  id="published"
                  checked={published}
                  onCheckedChange={setPublished}
                />
                <Label htmlFor="published" className="cursor-pointer">
                  {published ? "Published" : "Draft"}
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex items-center justify-between gap-4 pt-4">
            <div className="flex gap-3">
              <Button
                type="submit"
                disabled={isLoading}
                className="min-w-32 rounded-full"
              >
                {isLoading ? (
                  "Saving..."
                ) : mode === "create" ? (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    {published ? "Publish" : "Save Draft"}
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>

              {mode === "edit" && post && (
                <Button
                  type="button"
                  variant="outline"
                  asChild
                  className="rounded-full"
                >
                  <Link href={`/blog/${post.slug}`} target="_blank">
                    <Eye className="mr-2 h-4 w-4" />
                    Preview
                  </Link>
                </Button>
              )}

              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className="rounded-full"
              >
                Cancel
              </Button>
            </div>

            {mode === "edit" && post && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    type="button"
                    variant="destructive"
                    disabled={deletePost.isPending}
                    className="rounded-full"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Post?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete &quot;{post.title}&quot;. This action
                      cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      className="bg-destructive hover:bg-destructive/90"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

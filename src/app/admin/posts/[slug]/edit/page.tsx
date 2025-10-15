"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Eye, Trash2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";
import { MarkdownEditor } from "~/components/markdown-editor";
import { Alert, AlertDescription } from "~/components/ui/alert";
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

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function EditPostPage({ params }: PageProps) {
  const router = useRouter();
  const [slug, setSlugParam] = useState<string>("");
  const [title, setTitle] = useState("");
  const [postSlug, setPostSlug] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [published, setPublished] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [postId, setPostId] = useState<number>(0);

  // Unwrap params
  useEffect(() => {
    void params.then((p) => setSlugParam(p.slug));
  }, [params]);

  const { data: post, isLoading } = api.post.getBySlug.useQuery(
    { slug },
    { enabled: !!slug }
  );

  const { data: categories } = api.category.getAll.useQuery();

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

  // Load post data
  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setPostSlug(post.slug);
      setContent(post.content);
      setExcerpt(post.excerpt ?? "");
      setPublished(post.published);
      setPostId(post.id);
      setSelectedCategories(post.categories.map((c) => c.id));
    }
  }, [post]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("Title and content are required");
      return;
    }

    updatePost.mutate({
      id: postId,
      title: title.trim(),
      content: content.trim(),
      slug: postSlug.trim(),
      excerpt: excerpt.trim() || undefined,
      published,
      categoryIds: selectedCategories,
    });
  };

  const handleDelete = () => {
    deletePost.mutate({ id: postId });
  };

  const toggleCategory = (categoryId: number) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  if (isLoading) {
    return (
      <div className="container max-w-5xl py-12">
        <div className="space-y-4">
          <div className="h-8 w-48 bg-muted animate-pulse rounded" />
          <div className="h-12 w-full bg-muted animate-pulse rounded" />
          <div className="h-96 w-full bg-muted animate-pulse rounded" />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container max-w-5xl py-12">
        <Alert variant="destructive">
          <AlertDescription>Post not found</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container max-w-5xl py-12">
      <Button variant="ghost" asChild className="mb-8">
        <Link href="/admin/posts">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Posts
        </Link>
      </Button>

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Edit Post</h1>
          <p className="text-muted-foreground">Update your blog post</p>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Post?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the post
                &quot;{title}&quot;.
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
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-2">
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-lg"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug">URL Slug *</Label>
          <Input
            id="slug"
            value={postSlug}
            onChange={(e) => setPostSlug(e.target.value)}
            required
          />
          <p className="text-xs text-muted-foreground">
            URL: /blog/{postSlug}
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="excerpt">Excerpt (Optional)</Label>
          <Input
            id="excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Categories</CardTitle>
            <CardDescription>Select categories for this post</CardDescription>
          </CardHeader>
          <CardContent>
            {categories && categories.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category.id}`}
                      checked={selectedCategories.includes(category.id)}
                      onCheckedChange={() => toggleCategory(category.id)}
                    />
                    <label
                      htmlFor={`category-${category.id}`}
                      className="text-sm font-medium"
                    >
                      {category.name}
                    </label>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No categories available</p>
            )}
          </CardContent>
        </Card>

        <MarkdownEditor value={content} onChange={setContent} label="Content *" />

        <Card>
          <CardHeader>
            <CardTitle>Publish Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="published">Publish Status</Label>
                <p className="text-sm text-muted-foreground">
                  {published ? "Post is live" : "Draft"}
                </p>
              </div>
              <Switch
                id="published"
                checked={published}
                onCheckedChange={setPublished}
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/posts")}
              >
                Cancel
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href={`/blog/${postSlug}`} target="_blank">
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </Link>
              </Button>
              <Button type="submit" disabled={updatePost.isPending}>
                <Save className="mr-2 h-4 w-4" />
                {updatePost.isPending ? "Saving..." : "Update Post"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}

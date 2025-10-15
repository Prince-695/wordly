"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { MarkdownEditor } from "~/components/markdown-editor";
import { Checkbox } from "~/components/ui/checkbox";

export default function NewPostPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  const { data: categories } = api.category.getAll.useQuery();

  const createPost = api.post.create.useMutation({
    onSuccess: (data) => {
      toast.success("Post created successfully!");
      router.push(`/blog/${data.slug}`);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create post");
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

    createPost.mutate({
      title,
      content,
      published,
      categoryIds: selectedCategories,
    });
  };

  const toggleCategory = (categoryId: number) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <div className="container max-w-5xl py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Create New Post</h1>
        <p className="text-muted-foreground">
          Write and publish your blog post
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
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

        {/* Content */}
        <MarkdownEditor
          value={content}
          onChange={setContent}
          label="Content *"
          placeholder="Write your post content in Markdown..."
        />

        {/* Categories */}
        <Card>
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
                No categories available. Create some first.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Publish Toggle */}
        <Card>
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
                {published ? "Publish immediately" : "Save as draft"}
              </Label>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-4">
          <Button
            type="submit"
            disabled={createPost.isPending}
            className="min-w-32"
          >
            {createPost.isPending ? "Creating..." : published ? "Publish" : "Save Draft"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}

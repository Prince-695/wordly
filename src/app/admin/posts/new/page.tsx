"use client";

import { useSearchParams } from "next/navigation";
import { PostEditor } from "~/components/post-editor";
import { api } from "~/trpc/react";

export default function NewPostPage() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");

  // If slug is provided, we're editing an existing post
  const { data: post, isLoading, error } = api.post.getBySlug.useQuery(
    { slug: slug! },
    { enabled: !!slug }
  );

  if (slug) {
    // Edit mode
    if (isLoading) {
      return (
        <div className="container mx-auto p-6 pt-24">
          <div className="flex items-center justify-center">
            <p className="text-muted-foreground">Loading post...</p>
          </div>
        </div>
      );
    }

    if (error || !post) {
      return (
        <div className="container mx-auto p-6 pt-24">
          <div className="flex items-center justify-center">
            <p className="text-destructive">
              Error loading post: {error?.message ?? "Post not found"}
            </p>
          </div>
        </div>
      );
    }

    return <PostEditor mode="edit" post={post} />;
  }

  // Create mode
  return <PostEditor mode="create" />;
}

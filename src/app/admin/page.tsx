"use client";

import { useState } from "react";
import Link from "next/link";
import { FileText, FilePlus, Folder, Eye, PenSquare, Trash2, EyeOff, Search, ExternalLink } from "lucide-react";
import { redirect } from "next/navigation";
import { api } from "~/trpc/react";
import { Card, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Input } from "~/components/ui/input";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
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
import { toast } from "sonner";
import { useSession } from "next-auth/react";

export default function DashboardPage() {
  const { data: session } = useSession();
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all");
  const [search, setSearch] = useState("");

  if (!session?.user) {
    redirect("/auth/signin");
  }

  const publishedFilter =
    filter === "published" ? true : filter === "draft" ? false : undefined;

  const { data: postStats } = api.post.getMyStats.useQuery();
  const { data: categoryStats } = api.category.getStats.useQuery();
  
  const { data, isLoading, refetch } = api.post.getMyPosts.useQuery({
    limit: 100,
    offset: 0,
    published: publishedFilter,
    sortBy: "latest",
  });

  const deletePost = api.post.delete.useMutation({
    onSuccess: () => {
      toast.success("Post deleted!");
      void refetch();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const togglePublish = api.post.togglePublish.useMutation({
    onSuccess: (data) => {
      toast.success(data?.published ? "Post published!" : "Post unpublished!");
      void refetch();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // Client-side search filtering
  const filteredPosts = data?.posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  ) ?? [];

  const stats = [
    {
      title: "Total Posts",
      value: postStats?.total ?? 0,
      icon: FileText,
      description: "All posts in your blog",
    },
    {
      title: "Published",
      value: postStats?.published ?? 0,
      icon: Eye,
      description: "Live on your blog",
    },
    {
      title: "Drafts",
      value: postStats?.drafts ?? 0,
      icon: FilePlus,
      description: "Waiting to be published",
    },
    {
      title: "Categories",
      value: categoryStats?.total ?? 0,
      icon: Folder,
      description: "Total categories",
    },
  ];

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-3">Dashboard</h1>
          <p className="text-lg text-muted-foreground">
            Welcome back, {session.user.name}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-12 ">
          {stats.map((stat, index) => (
            <Card key={index} className=" border-primary/20 ">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <stat.icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold tracking-tight">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Quick Actions</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link href="/admin/posts/new" className="group">
              <Card className="border-muted/40 transition-all hover:border-primary/50 hover:shadow-md">
                <CardContent className="p-6">
                  <PenSquare className="h-6 w-6 mb-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  <h3 className="text-lg font-semibold mb-2">Create Post</h3>
                  <p className="text-sm text-muted-foreground">
                    Start writing a new article
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/admin/categories" className="group">
              <Card className="border-muted/40 transition-all hover:border-primary/50 hover:shadow-md">
                <CardContent className="p-6">
                  <Folder className="h-6 w-6 mb-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  <h3 className="text-lg font-semibold mb-2">Categories</h3>
                  <p className="text-sm text-muted-foreground">
                    Organize your content
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        {/* All Posts Management */}
        <div>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">All Posts</h2>
          </div>

          {/* Search and Filter */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 sm:max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search posts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={filter} onValueChange={(value: "all" | "published" | "draft") => setFilter(value)}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter posts" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Posts</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Drafts</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Posts Table */}
          {isLoading ? (
            <Card>
              <CardContent className="flex items-center justify-center py-12">
                <p className="text-muted-foreground">Loading posts...</p>
              </CardContent>
            </Card>
          ) : filteredPosts.length === 0 ? (
            <Card className="border-muted/40">
              <CardContent className="flex flex-col items-center justify-center p-16">
                <div className="rounded-full bg-muted/50 p-6 mb-4">
                  <FileText className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  {search ? "No posts found" : "No posts yet"}
                </h3>
                <p className="text-sm text-muted-foreground mb-6 text-center max-w-sm">
                  {search
                    ? "Try adjusting your search or filter"
                    : "Create your first blog post to get started"}
                </p>
                {!search && (
                  <Button asChild className="rounded-full">
                    <Link href="/admin/posts/new">
                      <FilePlus className="mr-2 h-4 w-4" />
                      Create Your First Post
                    </Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card className="border-muted/40">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Categories</TableHead>
                      <TableHead>Updated</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPosts.map((post) => (
                      <TableRow key={post.id}>
                        <TableCell className="font-medium">
                          <div className="max-w-md">
                            <p className="line-clamp-1">{post.title}</p>
                            <p className="text-xs text-muted-foreground line-clamp-1">
                              {post.excerpt ?? "No excerpt"}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={post.published ? "default" : "secondary"}
                            className="rounded-full"
                          >
                            {post.published ? "Published" : "Draft"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {post.categories.slice(0, 2).map((category) => (
                              <Badge
                                key={category.id}
                                variant="outline"
                                className="text-xs"
                              >
                                {category.name}
                              </Badge>
                            ))}
                            {post.categories.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{post.categories.length - 2}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-muted-foreground">
                            {format(new Date(post.updatedAt ?? post.createdAt), "MMM d, yyyy")}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              title="Preview"
                              asChild
                              className="h-9 w-9"
                            >
                              <Link
                                href={`/blog/${post.slug}`}
                                rel="noopener noreferrer"
                              >
                                <ExternalLink className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              title="Edit"
                              asChild
                              className="h-9 w-9"
                            >
                              <Link href={`/admin/posts/new?slug=${post.slug}`}>
                                <PenSquare className="h-4 w-4" />
                              </Link>
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  title={
                                    post.published ? "Unpublish" : "Publish"
                                  }
                                  className="h-9 w-9"
                                >
                                  {post.published ? (
                                    <EyeOff className="h-4 w-4" />
                                  ) : (
                                    <Eye className="h-4 w-4" />
                                  )}
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    {post.published ? "Unpublish" : "Publish"}{" "}
                                    post?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    {post.published
                                      ? "This post will be hidden from your blog."
                                      : "This post will be visible on your blog."}
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() =>
                                      togglePublish.mutate({ id: post.id })
                                    }
                                  >
                                    {post.published ? "Unpublish" : "Publish"}
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  title="Delete"
                                  className="h-9 w-9"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Delete post?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This will
                                    permanently delete your post.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() =>
                                      deletePost.mutate({ id: post.id })
                                    }
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
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
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

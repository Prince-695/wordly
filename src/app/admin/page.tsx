import Link from "next/link";
import { FileText, FilePlus, Folder, Eye, PenSquare } from "lucide-react";
import { redirect } from "next/navigation";
import { api } from "~/trpc/server";
import { getCurrentUser } from "~/server/session";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { format } from "date-fns";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect("/auth/signin");
  }

  const [postStats, categoryStats, recentPosts] = await Promise.all([
    api.post.getStats(),
    api.category.getStats(),
    api.post.getAll({ limit: 5, offset: 0, sortBy: "latest" }),
  ]);

  const stats = [
    {
      title: "Total Posts",
      value: postStats.total,
      icon: FileText,
      description: "All posts in your blog",
    },
    {
      title: "Published",
      value: postStats.published,
      icon: Eye,
      description: "Live on your blog",
    },
    {
      title: "Drafts",
      value: postStats.drafts,
      icon: FilePlus,
      description: "Waiting to be published",
    },
    {
      title: "Categories",
      value: categoryStats.total,
      icon: Folder,
      description: "Total categories",
    },
  ];

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user.name}! Manage your blog posts and categories
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Button asChild className="h-auto py-6 flex-col items-start" variant="outline">
            <Link href="/admin/posts/new">
              <PenSquare className="h-6 w-6 mb-2" />
              <span className="text-lg font-semibold">Create New Post</span>
              <span className="text-sm text-muted-foreground mt-1">
                Start writing your next blog post
              </span>
            </Link>
          </Button>
          <Button asChild className="h-auto py-6 flex-col items-start" variant="outline">
            <Link href="/admin/posts">
              <FileText className="h-6 w-6 mb-2" />
              <span className="text-lg font-semibold">Manage Posts</span>
              <span className="text-sm text-muted-foreground mt-1">
                View and edit all your posts
              </span>
            </Link>
          </Button>
          <Button asChild className="h-auto py-6 flex-col items-start" variant="outline">
            <Link href="/admin/categories">
              <Folder className="h-6 w-6 mb-2" />
              <span className="text-lg font-semibold">Manage Categories</span>
              <span className="text-sm text-muted-foreground mt-1">
                Organize your content
              </span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Recent Posts */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Recent Posts</h2>
          <Button variant="outline" asChild size="sm">
            <Link href="/admin/posts">View All</Link>
          </Button>
        </div>

        {recentPosts.posts.length > 0 ? (
          <div className="space-y-4">
            {recentPosts.posts.map((post) => (
              <Card key={post.id}>
                <CardContent className="flex items-center justify-between p-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">{post.title}</h3>
                      <Badge variant={post.published ? "default" : "secondary"}>
                        {post.published ? "Published" : "Draft"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{format(new Date(post.createdAt), "MMM d, yyyy")}</span>
                      <span>{post.categories.map((c) => c.name).join(", ")}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/blog/${post.slug}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/admin/posts/${post.slug}/edit`}>
                        <PenSquare className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-12">
              <FileText className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-lg font-medium mb-2">No posts yet</p>
              <p className="text-sm text-muted-foreground mb-4">
                Create your first blog post to get started
              </p>
              <Button asChild>
                <Link href="/admin/posts/new">
                  <PenSquare className="mr-2 h-4 w-4" />
                  Create Post
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

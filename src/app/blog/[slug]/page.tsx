import { notFound } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { api } from "~/trpc/server";
import { MarkdownRenderer } from "~/components/markdown-renderer";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { BlogCard } from "~/components/blog-card";
import { ShareButtons } from "~/components/share-buttons";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    const post = await api.post.getBySlug({ slug });
    
    return {
      title: `${post.title} | Wordly`,
      description: post.excerpt ?? `Read ${post.title} on Wordly`,
      openGraph: {
        title: post.title,
        description: post.excerpt ?? undefined,
        type: "article",
        publishedTime: post.createdAt.toISOString(),
        authors: ["Wordly"],
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.excerpt ?? undefined,
      },
    };
  } catch {
    return {
      title: "Post Not Found | Wordly",
    };
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  
  let post;
  try {
    post = await api.post.getBySlug({ slug });
  } catch {
    notFound();
  }

  const relatedPosts = await api.post.getRelated({ slug, limit: 3 });

  const shareUrl = `${process.env.NEXT_PUBLIC_APP_URL}/blog/${slug}`;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="border-b bg-gradient-to-b from-muted/50 to-background">
        <div className="container px-6 lg:px-8 pt-24 pb-16">
          <div className="mx-auto max-w-4xl">
            {/* Back Button */}
            <Button variant="ghost" asChild className="mb-8 -ml-3">
              <Link href="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
            </Button>

            {/* Categories */}
            <div className="mb-6 flex flex-wrap gap-2">
              {post.categories.map((category) => (
                <Badge key={category.id} variant="secondary" className="rounded-full">
                  {category.name}
                </Badge>
              ))}
            </div>
            
            {/* Title */}
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {post.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {format(new Date(post.createdAt), "MMMM d, yyyy")}
              </span>
              <span className="h-1 w-1 rounded-full bg-muted-foreground" />
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {post.readingTime} min read
              </span>
              <span className="h-1 w-1 rounded-full bg-muted-foreground" />
              <span>{post.wordCount} words</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <article className="container px-6 lg:px-8 py-6">
        <div className="mx-auto max-w-3xl">
          {/* Article Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none mb-16">
            <MarkdownRenderer content={post.content} />
          </div>

          {/* Share Section */}
          <div className="border-t border-b py-8 mb-16">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h3 className="text-lg font-semibold">Share this article</h3>
              <ShareButtons title={post.title} url={shareUrl} />
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts Section */}
      {relatedPosts.length > 0 && (
        <div className="bg-muted/30 border-t">
          <div className="container px-6 lg:px-8 py-16">
            <div className="mx-auto max-w-7xl">
              <div className="mb-10">
                <h2 className="text-3xl font-bold tracking-tight">Related Posts</h2>
                <p className="mt-2 text-muted-foreground">Continue reading with these articles</p>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((relatedPost) => (
                  <BlogCard
                    key={relatedPost.id}
                    title={relatedPost.title}
                    slug={relatedPost.slug}
                    excerpt={relatedPost.excerpt}
                    createdAt={relatedPost.createdAt}
                    readingTime={relatedPost.readingTime}
                    categories={relatedPost.categories}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

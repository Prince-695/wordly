import { notFound } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { api } from "~/trpc/server";
import { MarkdownRenderer } from "~/components/markdown-renderer";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
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
    <div className="container py-12">
      {/* Back Button */}
      <Button variant="ghost" asChild className="mb-8">
        <Link href="/blog">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Link>
      </Button>

      <article className="mx-auto max-w-4xl">
        {/* Header */}
        <header className="mb-12">
          <div className="mb-4 flex flex-wrap gap-2">
            {post.categories.map((category) => (
              <Badge key={category.id} variant="secondary">
                {category.name}
              </Badge>
            ))}
          </div>
          
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {format(new Date(post.createdAt), "MMMM d, yyyy")}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {post.readingTime} min read
            </span>
            <span>{post.wordCount} words</span>
          </div>
        </header>

        <Separator className="mb-12" />

        {/* Content */}
        <div className="mb-12">
          <MarkdownRenderer content={post.content} />
        </div>

        <Separator className="mb-12" />

        {/* Share Section */}
        <div className="mb-12">
          <h3 className="mb-4 text-lg font-semibold">Share this post</h3>
          <ShareButtons title={post.title} url={shareUrl} />
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <>
            <Separator className="mb-12" />
            <div>
              <h3 className="mb-6 text-2xl font-semibold">Related Posts</h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
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
          </>
        )}
      </article>
    </div>
  );
}

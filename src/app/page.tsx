import Link from "next/link";
import { ArrowRight, BookOpen, Zap, Shield, Users, TrendingUp, Search } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { api } from "~/trpc/server";

export default async function HomePage() {
  const stats = await api.post.getStats();
  const categories = await api.category.getAll();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background">
        <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px] [mask-image:radial-gradient(white,transparent_85%)]" />
        <div className="container relative">
          <div className="mx-auto max-w-4xl py-32 text-center">
            <div className="mb-8 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              ✨ Welcome to Wordly
            </div>
            <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
              Share Your Ideas with{" "}
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                the World
              </span>
            </h1>
            <p className="mb-10 text-xl text-muted-foreground sm:text-2xl">
              A modern blogging platform built for creators, developers, and thinkers.
              Write, publish, and grow your audience.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="text-lg">
                <Link href="/blog">
                  Explore Posts
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg">
                <Link href="/admin/posts/new">Start Writing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Everything You Need to Blog
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed to help you create and share amazing content
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="relative overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
              <CardHeader>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Statistics Section */}
      <section className="border-y bg-muted/30">
        <div className="container py-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-primary">{stats.published}+</div>
              <div className="text-sm text-muted-foreground">Published Posts</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-primary">{categories.length}</div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-primary">100+</div>
              <div className="text-sm text-muted-foreground">Active Readers</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-24">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-purple-600 px-8 py-16 text-center text-white shadow-2xl sm:px-16">
          <div className="relative z-10">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              Ready to Start Writing?
            </h2>
            <p className="mb-8 text-lg text-white/90 max-w-2xl mx-auto">
              Join our community of writers and share your knowledge with thousands of readers.
              No credit card required.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" variant="secondary" className="text-lg">
                <Link href="/admin/posts/new">
                  Create Your First Post
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Link href="/blog">Browse Posts</Link>
              </Button>
            </div>
          </div>
          <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px] [mask-image:radial-gradient(white,transparent_70%)]" />
        </div>
      </section>
    </div>
  );
}

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Built with Next.js 15 for incredible performance and instant page loads.",
  },
  {
    icon: BookOpen,
    title: "Markdown Support",
    description: "Write with Markdown and see live previews. Code syntax highlighting included.",
  },
  {
    icon: Shield,
    title: "Type-Safe API",
    description: "End-to-end type safety with tRPC ensures your data is always correct.",
  },
  {
    icon: Users,
    title: "Category System",
    description: "Organize posts with categories and help readers find relevant content.",
  },
  {
    icon: Search,
    title: "Powerful Search",
    description: "Full-text search across all posts to find exactly what you're looking for.",
  },
  {
    icon: TrendingUp,
    title: "Analytics Ready",
    description: "Track your posts' performance with built-in statistics and insights.",
  },
];

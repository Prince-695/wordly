"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { BlogCard } from "~/components/blog-card";
import { BlogListSkeleton } from "~/components/blog-skeleton";
import { SearchBar } from "~/components/search-bar";
import { Pagination } from "~/components/pagination";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Alert, AlertDescription } from "~/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { api } from "~/trpc/react";

const POSTS_PER_PAGE = 12;

export default function BlogPage() {
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [categorySlug, setCategorySlug] = useState<string | undefined>(
    searchParams.get("category") ?? undefined
  );
  const [sortBy, setSortBy] = useState<"latest" | "oldest">("latest");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading, error } = api.post.getAll.useQuery({
    limit: POSTS_PER_PAGE,
    offset: (currentPage - 1) * POSTS_PER_PAGE,
    categorySlug,
    search: debouncedSearch || undefined,
    published: true,
    sortBy,
  });

  const { data: categories } = api.category.getAll.useQuery();
  const totalPages = data ? Math.ceil(data.total / POSTS_PER_PAGE) : 0;

  return (
    <div className="min-h-screen bg-background pt-16 pb-16">
      <div className="border-b bg-secondary/10">
        <div className="container px-6 lg:px-8 py-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Blog Posts
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover articles on technology, design, business, and more
            </p>
          </div>
        </div>
      </div>

      <div className="container px-6 lg:px-8 mt-12">
        <div className="mb-10 space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search posts..."
              className="flex-1 max-w-md"
            />
            <Select value={sortBy} onValueChange={(value: "latest" | "oldest") => setSortBy(value)}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">Latest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {categories && categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <Button
                variant={categorySlug === undefined ? "default" : "outline"}
                size="sm"
                className="rounded-full"
                onClick={() => {
                  setCategorySlug(undefined);
                  setCurrentPage(1);
                }}
              >
                All
              </Button>
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={categorySlug === category.slug ? "default" : "outline"}
                  size="sm"
                  className="rounded-full"
                  onClick={() => {
                    setCategorySlug(category.slug);
                    setCurrentPage(1);
                  }}
                >
                  {category.name}
                  <Badge variant="outline" className="ml-1 rounded-full bg-secondary/10">
                    {category.postCount}
                  </Badge>
                </Button>
              ))}
            </div>
          )}
        </div>

        {isLoading ? (
          <BlogListSkeleton count={POSTS_PER_PAGE} />
        ) : error ? (
          <Alert variant="destructive">
            <AlertDescription>
              Failed to load posts. Please try again later.
            </AlertDescription>
          </Alert>
        ) : data && data.posts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
              {data.posts.map((post) => (
                <BlogCard
                  key={post.id}
                  title={post.title}
                  slug={post.slug}
                  excerpt={post.excerpt}
                  createdAt={post.createdAt}
                  readingTime={post.readingTime}
                  categories={post.categories}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground mb-4">
              {debouncedSearch || categorySlug
                ? "No posts found matching your criteria."
                : "No posts available yet."}
            </p>
            {(debouncedSearch || categorySlug) && (
              <Button
                variant="outline"
                onClick={() => {
                  setSearch("");
                  setCategorySlug(undefined);
                  setCurrentPage(1);
                }}
              >
                Clear Filters
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

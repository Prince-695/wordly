"use client";

import Link from "next/link";
import { format } from "date-fns";
import { Calendar, Clock } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface BlogCardProps {
  title: string;
  slug: string;
  excerpt?: string | null;
  createdAt: Date;
  readingTime: number;
  categories: Category[];
  published?: boolean;
}

export function BlogCard({
  title,
  slug,
  excerpt,
  createdAt,
  readingTime,
  categories,
  published = true,
}: BlogCardProps) {
  return (
    <Link href={`/blog/${slug}`}>
      <Card className="group h-full transition-all hover:shadow-lg hover:-translate-y-1">
        <CardHeader>
          <div className="flex flex-wrap gap-2 mb-2">
            {categories.slice(0, 2).map((category) => (
              <Badge key={category.id} variant="secondary" className="text-xs">
                {category.name}
              </Badge>
            ))}
            {!published && (
              <Badge variant="outline" className="text-xs">
                Draft
              </Badge>
            )}
          </div>
          <h3 className="text-xl font-semibold line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
        </CardHeader>
        <CardContent>
          {excerpt && (
            <p className="text-muted-foreground line-clamp-3 text-sm">
              {excerpt}
            </p>
          )}
        </CardContent>
        <CardFooter className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {format(new Date(createdAt), "MMM d, yyyy")}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {readingTime} min read
            </span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}

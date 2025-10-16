"use client";

import Link from "next/link";
import { format } from "date-fns";
import { Calendar, Clock } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Button } from "./ui/button";

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
    <Link href={`/blog/${slug}`} className="group">
      <Card className="h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary/50">
        <CardHeader className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {categories.slice(0, 2).map((category) => (
              <Button key={category.id} variant="outline" className="rounded-full text-xs pointer-none h-6">
                {category.name}
              </Button>
            ))}
            {!published && (
              <Badge variant="outline" className="rounded-full text-xs">
                Draft
              </Badge>
            )}
          </div>
          <h3 className="text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
        </CardHeader>
        <CardContent>
          {excerpt && (
            <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
              {excerpt}
            </p>
          )}
        </CardContent>
        <CardFooter className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {format(new Date(createdAt), "MMM d, yyyy")}
          </span>
          <span className="h-1 w-1 rounded-full bg-muted-foreground" />
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {readingTime} min
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}

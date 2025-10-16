"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import "highlight.js/styles/github-dark.css";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  return (
    <div className={`prose prose-slate dark:prose-invert max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeRaw]}
        components={{
          h1: ({ ...props }) => (
            <h1 className="text-4xl font-bold mt-8 mb-4 scroll-m-20" {...props} />
          ),
          h2: ({ ...props }) => (
            <h2 className="text-3xl font-semibold mt-6 mb-3 scroll-m-20" {...props} />
          ),
          h3: ({ ...props }) => (
            <h3 className="text-2xl font-semibold mt-4 mb-2 scroll-m-20" {...props} />
          ),
          p: ({ ...props }) => (
            <p className="leading-7 [&:not(:first-child)]:mt-4" {...props} />
          ),
          ul: ({ ...props }) => (
            <ul className="my-6 ml-6 list-disc [&>li]:mt-2" {...props} />
          ),
          ol: ({ ...props }) => (
            <ol className="my-6 ml-6 list-decimal [&>li]:mt-2" {...props} />
          ),
          blockquote: ({ ...props }) => (
            <blockquote
              className="mt-6 border-l-4 border-primary pl-6 italic text-muted-foreground"
              {...props}
            />
          ),
          code: ({ className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className ?? "");
            return match ? (
              <code className={className} {...props}>
                {children}
              </code>
            ) : (
              <code
                className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm"
                {...props}
              >
                {children}
              </code>
            );
          },
          pre: ({ ...props }) => (
            <pre
              className="overflow-x-auto rounded-lg bg-slate-900 p-4 my-4"
              {...props}
            />
          ),
          a: ({ ...props }) => (
            <a
              className="font-medium text-primary underline underline-offset-4 hover:no-underline"
              {...props}
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

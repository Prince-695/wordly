"use client";

import { Twitter, Linkedin, Copy } from "lucide-react";
import { Button } from "~/components/ui/button";
import { toast } from "sonner";

interface ShareButtonsProps {
  title: string;
  url: string;
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard!");
    } catch {
      toast.error("Failed to copy link");
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" size="sm" asChild>
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Twitter className="mr-2 h-4 w-4" />
          Twitter
        </a>
      </Button>
      <Button variant="outline" size="sm" asChild>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Linkedin className="mr-2 h-4 w-4" />
          LinkedIn
        </a>
      </Button>
      <Button variant="outline" size="sm" onClick={handleCopyLink}>
        <Copy className="mr-2 h-4 w-4" />
        Copy Link
      </Button>
    </div>
  );
}

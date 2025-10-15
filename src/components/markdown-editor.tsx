"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Textarea } from "~/components/ui/textarea";
import { Label } from "~/components/ui/label";
import { MarkdownRenderer } from "./markdown-renderer";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  rows?: number;
}

export function MarkdownEditor({
  value,
  onChange,
  label = "Content",
  placeholder = "Write your post content in Markdown...",
  rows = 20,
}: MarkdownEditorProps) {
  const [activeTab, setActiveTab] = useState<string>("write");

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="write">Write</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        <TabsContent value="write" className="mt-4">
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={rows}
            className="font-mono"
          />
          <p className="text-xs text-muted-foreground mt-2">
            Supports Markdown formatting. Use # for headings, ** for bold, * for italic, etc.
          </p>
        </TabsContent>
        <TabsContent value="preview" className="mt-4">
          <div className="min-h-[400px] rounded-md border p-6 bg-card">
            {value ? (
              <MarkdownRenderer content={value} />
            ) : (
              <p className="text-muted-foreground">Nothing to preview yet. Start writing!</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

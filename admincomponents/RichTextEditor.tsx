"use client";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import "quill/dist/quill.snow.css";
import "@/admincomponents/ui/quill-editor.css";
import { useState } from "react";

// Dynamically import to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void; // explicitly a string
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const [content, setContent] = useState(value || "");

    useEffect(() => {
    setContent(value || "");
  }, [value]);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ color: [] }, { background: [] }],
      ["blockquote", "code-block"],
      ["link", "image"],
      ["clean"],
    ],
  };

  // ✅ Only include valid formats
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",      // handles both ordered & bullet
    "indent",
    "color",
    "background",
    "blockquote",
    "code-block",
    "link",
    "image",
  ];

  return (
    <ReactQuill
      theme="snow"
      value={content}
      onChange={(val) => {
        setContent(val);
        onChange?.(val);
      }}
      modules={modules}
      formats={formats}
    />
  );
}

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MarkdownViewer from "@/components/shared/Markdown/MarkdownViewer";

const docsModules = import.meta.glob<string>("@/assets/docs/*.md", {
  query: "?raw",
  import: "default",
});

const docLoaders: Record<string, () => Promise<string>> = {};
for (const path of Object.keys(docsModules)) {
  const match = path.match(/\/([^/]+)\.md$/);
  if (match) docLoaders[match[1]] = docsModules[path] as () => Promise<string>;
}

export const Docs = () => {
  const { slug } = useParams();
  const docSlug = slug ?? "index";
  const loader = docLoaders[docSlug] ?? docLoaders["index"];
  const [content, setContent] = useState<string | null>(null);

  useEffect(() => {
    if (!loader) {
      setContent(null);
      return;
    }
    loader().then(setContent);
  }, [loader, docSlug]);

  if (!loader) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Document not found.</p>
      </div>
    );
  }

  if (content === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return <MarkdownViewer content={content} />;
};

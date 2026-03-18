import React, { useState, useEffect, useRef, useMemo } from "react";
import { marked } from "marked";

interface Section {
  title: string;
  id: string;
  level: number;
}

interface MarkdownViewerProps {
  markdownPath?: string;
  content?: string;
}

const MarkdownViewer: React.FC<MarkdownViewerProps> = ({
  markdownPath,
  content,
}) => {
  const [activeSection, setActiveSection] = useState<string>("");
  const [sections, setSections] = useState<Section[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [markdownContent, setMarkdownContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const contentRef = useRef<HTMLDivElement>(null);
  const isManualScrollRef = useRef<boolean>(false);

  const generateId = (text: string): string => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const renderer = useMemo(() => {
    const r = new marked.Renderer();
    r.heading = (token: any) => {
      const { text, depth } = token;
      if (depth === 2 || depth === 3) {
        const id = generateId(text);
        const linkIconSize = depth === 2 ? "w-5 h-5" : "w-4 h-4";
        const classes =
          depth === 2
            ? "text-2xl font-normal mt-10 mb-4 text-gray-900 scroll-mt-20 leading-tight group relative"
            : "text-xl font-normal mt-8 mb-3 text-gray-900 scroll-mt-20 leading-tight group relative";
        return `<h${depth} id="${id}" class="${classes}">
          <a href="#${id}" class="absolute -left-6 opacity-0 group-hover:opacity-100 transition-opacity pr-1" aria-label="Link to this section">
            <svg class="${linkIconSize} text-gray-400" fill="currentColor" viewBox="0 0 16 16">
              <path d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path>
            </svg>
          </a>
          ${text}
        </h${depth}>`;
      }
      if (depth === 1) {
        return `<h1 class="text-3xl md:text-4xl font-normal mb-5 text-gray-900 leading-tight">${text}</h1>`;
      }
      return `<h${depth}>${text}</h${depth}>`;
    };
    r.paragraph = (token: any) =>
      `<p class="mb-5 text-gray-700 leading-relaxed text-base">${
        token.text ?? token
      }</p>`;
    r.list = (token: any) => {
      const body =
        token.items?.map((item: any) => r.listitem(item)).join("") ?? "";
      return token.ordered
        ? `<ol class="ml-6 mb-5 space-y-2 list-decimal">${body}</ol>`
        : `<ul class="ml-6 mb-5 space-y-2 list-disc">${body}</ul>`;
    };
    r.listitem = (token: any) =>
      `<li class="text-gray-700 leading-relaxed text-base">${
        token.text ?? token
      }</li>`;
    r.link = (token: any) =>
      `<a href="${
        token.href
      }" class="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">${
        token.text ?? token.href
      }</a>`;
    return r;
  }, []);

  const renderedHtml = useMemo(() => {
    if (!markdownContent) return "";
    marked.use({ renderer });
    return marked(markdownContent) as string;
  }, [markdownContent, renderer]);

  useEffect(() => {
    // If content is passed directly, use it
    if (content) {
      setMarkdownContent(content);
      setIsLoading(false);
      return;
    }

    // Otherwise fetch from path
    if (!markdownPath) return;
    const fetchMarkdown = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(markdownPath);
        const text = await response.text();
        setMarkdownContent(text);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading markdown:", error);
        setIsLoading(false);
      }
    };

    fetchMarkdown();
  }, [markdownPath, content]);

  useEffect(() => {
    if (!markdownContent) return;

    const lines = markdownContent.split("\n");
    const extractedSections: Section[] = [];

    lines.forEach((line) => {
      const trimmedLine = line.trim();
      const h2Match = trimmedLine.match(/^##\s+(.+)$/);
      const h3Match = trimmedLine.match(/^###\s+(.+)$/);

      if (h2Match) {
        const title = h2Match[1].trim();
        const id = generateId(title);
        extractedSections.push({ title, id, level: 2 });
      } else if (h3Match) {
        const title = h3Match[1].trim();
        const id = generateId(title);
        extractedSections.push({ title, id, level: 3 });
      }
    });

    setSections(extractedSections);
  }, [markdownContent]);

  useEffect(() => {
    if (!markdownContent || sections.length === 0) return;

    const handleScroll = () => {
      if (isManualScrollRef.current) return;

      const headings = document.querySelectorAll<HTMLElement>("h2[id], h3[id]");
      if (headings.length === 0) return;

      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const isNearBottom = documentHeight - scrollPosition < 100;

      if (isNearBottom) {
        const lastHeading = Array.from(headings).pop();
        if (lastHeading) {
          setActiveSection(lastHeading.id);
          return;
        }
      }

      const scrollTop = window.scrollY + 150;
      let currentSection = "";

      headings.forEach((heading) => {
        const rect = heading.getBoundingClientRect();
        const offsetTop = window.scrollY + rect.top;
        if (offsetTop <= scrollTop) {
          currentSection = heading.id;
        }
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    const timeoutId = setTimeout(() => {
      handleScroll();
    }, 500);

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [markdownContent, sections]);

  const scrollToSection = (id: string): void => {
    isManualScrollRef.current = true;
    setActiveSection(id);

    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setIsMobileMenuOpen(false);

      setTimeout(() => {
        isManualScrollRef.current = false;
      }, 1000);
    } else {
      isManualScrollRef.current = false;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-gray-600">Loading...</div>
        </div>
      ) : (
        <>
          <div className="lg:hidden border-b border-gray-200 bg-white sticky top-0 z-50">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-full px-6 py-4 flex items-center justify-between text-left"
            >
              <span className="text-sm font-normal text-gray-700">
                On this page
              </span>
              <svg
                className={`w-5 h-5 text-gray-500 transform transition-transform ${
                  isMobileMenuOpen ? "rotate-180" : ""
                }`}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>

            {isMobileMenuOpen && (
              <div className="border-t border-gray-200 bg-white px-6 py-4 max-h-[50vh] overflow-y-auto">
                <nav className="space-y-3">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`
                        w-full text-left text-sm transition-colors block
                        ${section.level === 3 ? "pl-4" : ""}
                        ${
                          activeSection === section.id
                            ? "text-gray-900 font-normal"
                            : "text-gray-600"
                        }
                      `}
                    >
                      {section.title}
                    </button>
                  ))}
                </nav>
              </div>
            )}
          </div>

          <div className="flex max-w-[1400px] mx-auto">
            <main
              ref={contentRef}
              className="flex-1 px-6 md:px-12 lg:px-16 py-8 md:py-12"
            >
              <div
                className="max-w-[900px] prose prose-lg prose-gray"
                dangerouslySetInnerHTML={{ __html: renderedHtml }}
              />
            </main>

            <aside className="hidden lg:block w-80 xl:w-96 pl-8 pr-12 py-12 sticky top-20 self-start flex-shrink-0">
              <h3 className="text-xs font-normal text-gray-500 mb-6 tracking-wide">
                On this page
              </h3>
              <nav className="space-y-1 border-l-2 border-gray-200">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`
                      w-full text-left text-sm transition-all block leading-snug relative py-1.5
                      ${section.level === 3 ? "pl-8" : "pl-4"}
                      ${
                        activeSection === section.id
                          ? "text-blue-600 font-medium"
                          : "text-gray-600 hover:text-gray-900"
                      }
                    `}
                  >
                    {activeSection === section.id && (
                      <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-600 -ml-0.5"></span>
                    )}
                    {section.title}
                  </button>
                ))}
              </nav>
            </aside>
          </div>
        </>
      )}
    </div>
  );
};

export default MarkdownViewer;

import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Section {
  title: string;
  id: string;
  level: number;
}

interface MarkdownViewerProps {
  markdownPath: string;
}

const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ markdownPath }) => {
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

  useEffect(() => {
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
  }, [markdownPath]);

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

      // Check if user is near the bottom of the page
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const isNearBottom = documentHeight - scrollPosition < 100;

      // If near bottom, highlight the last section
      if (isNearBottom) {
        const lastHeading = Array.from(headings).pop();
        if (lastHeading) {
          setActiveSection(lastHeading.id);
          return;
        }
      }

      // Normal scroll tracking
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

    // Initial check after a delay to ensure DOM is ready
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
              <div className="max-w-[900px] prose prose-lg prose-gray">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ node, ...props }) => (
                      <h1
                        className="text-3xl md:text-4xl font-normal mb-5 text-gray-900 leading-tight"
                        {...props}
                      />
                    ),
                    h2: ({ node, children, ...props }) => {
                      const text = String(children);
                      const id = generateId(text);
                      return (
                        <h2
                          id={id}
                          className="text-2xl md:text-2xl font-normal mt-10 mb-4 text-gray-900 scroll-mt-20 leading-tight group relative"
                          {...props}
                        >
                          <a
                            href={`#${id}`}
                            className="absolute -left-6 opacity-0 group-hover:opacity-100 transition-opacity pr-1"
                            aria-label="Link to this section"
                          >
                            <svg
                              className="w-5 h-5 text-gray-400"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                            >
                              <path d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path>
                            </svg>
                          </a>
                          {children}
                        </h2>
                      );
                    },
                    h3: ({ node, children, ...props }) => {
                      const text = String(children);
                      const id = generateId(text);
                      return (
                        <h3
                          id={id}
                          className="text-xl md:text-xl font-normal mt-8 mb-3 text-gray-900 scroll-mt-20 leading-tight group relative"
                          {...props}
                        >
                          <a
                            href={`#${id}`}
                            className="absolute -left-6 opacity-0 group-hover:opacity-100 transition-opacity pr-1"
                            aria-label="Link to this section"
                          >
                            <svg
                              className="w-4 h-4 text-gray-400"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                            >
                              <path d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path>
                            </svg>
                          </a>
                          {children}
                        </h3>
                      );
                    },
                    p: ({ node, ...props }) => (
                      <p
                        className="mb-5 text-gray-700 leading-relaxed text-base"
                        {...props}
                      />
                    ),
                    ul: ({ node, ...props }) => (
                      <ul
                        className="ml-6 mb-5 space-y-2 list-disc"
                        {...props}
                      />
                    ),
                    li: ({ node, ...props }) => (
                      <li
                        className="text-gray-700 leading-relaxed text-base"
                        {...props}
                      />
                    ),
                    a: ({ node, ...props }) => (
                      <a
                        className="text-blue-600 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                        {...props}
                      />
                    ),
                  }}
                >
                  {markdownContent}
                </ReactMarkdown>
              </div>
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

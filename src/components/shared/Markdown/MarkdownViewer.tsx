import React, { useState, useEffect, useRef } from "react";

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
  const observerRef = useRef<IntersectionObserver | null>(null);
  const isManualScrollRef = useRef<boolean>(false);

  const generateId = (text: string): string => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "") // Remove special characters except spaces and hyphens
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/-+/g, "-"); // Replace multiple hyphens with single hyphen
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
        extractedSections.push({
          title: title,
          id: id,
          level: 2,
        });
        console.log(`H2: "${title}" -> ID: "${id}"`);
      } else if (h3Match) {
        const title = h3Match[1].trim();
        const id = generateId(title);
        extractedSections.push({
          title: title,
          id: id,
          level: 3,
        });
        console.log(`H3: "${title}" -> ID: "${id}"`);
      }
    });

    console.log("Extracted sections:", extractedSections);
    setSections(extractedSections);
  }, [markdownContent]);

  useEffect(() => {
    if (!markdownContent) return;

    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    };

    observerRef.current = new IntersectionObserver((entries) => {
      if (isManualScrollRef.current) return;

      const intersecting = entries.filter((entry) => entry.isIntersecting);

      if (intersecting.length > 0) {
        const topMost = intersecting.reduce((prev, current) => {
          return current.boundingClientRect.top < prev.boundingClientRect.top
            ? current
            : prev;
        });
        setActiveSection(topMost.target.id);
      }
    }, options);

    setTimeout(() => {
      const headings = document.querySelectorAll<HTMLElement>("h2[id], h3[id]");
      console.log(`Found ${headings.length} headings to observe`);
      headings.forEach((heading) => {
        console.log(`Observing heading: ${heading.id}`);
        observerRef.current?.observe(heading);
      });
    }, 100);

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (documentHeight - scrollPosition < 100) {
        const headings =
          document.querySelectorAll<HTMLElement>("h2[id], h3[id]");
        const lastHeading = Array.from(headings).pop();
        if (lastHeading) {
          setActiveSection(lastHeading.id);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, [markdownContent]);

  const renderMarkdown = (markdown: string): JSX.Element[] => {
    const lines = markdown.split("\n");
    const elements: JSX.Element[] = [];
    let currentList: JSX.Element[] = [];
    let inList = false;

    lines.forEach((line, index) => {
      if (line.startsWith("# ")) {
        if (inList) {
          elements.push(
            <ul key={`list-${index}`} className="ml-6 mb-5 space-y-2">
              {currentList}
            </ul>
          );
          currentList = [];
          inList = false;
        }
        const text = line.substring(2).trim();
        elements.push(
          <h1
            key={index}
            className="text-3xl md:text-4xl font-normal mb-5 text-gray-900 leading-tight"
          >
            {text}
          </h1>
        );
      } else if (line.startsWith("## ")) {
        if (inList) {
          elements.push(
            <ul key={`list-${index}`} className="ml-6 mb-5 space-y-2">
              {currentList}
            </ul>
          );
          currentList = [];
          inList = false;
        }
        const text = line.substring(3).trim();
        const id = generateId(text);
        elements.push(
          <h2
            key={index}
            id={id}
            className="text-2xl md:text-2xl font-normal mt-10 mb-4 text-gray-900 scroll-mt-20 leading-tight"
          >
            {text}
          </h2>
        );
      } else if (line.startsWith("### ")) {
        if (inList) {
          elements.push(
            <ul key={`list-${index}`} className="ml-6 mb-5 space-y-2">
              {currentList}
            </ul>
          );
          currentList = [];
          inList = false;
        }
        const text = line.substring(4).trim();
        const id = generateId(text);
        elements.push(
          <h3
            key={index}
            id={id}
            className="text-xl md:text-xl font-normal mt-8 mb-3 text-gray-900 scroll-mt-20 leading-tight"
          >
            {text}
          </h3>
        );
      } else if (line.startsWith("- ")) {
        inList = true;
        const text = line.substring(2);
        const linkMatch = text.match(/\[([^\]]+)\]\(([^)]+)\)/);
        if (linkMatch) {
          currentList.push(
            <li
              key={`${index}-li`}
              className="text-gray-700 leading-relaxed text-base list-disc"
            >
              <a
                href={linkMatch[2]}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {linkMatch[1]}
              </a>
            </li>
          );
        } else {
          currentList.push(
            <li
              key={`${index}-li`}
              className="text-gray-700 leading-relaxed text-base list-disc"
            >
              {text}
            </li>
          );
        }
      } else if (line.trim() !== "") {
        if (inList) {
          elements.push(
            <ul key={`list-${index}`} className="ml-6 mb-5 space-y-2">
              {currentList}
            </ul>
          );
          currentList = [];
          inList = false;
        }
        const linkMatch = line.match(/\[([^\]]+)\]\(([^)]+)\)/);
        if (linkMatch) {
          const beforeLink = line.substring(0, line.indexOf("["));
          const afterLink = line.substring(line.indexOf(")") + 1);
          elements.push(
            <p
              key={index}
              className="mb-5 text-gray-700 leading-relaxed text-base"
            >
              {beforeLink}
              <a
                href={linkMatch[2]}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {linkMatch[1]}
              </a>
              {afterLink}
            </p>
          );
        } else {
          elements.push(
            <p
              key={index}
              className="mb-5 text-gray-700 leading-relaxed text-base"
            >
              {line}
            </p>
          );
        }
      }
    });

    if (inList && currentList.length > 0) {
      elements.push(
        <ul key="list-final" className="ml-6 mb-5 space-y-2">
          {currentList}
        </ul>
      );
    }

    return elements;
  };

  const scrollToSection = (id: string): void => {
    console.log(`Scrolling to section: ${id}`);

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
      console.log(`Element with id "${id}" not found`);
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
              <div className="max-w-[900px]">
                {renderMarkdown(markdownContent)}
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

import MarkdownViewer from "../shared/Markdown/MarkdownViewer";
import privacyContent from "@/assets/markdown/privacy.md?raw";

const Policy: React.FC = () => {
  return <MarkdownViewer content={privacyContent} />;
};

export default Policy;

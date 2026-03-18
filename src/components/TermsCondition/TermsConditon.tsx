import MarkdownViewer from "../shared/Markdown/MarkdownViewer";
import termsContent from "@/assets/markdown/terms.md?raw";

const TermsAndConditions: React.FC = () => {
  return <MarkdownViewer content={termsContent} />;
};

export default TermsAndConditions;

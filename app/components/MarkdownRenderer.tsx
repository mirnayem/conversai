import React from "react";
import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

const components: Components = {
  code({
    inline,
    children,
    ...props
  }: React.HTMLProps<HTMLElement> & { inline?: boolean }) {
    return inline ? (
      <code {...props} className="bg-gray-200 px-2 py-1 rounded">
        {children}
      </code>
    ) : (
      <pre className="my-4 overflow-x-auto p-4 rounded">
        <SyntaxHighlighter>
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      </pre>
    );
  },
  ul: ({ children }) => <ul className="list-disc ml-4">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal ml-4">{children}</ol>,
  li: ({ children }) => <li className="ml-4">{children}</li>,
};

const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;

import { useCallback } from "react";
import TurndownService from "turndown";

const useCopyMarkdown = (onCopyStatus: (status: 'success' | 'error') => void) => {
  const handleCopy = useCallback(async (htmlContent: string) => {
    try {
      const turndownService = new TurndownService();
      const markdown = turndownService.turndown(htmlContent);
      await navigator.clipboard.writeText(markdown);
      onCopyStatus('success');

    } catch (err) {
      console.error("Failed to copy markdown", err);
      onCopyStatus('error');

    }
  }, [onCopyStatus]);

  return { handleCopy };
};

export default useCopyMarkdown;

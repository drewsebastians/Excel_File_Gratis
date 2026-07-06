import { marked } from "marked";

marked.use({
  gfm: true,
  breaks: false,
});

const faqHeadingPattern = /^##\s+Pertanyaan yang Sering Ditanyakan.*$/im;

export type FaqItem = {
  question: string;
  answer: string;
  answerHtml: string;
};

export function markdownToHtml(markdown: string) {
  return marked.parse(markdown, { async: false }) as string;
}

export function splitArticleAndFaq(markdown: string) {
  const match = markdown.match(faqHeadingPattern);
  if (!match || match.index === undefined) {
    return {
      articleMarkdown: markdown,
      faqHeading: "Pertanyaan yang Sering Ditanyakan",
      faqItems: [] as FaqItem[],
      closingMarkdown: "",
    };
  }

  const articleMarkdown = markdown.slice(0, match.index).trim();
  const afterHeading = markdown.slice(match.index + match[0].length).trim();
  const [faqMarkdown, closingMarkdown = ""] = afterHeading.split(/\n---\n/);
  const faqItems = extractFaqItems(faqMarkdown);

  return {
    articleMarkdown,
    faqHeading: match[0].replace(/^##\s+/, "").trim(),
    faqItems,
    closingMarkdown: closingMarkdown.trim(),
  };
}

function extractFaqItems(markdown: string): FaqItem[] {
  const itemPattern = /\*\*(.+?)\*\*\s*\n([\s\S]*?)(?=\n\*\*|$)/g;
  const items: FaqItem[] = [];
  let match: RegExpExecArray | null;

  while ((match = itemPattern.exec(markdown)) !== null) {
    const question = match[1].trim();
    const answer = match[2].trim();
    if (!question || !answer) continue;
    items.push({
      question,
      answer,
      answerHtml: markdownToHtml(answer),
    });
  }

  return items;
}

export function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

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
  const [faqMarkdown, explicitClosingMarkdown = ""] = afterHeading.split(/\n---\n/);
  const { items: faqItems, trailingMarkdown } = extractFaqItems(faqMarkdown);
  const closingMarkdown = [trailingMarkdown, explicitClosingMarkdown]
    .filter(Boolean)
    .join("\n\n");

  return {
    articleMarkdown,
    faqHeading: match[0].replace(/^##\s+/, "").trim(),
    faqItems,
    closingMarkdown: closingMarkdown.trim(),
  };
}

function extractFaqItems(markdown: string) {
  const itemPattern = /^\*\*(.+?)\*\*\s*$/gm;
  const matches = [...markdown.matchAll(itemPattern)];
  const items: FaqItem[] = [];
  let trailingMarkdown = "";

  matches.forEach((match, index) => {
    const question = match[1].trim();
    const answerStart = (match.index || 0) + match[0].length;
    const answerEnd = matches[index + 1]?.index ?? markdown.length;
    let answer = markdown.slice(answerStart, answerEnd).trim();

    if (index === matches.length - 1) {
      const splitAnswer = splitClosingFromAnswer(answer);
      answer = splitAnswer.answer;
      trailingMarkdown = splitAnswer.closing;
    }

    if (!question || !answer) return;
    items.push({
      question,
      answer,
      answerHtml: markdownToHtml(answer),
    });
  });

  return { items, trailingMarkdown };
}

function splitClosingFromAnswer(answer: string) {
  const closingMatch = answer.match(
    /\n{2,}(?=(?:\*?Siap coba|Yuk|Punya banyak|Langsung|Download)\b)/i,
  );

  if (!closingMatch || closingMatch.index === undefined) {
    return { answer, closing: "" };
  }

  return {
    answer: answer.slice(0, closingMatch.index).trim(),
    closing: answer.slice(closingMatch.index).trim(),
  };
}

export function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

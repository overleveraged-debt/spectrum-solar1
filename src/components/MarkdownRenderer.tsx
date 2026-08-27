import React from 'react';
import { Link } from 'react-router-dom';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export default function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  if (!content) return null;

  // Helper to render inline text formatting (bold, italic, links, code)
  const renderInlineText = (text: string): React.ReactNode => {
    // Regex matches:
    // 1. [text](url) -> Links
    // 2. **bold** -> Bold
    // 3. *italic* -> Italic
    // 4. `code` -> Code
    const tokens: React.ReactNode[] = [];
    let remaining = text;
    let keyIdx = 0;

    while (remaining.length > 0) {
      // Check for markdown image inline: ![alt](url)
      const imgMatch = remaining.match(/^!\[([^\]]*)\]\(([^)]+)\)/);
      if (imgMatch) {
        tokens.push(
          <span key={`img-${keyIdx++}`} className="block my-6 rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900">
            <img src={imgMatch[2]} alt={imgMatch[1] || 'Blog illustration'} className="w-full h-auto max-h-[500px] object-cover" />
            {imgMatch[1] && (
              <span className="block text-center text-xs text-zinc-500 py-2 bg-zinc-950/80 italic font-mono">
                {imgMatch[1]}
              </span>
            )}
          </span>
        );
        remaining = remaining.slice(imgMatch[0].length);
        continue;
      }

      // Check for link: [text](url)
      const linkMatch = remaining.match(/^\[([^\]]+)\]\(([^)]+)\)/);
      if (linkMatch) {
        const linkText = linkMatch[1];
        const linkUrl = linkMatch[2];
        const isExternal = linkUrl.startsWith('http://') || linkUrl.startsWith('https://');

        if (isExternal) {
          tokens.push(
            <a
              key={`link-${keyIdx++}`}
              href={linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-400 hover:text-yellow-300 underline underline-offset-4 decoration-yellow-400/50 hover:decoration-yellow-400 font-medium transition-colors"
            >
              {linkText}
            </a>
          );
        } else {
          tokens.push(
            <Link
              key={`link-${keyIdx++}`}
              to={linkUrl}
              className="text-yellow-400 hover:text-yellow-300 underline underline-offset-4 decoration-yellow-400/50 hover:decoration-yellow-400 font-medium transition-colors"
            >
              {linkText}
            </Link>
          );
        }
        remaining = remaining.slice(linkMatch[0].length);
        continue;
      }

      // Check for bold: **bold** or __bold__
      const boldMatch = remaining.match(/^(\*\*|__)(.*?)\1/);
      if (boldMatch) {
        tokens.push(
          <strong key={`bold-${keyIdx++}`} className="font-bold text-white">
            {renderInlineText(boldMatch[2])}
          </strong>
        );
        remaining = remaining.slice(boldMatch[0].length);
        continue;
      }

      // Check for italic: *italic* or _italic_
      const italicMatch = remaining.match(/^(\*|_)(.*?)\1/);
      if (italicMatch) {
        tokens.push(
          <em key={`italic-${keyIdx++}`} className="italic text-zinc-200">
            {renderInlineText(italicMatch[2])}
          </em>
        );
        remaining = remaining.slice(italicMatch[0].length);
        continue;
      }

      // Check for inline code: `code`
      const codeMatch = remaining.match(/^`([^`]+)`/);
      if (codeMatch) {
        tokens.push(
          <code key={`code-${keyIdx++}`} className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 text-yellow-400 rounded-md font-mono text-xs">
            {codeMatch[1]}
          </code>
        );
        remaining = remaining.slice(codeMatch[0].length);
        continue;
      }

      // Plain character advance
      // Find index of next special character
      const nextSpecial = remaining.search(/(\[|!\[|\*\*|__|\*|_|`)/);
      if (nextSpecial === -1) {
        tokens.push(remaining);
        break;
      } else if (nextSpecial === 0) {
        // Special character that didn't match a rule, consume 1 char
        tokens.push(remaining[0]);
        remaining = remaining.slice(1);
      } else {
        tokens.push(remaining.slice(0, nextSpecial));
        remaining = remaining.slice(nextSpecial);
      }
    }

    return tokens;
  };

  // Split into block lines / paragraphs
  const rawLines = content.split('\n');
  const blocks: React.ReactNode[] = [];
  let currentList: { type: 'ul' | 'ol'; items: string[] } | null = null;
  let blockIdx = 0;

  const flushList = () => {
    if (!currentList) return;
    if (currentList.type === 'ul') {
      blocks.push(
        <ul key={`list-${blockIdx++}`} className="space-y-2.5 my-4 pl-6 list-disc marker:text-yellow-400 text-zinc-300">
          {currentList.items.map((item, i) => (
            <li key={i} className="leading-relaxed">
              {renderInlineText(item)}
            </li>
          ))}
        </ul>
      );
    } else {
      blocks.push(
        <ol key={`list-${blockIdx++}`} className="space-y-2.5 my-4 pl-6 list-decimal marker:text-yellow-400 marker:font-bold text-zinc-300">
          {currentList.items.map((item, i) => (
            <li key={i} className="leading-relaxed">
              {renderInlineText(item)}
            </li>
          ))}
        </ol>
      );
    }
    currentList = null;
  };

  for (let i = 0; i < rawLines.length; i++) {
    const line = rawLines[i].trim();

    if (!line) {
      flushList();
      continue;
    }

    // Heading 1: # Heading
    if (line.startsWith('# ')) {
      flushList();
      blocks.push(
        <h1 key={`h1-${blockIdx++}`} className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-10 mb-4 first:mt-0 uppercase">
          {renderInlineText(line.replace(/^#\s+/, ''))}
        </h1>
      );
      continue;
    }

    // Heading 2: ## Heading
    if (line.startsWith('## ')) {
      flushList();
      blocks.push(
        <h2 key={`h2-${blockIdx++}`} className="text-2xl sm:text-3xl font-semibold tracking-tight text-white mt-10 mb-4 first:mt-0 flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-yellow-400 inline-block shrink-0" />
          <span>{renderInlineText(line.replace(/^##\s+/, ''))}</span>
        </h2>
      );
      continue;
    }

    // Heading 3: ### Heading
    if (line.startsWith('### ')) {
      flushList();
      blocks.push(
        <h3 key={`h3-${blockIdx++}`} className="text-xl sm:text-2xl font-semibold text-zinc-100 mt-8 mb-3 first:mt-0">
          {renderInlineText(line.replace(/^###\s+/, ''))}
        </h3>
      );
      continue;
    }

    // Standalone Image: ![alt](url)
    const standaloneImgMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (standaloneImgMatch) {
      flushList();
      blocks.push(
        <figure key={`fig-${blockIdx++}`} className="my-8 rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-950 shadow-2xl">
          <img
            src={standaloneImgMatch[2]}
            alt={standaloneImgMatch[1] || 'Blog visual'}
            className="w-full h-auto max-h-[550px] object-cover"
            loading="lazy"
          />
          {standaloneImgMatch[1] && (
            <figcaption className="text-center text-xs text-zinc-400 py-3 px-4 bg-zinc-900 border-t border-zinc-850 font-medium">
              {standaloneImgMatch[1]}
            </figcaption>
          )}
        </figure>
      );
      continue;
    }

    // Blockquote: > Quote
    if (line.startsWith('>')) {
      flushList();
      const quoteContent = line.replace(/^>\s*/, '');
      blocks.push(
        <blockquote
          key={`quote-${blockIdx++}`}
          className="my-6 p-6 rounded-2xl bg-zinc-900/60 border-l-4 border-yellow-400 text-zinc-200 italic font-serif text-lg leading-relaxed shadow-sm"
        >
          {renderInlineText(quoteContent)}
        </blockquote>
      );
      continue;
    }

    // Bullet List Item: - or *
    if (line.startsWith('- ') || line.startsWith('* ')) {
      const itemText = line.replace(/^[-*]\s+/, '');
      if (!currentList || currentList.type !== 'ul') {
        flushList();
        currentList = { type: 'ul', items: [itemText] };
      } else {
        currentList.items.push(itemText);
      }
      continue;
    }

    // Numbered List Item: 1. or 2.
    const numMatch = line.match(/^\d+\.\s+(.*)/);
    if (numMatch) {
      const itemText = numMatch[1];
      if (!currentList || currentList.type !== 'ol') {
        flushList();
        currentList = { type: 'ol', items: [itemText] };
      } else {
        currentList.items.push(itemText);
      }
      continue;
    }

    // Standard Paragraph
    flushList();
    blocks.push(
      <p key={`p-${blockIdx++}`} className="text-zinc-300 leading-relaxed font-light text-base my-4">
        {renderInlineText(line)}
      </p>
    );
  }

  flushList();

  return <div className={`space-y-2 ${className}`}>{blocks}</div>;
}

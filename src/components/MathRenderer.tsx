import React, { useMemo } from 'react';
import katex from 'katex';

interface MathRendererProps {
  math: string;
  inline?: boolean;
  className?: string;
}

// Check if string contains Vietnamese accented characters
const VIETNAMESE_REGEX = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđĐ]/i;

/**
 * Enhanced MathRenderer:
 * Automatically detects whether input is pure LaTeX or mixed natural text,
 * avoiding sending Vietnamese prose into KaTeX which causes font glitches and red error spans.
 */
export const MathRenderer: React.FC<MathRendererProps> = ({
  math,
  inline = false,
  className = '',
}) => {
  const isMixedContent = useMemo(() => {
    if (!math) return false;
    const trimmed = math.trim();
    // If it has markdown bold, list bullets, or Vietnamese letters outside \text{}
    if (trimmed.includes('**') || trimmed.includes('\n•') || trimmed.includes('• ')) return true;
    if (VIETNAMESE_REGEX.test(trimmed)) {
      // Check if it's not a pure math block
      if (!(trimmed.startsWith('$$') && trimmed.endsWith('$$')) && !(trimmed.startsWith('$') && trimmed.endsWith('$'))) {
        return true;
      }
    }
    // Has multiple $ or mixed words with spaces
    const dollarCount = (trimmed.match(/\$/g) || []).length;
    if (dollarCount >= 2 && !(trimmed.startsWith('$') && trimmed.endsWith('$') && dollarCount === 2)) {
      return true;
    }
    // If it has spaces and common Vietnamese words
    if (trimmed.includes(' ') && (trimmed.includes('là') || trimmed.includes('của') || trimmed.includes('khi') || trimmed.includes('trong'))) {
      return true;
    }
    return false;
  }, [math]);

  if (isMixedContent) {
    return <FormattedText text={math} className={className} inline={inline} />;
  }

  return <PureKatexMath math={math} inline={inline} className={className} />;
};

/**
 * Pure KaTeX Renderer for actual mathematical and physical formulas
 */
export const PureKatexMath: React.FC<{ math: string; inline?: boolean; className?: string }> = ({
  math,
  inline = false,
  className = '',
}) => {
  const html = useMemo(() => {
    try {
      let cleaned = (math || '').trim();
      if (cleaned.startsWith('$$') && cleaned.endsWith('$$')) {
        cleaned = cleaned.slice(2, -2);
      } else if (cleaned.startsWith('$') && cleaned.endsWith('$')) {
        cleaned = cleaned.slice(1, -1);
      }

      // Pre-clean common physical units to be rendered upright in math mode
      cleaned = cleaned
        .replace(/\\text\{thực tế\}/gi, '\\mathrm{tt}')
        .replace(/\\text\{đồng\}/gi, '\\mathrm{Cu}')
        .replace(/\\text\{([A-Za-z0-9\s,.-]+)\}/g, (match, p1) => `\\mathrm{${p1}}`)
        .replace(/(\\Omega|\\cdot)/g, ' $1 ');

      // Convert \frac to \dfrac to ensure comfortable vertical clearance and legible fractions
      cleaned = cleaned.replace(/\\frac\{/g, '\\dfrac{');

      const rendered = katex.renderToString(cleaned, {
        displayMode: !inline,
        throwOnError: false,
        output: 'html',
        strict: false,
        trust: true,
      });

      // Filter out ugly red error spans if KaTeX still fell back
      if (rendered.includes('class="katex-error"')) {
        return `<span class="katex-clean font-semibold text-slate-800">${escapeHtml(cleaned)}</span>`;
      }
      return rendered;
    } catch {
      return `<span class="font-semibold text-slate-800">${escapeHtml(math)}</span>`;
    }
  }, [math, inline]);

  if (inline) {
    return (
      <span
        className={`inline-math font-medium align-middle px-0.5 text-slate-900 ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <div
      className={`my-2 flex justify-center items-center overflow-x-auto py-1 text-slate-900 ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

function escapeHtml(str: string): string {
  return (str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * FormattedText: Renders mixed Vietnamese text with embedded $...$ formulas,
 * Markdown **bold**, and line breaks cleanly with native typography!
 */
export const FormattedText: React.FC<{
  text: string;
  className?: string;
  inline?: boolean;
}> = ({ text, className = '', inline = false }) => {
  // Parse paragraphs/lines and tokens
  const tokens = useMemo(() => {
    if (!text) return [];

    // First split by $$...$$ (block math) and $...$ (inline math)
    const regex = /(\$\$[\s\S]*?\$\$|\$[^\$]+?\$)/g;
    const parts: { type: 'text' | 'inline-math' | 'block-math'; content: string }[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          content: text.substring(lastIndex, match.index),
        });
      }
      const token = match[0];
      if (token.startsWith('$$')) {
        parts.push({
          type: 'block-math',
          content: token.slice(2, -2).trim(),
        });
      } else {
        parts.push({
          type: 'inline-math',
          content: token.slice(1, -1).trim(),
        });
      }
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push({
        type: 'text',
        content: text.substring(lastIndex),
      });
    }

    return parts;
  }, [text]);

  const renderTextContent = (rawText: string, keyPrefix: string) => {
    // Check for markdown bold **...**
    const boldRegex = /(\*\*[^*]+?\*\*)/g;
    const segments = rawText.split(boldRegex);

    return segments.map((seg, sIdx) => {
      if (seg.startsWith('**') && seg.endsWith('**')) {
        const inner = seg.slice(2, -2);
        return (
          <strong key={`${keyPrefix}-bold-${sIdx}`} className="font-extrabold text-slate-900">
            {inner}
          </strong>
        );
      }

      // Format bullet points or line breaks
      if (seg.includes('\n')) {
        const lines = seg.split('\n');
        return lines.map((line, lIdx) => (
          <React.Fragment key={`${keyPrefix}-line-${sIdx}-${lIdx}`}>
            {lIdx > 0 && <br />}
            {line}
          </React.Fragment>
        ));
      }

      return <span key={`${keyPrefix}-txt-${sIdx}`}>{seg}</span>;
    });
  };

  const Wrapper = inline ? 'span' : 'div';

  return (
    <Wrapper className={`leading-relaxed text-slate-700 ${className}`}>
      {tokens.map((token, tIdx) => {
        if (token.type === 'inline-math') {
          return (
            <PureKatexMath
              key={`math-in-${tIdx}`}
              math={token.content}
              inline={true}
            />
          );
        }
        if (token.type === 'block-math') {
          return (
            <PureKatexMath
              key={`math-bl-${tIdx}`}
              math={token.content}
              inline={false}
            />
          );
        }
        return (
          <React.Fragment key={`tok-${tIdx}`}>
            {renderTextContent(token.content, `t-${tIdx}`)}
          </React.Fragment>
        );
      })}
    </Wrapper>
  );
};

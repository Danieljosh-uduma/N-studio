import { style } from "../../../_studio-frame/css.js";
import { COLORS, SPACING, RADIUS } from "../../styles/theme.js";

style('.code-block', {
    backgroundColor: COLORS.gray[800],
    borderRadius: RADIUS.lg,
    border: `1px solid ${COLORS.border}`,
    margin: `${SPACING.xl} 0`,
    overflow: 'hidden',
    position: 'relative'
});

style('.code-header', {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: `${SPACING.sm} ${SPACING.lg}`,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderBottom: `1px solid ${COLORS.border}`,
    fontSize: '0.75rem',
    color: COLORS.gray[500],
    textTransform: 'uppercase',
    fontWeight: '600'
});

style('.code-content', {
    padding: SPACING.lg,
    margin: '0',
    overflowX: 'auto',
    fontFamily: '"Fira Code", "JetBrains Mono", source-code-pro, Menlo, Monaco, Consolas, monospace',
    fontSize: '0.875rem',
    lineHeight: '1.7',
    color: '#E2E8F0'
});

style('.copy-btn', {
    padding: '4px 8px',
    fontSize: '0.7rem',
    borderRadius: RADIUS.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: `1px solid ${COLORS.border}`,
    color: COLORS.gray[400],
    transition: 'all 0.2s ease',
    cursor: 'pointer'
});

style('.copy-btn:hover', {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: COLORS.text,
    borderColor: COLORS.gray[500]
});

style('.copy-btn.copied', {
    color: COLORS.accent,
    borderColor: COLORS.accent,
    backgroundColor: 'rgba(6, 182, 212, 0.1)'
});

style('.code-comment', { color: COLORS.gray[500] });
style('.code-keyword', { color: '#C084FC' });
style('.code-string', { color: '#4ADE80' });
style('.code-function', { color: '#60A5FA' });

export const CodeBlock = ({ id = `cb-${Math.random().toString(36).substr(2, 9)}`, language = 'javascript', code = '' }) => {
    // 1. Escape HTML to prevent injection and rendering issues
    const escapedCode = code
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    // 2. Single-pass regex for reliable tokenization (prevents overlapping highlights)
    const tokenRegex = /(['"`].*?['"`])|(\/\/.+)|(\/\*[\s\S]*?\*\/)|\b(const|let|var|export|import|from|return|if|else|function|async|await|class|constructor|export|default|null|undefined|true|false)\b|(\b\w+(?=\s*\())/g;

    const highlightedCode = escapedCode.replace(tokenRegex, (match, string, sliComment, mliComment, keyword, func) => {
        if (string) return `<span class="code-string">${match}</span>`;
        if (sliComment || mliComment) return `<span class="code-comment">${match}</span>`;
        if (keyword) return `<span class="code-keyword">${match}</span>`;
        if (func) return `<span class="code-function">${match}</span>`;
        return match;
    });

    const btnId = `copy-${id}`;

    return {
        canvas: () => `
            <div class="code-block" id="${id}">
                <div class="code-header">
                    <span>${language}</span>
                    <button id="${btnId}" class="copy-btn">Copy</button>
                </div>
                <pre class="code-content"><code>${highlightedCode}</code></pre>
            </div>
        `,
        action: [
            {
                id: btnId,
                type: 'click',
                func: () => {
                    navigator.clipboard.writeText(code).then(() => {
                        const btn = document.getElementById(btnId);
                        if (btn) {
                            const originalText = btn.innerText;
                            btn.innerText = 'Copied!';
                            btn.classList.add('copied');
                            setTimeout(() => {
                                btn.innerText = originalText;
                                btn.classList.remove('copied');
                            }, 2000);
                        }
                    });
                }
            }
        ]
    };
};

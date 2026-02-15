import { style } from "../../../_studio-frame/css.js";
import { COLORS, SPACING, RADIUS } from "../../styles/theme.js";

style('.api-item', {
    marginBottom: '64px',
    borderBottom: `1px solid ${COLORS.border}`,
    paddingBottom: '32px'
});

style('.api-name', {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: SPACING.md,
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
});

style('.api-badge', {
    fontSize: '0.7rem',
    padding: '2px 8px',
    borderRadius: RADIUS.sm,
    backgroundColor: 'rgba(6, 182, 212, 0.1)',
    color: COLORS.accent,
    border: `1px solid rgba(6, 182, 212, 0.2)`
});

style('.api-signature', {
    fontFamily: 'monospace',
    padding: SPACING.md,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: RADIUS.md,
    color: COLORS.gray[400],
    marginBottom: SPACING.lg
});

export const ApiItem = ({ name, type, signature, description, exampleCode }) => {
    return `
        <div class="api-item" id="${name.toLowerCase()}">
            <h3 class="api-name">
                ${name}
                <span class="api-badge">${type}</span>
            </h3>
            <div class="api-signature">${signature}</div>
            <p class="mb-6 text-slate-400 leading-relaxed">${description}</p>
            ${exampleCode || ''}
        </div>
    `;
};

import { style } from "../../../_studio-frame/css.js";
import { COLORS, RADIUS, SPACING } from "../../styles/theme.js";

style('.btn', {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: `${SPACING.md} ${SPACING.xl}`,
    borderRadius: RADIUS.full,
    fontWeight: '600',
    fontSize: '0.95rem',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    border: 'none',
    outline: 'none',
    gap: '8px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
});

style('.btn:active', {
    transform: 'scale(0.96)'
});

style('.btn-primary', {
    background: COLORS.gradient,
    color: COLORS.text,
    boxShadow: '0 10px 15px -3px rgba(99, 102, 241, 0.3)'
});

style('.btn-primary:hover', {
    background: COLORS.gradientHover,
    boxShadow: '0 20px 25px -5px rgba(99, 102, 241, 0.4)',
    transform: 'translateY(-2px)'
});

style('.btn-secondary', {
    background: COLORS.gray[800],
    color: COLORS.text,
    border: `1px solid ${COLORS.border}`
});

style('.btn-secondary:hover', {
    background: COLORS.gray[700],
    borderColor: 'rgba(255, 255, 255, 0.2)'
});

style('.btn-ghost', {
    background: 'transparent',
    color: COLORS.gray[400],
    boxShadow: 'none'
});

style('.btn-ghost:hover', {
    color: COLORS.text,
    background: COLORS.glass
});

export const Button = ({ id, label, variant = 'primary', icon = '' }) => {
    return {
        canvas: () => `
            <button id="${id}" class="btn btn-${variant}">
                ${icon ? `<span>${icon}</span>` : ''}
                ${label}
            </button>
        `,
        action: []
    };
};

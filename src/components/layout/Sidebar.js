import { injectCSS } from "../../../_studio-frame/frame.js";
import { style } from "../../../_studio-frame/css.js";
import { COLORS, SPACING } from "../../styles/theme.js";

style('.sidebar', {
    position: 'fixed',
    top: '64px',
    left: '0',
    bottom: '0',
    width: '280px',
    padding: `${SPACING.xl} ${SPACING.lg}`,
    backgroundColor: COLORS.background,
    borderRight: `1px solid ${COLORS.border}`,
    overflowY: 'auto',
    zIndex: '500',
    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
});

injectCSS(`
    @media (max-width: 1024px) {
        .sidebar {
            transform: translateX(-100%);
            box-shadow: 20px 0 50px rgba(0,0,0,0.5);
        }
        .sidebar.mobile-open {
            transform: translateX(0);
        }
    }
`);

style('.sidebar-category', {
    marginBottom: SPACING.xl
});

style('.sidebar-category-title', {
    fontSize: '0.75rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: COLORS.text,
    marginBottom: SPACING.sm,
    paddingLeft: SPACING.sm
});

style('.sidebar-link', {
    display: 'block',
    padding: `${SPACING.sm} ${SPACING.sm}`,
    fontSize: '0.9rem',
    color: COLORS.gray[400],
    textDecoration: 'none',
    borderRadius: '6px',
    transition: 'all 0.2s ease',
    marginBottom: '2px'
});

style('.sidebar-link:hover', {
    color: COLORS.text,
    backgroundColor: 'rgba(255, 255, 255, 0.05)'
});

style('.sidebar-link.active', {
    color: '#818CF8', // Indigo 400
    fontWeight: '600',
    backgroundColor: 'rgba(99, 102, 241, 0.1)'
});

export const Sidebar = ({ categories = [] }) => {
    return {
        canvas: () => `
            <aside class="sidebar">
                ${categories.map(cat => `
                    <div class="sidebar-category">
                        <div class="sidebar-category-title">${cat.title}</div>
                        <div class="sidebar-links">
                            ${cat.links.map(link => `
                                <a href="${link.href}" class="sidebar-link ${link.active ? 'active' : ''}">
                                    ${link.label}
                                </a>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </aside>
        `,
        action: []
    };
};

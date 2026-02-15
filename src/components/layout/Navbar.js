import { style } from "../../../_studio-frame/css.js";
import { injectCSS } from "../../../_studio-frame/frame.js";
import { COLORS, SPACING, RADIUS } from "../../styles/theme.js";

style('.navbar', {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    height: '64px',
    backgroundColor: COLORS.glass,
    backdropFilter: 'blur(12px)',
    borderBottom: `1px solid ${COLORS.border}`,
    display: 'flex',
    alignItems: 'center',
    padding: `0 ${SPACING.xl}`,
    zIndex: '1000',
    justifyContent: 'space-between'
});

style('.menu-toggle', {
    display: 'none',
    backgroundColor: 'transparent',
    border: 'none',
    color: COLORS.text,
    fontSize: '1.5rem',
    cursor: 'pointer',
    padding: SPACING.sm,
    marginRight: SPACING.sm
});

injectCSS(`
    @media (max-width: 1024px) {
        .navbar {
            padding: 0 ${SPACING.lg};
        }
        .menu-toggle {
            display: block;
        }
        .search-container, .nav-links {
            display: none;
        }
    }
`);

style('.nav-logo', {
    fontSize: '1.25rem',
    fontWeight: '800',
    color: COLORS.text,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    textDecoration: 'none'
});

style('.nav-logo span', {
    background: COLORS.gradient,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
});

style('.search-container', {
    position: 'relative',
    width: '320px'
});

style('.search-input', {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: `1px solid ${COLORS.border}`,
    borderRadius: RADIUS.md,
    padding: `${SPACING.sm} ${SPACING.md} ${SPACING.sm} 36px`,
    color: COLORS.text,
    fontSize: '0.9rem',
    transition: 'all 0.3s ease'
});

style('.search-input:focus', {
    outline: 'none',
    borderColor: COLORS.primary,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    boxShadow: `0 0 0 2px rgba(99, 102, 241, 0.2)`
});

style('.search-icon', {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: COLORS.gray[500],
    pointerEvents: 'none'
});

export const Navbar = () => {
    return {
        canvas: () => `
            <nav class="navbar">
                <div class="flex items-center gap-4">
                    <button id="mobile-menu-btn" class="menu-toggle">☰</button>
                    <a href="/" class="nav-logo">
                        <span>Studio</span>Framer
                    </a>
                </div>
                
                <div class="search-container">
                    <span class="search-icon">🔍</span>
                    <input type="text" class="search-input" placeholder="Search documentation...">
                </div>
                
                <div class="nav-links flex gap-6 items-center">
                    <a href="/docs" class="text-slate-400 hover:text-white transition-colors text-sm font-medium">Docs</a>
                    <a href="https://github.com" class="text-slate-400 hover:text-white transition-colors text-sm font-medium">GitHub</a>
                </div>
            </nav>
        `,
        action: [
            {
                id: 'mobile-menu-btn',
                type: 'click',
                func: () => {
                    const sidebar = document.querySelector('.sidebar');
                    if (sidebar) {
                        sidebar.classList.toggle('mobile-open');
                    }
                }
            }
        ]
    };
};

import { injectCSS } from "../../../_studio-frame/frame.js";
import { style } from "../../../_studio-frame/css.js";
import { COLORS, SPACING } from "../../styles/theme.js";
import { Navbar } from "./Navbar.js";
import { Sidebar } from "./Sidebar.js";

style('.dashboard-container', {
    display: 'flex',
    paddingTop: '64px', // Navbar height
    minHeight: '100vh',
    backgroundColor: COLORS.background
});

style('.dashboard-content', {
    marginLeft: '280px', // Sidebar width
    padding: `${SPACING.xl} ${SPACING.xl} 100px 100px`,
    width: '100%',
    maxWidth: '1000px',
    marginRight: 'auto',
    transition: 'all 0.3s ease'
});

injectCSS(`
    @media (max-width: 1200px) {
        .dashboard-content {
            padding: ${SPACING.xl} ${SPACING.xl} 100px 40px;
        }
    }
    @media (max-width: 1024px) {
        .dashboard-content {
            margin-left: 0;
            padding: ${SPACING.xl} ${SPACING.lg} 100px ${SPACING.lg};
        }
    }
`);

style('.doc-header', {
    marginBottom: SPACING.xl
});

style('.doc-title', {
    fontSize: '2.25rem',
    fontWeight: '800',
    color: COLORS.text,
    letterSpacing: '-0.025em',
    marginBottom: SPACING.sm
});

style('.doc-description', {
    fontSize: '1.125rem',
    color: COLORS.gray[400],
    lineHeight: '1.6',
    maxWidth: '700px'
});

export const DocLayout = ({ title, description, children, categories }) => {
    const navbar = Navbar();
    const sidebar = Sidebar({ categories });

    return {
        canvas: () => `
            <div class="doc-wrapper">
                ${navbar.canvas()}
                
                <div class="dashboard-container">
                    ${sidebar.canvas()}
                    
                    <main class="dashboard-content">
                        <header class="doc-header">
                            <h1 class="doc-title">${title}</h1>
                            <p class="doc-description">${description}</p>
                        </header>
                        
                        <div class="doc-body text-slate-300">
                            ${children}
                        </div>
                    </main>
                </div>
            </div>
        `,
        action: [
            ...navbar.action,
            ...sidebar.action
        ]
    };
};

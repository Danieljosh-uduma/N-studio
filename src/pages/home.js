import { style } from "../../_studio-frame/css.js";
import { studio, injectCSS, navigate } from "../../_studio-frame/frame.js";
import { COLORS, RADIUS, SPACING } from "../styles/theme.js";
import { Button } from "../components/atoms/Button.js";

// Page-specific styles
style('.home-wrapper', {
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: COLORS.background,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    perspective: '1000px'
});

// Animated Blobs
const createBlobStyle = (id, size, color, top, left, duration, delay) => {
    style(`.blob-${id}`, {
        position: 'absolute',
        width: size,
        height: size,
        backgroundColor: color,
        top: top,
        left: left,
        borderRadius: '50%',
        filter: 'blur(80px)',
        opacity: '0.4',
        zIndex: '1',
        animation: `move-${id} ${duration} infinite alternate ease-in-out`,
        animationDelay: delay
    });
};

// Inject raw CSS for animations
const rawCSS = `
    @keyframes blob-float {
        0% { transform: translate(0, 0) scale(1); }
        33% { transform: translate(30px, -50px) scale(1.1); }
        66% { transform: translate(-20px, 20px) scale(0.9); }
        100% { transform: translate(0, 0) scale(1); }
    }
    @keyframes pulse-soft {
        0% { opacity: 0.4; transform: scale(1); }
        100% { opacity: 0.6; transform: scale(1.1); }
    }
`;

injectCSS(rawCSS);

style('.blob', {
    position: 'absolute',
    borderRadius: '50%',
    filter: 'blur(100px)',
    zIndex: '1',
    animation: 'blob-float 20s infinite alternate ease-in-out'
});

style('.blob-primary', {
    width: '500px',
    height: '500px',
    background: COLORS.primary,
    top: '-10%',
    left: '-10%',
    opacity: '0.4'
});

style('.blob-accent', {
    width: '400px',
    height: '400px',
    background: COLORS.accent,
    bottom: '10%',
    right: '5%',
    opacity: '0.3',
    animationDelay: '-5s'
});

style('.hero-card', {
    zIndex: '10',
    textAlign: 'center',
    padding: '64px',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(20px)',
    borderRadius: '32px',
    border: `1px solid ${COLORS.border}`,
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
    maxWidth: '800px',
    width: '90%',
    transition: 'all 0.5s ease'
});

// Mobile optimization: Glass fills screen
injectCSS(`
    @media (max-width: 768px) {
        .hero-card {
            width: 100% !important;
            height: 100% !important;
            border-radius: 0 !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: center !important;
            padding: 24px !important;
            border: none !important;
        }
        .hero-title {
            font-size: 3rem !important;
        }
    }
`);

style('.hero-badge', {
    display: 'inline-block',
    padding: '6px 16px',
    borderRadius: RADIUS.full,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    color: '#818CF8',
    fontSize: '0.8rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    marginBottom: '24px',
    border: '1px solid rgba(99, 102, 241, 0.2)'
});

style('.hero-title', {
    fontSize: '4.5rem',
    fontWeight: '900',
    color: COLORS.text,
    lineHeight: '1.1',
    marginBottom: '24px',
    letterSpacing: '-0.04em'
});

style('.hero-title span', {
    background: COLORS.gradient,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
});

style('.hero-subtitle', {
    fontSize: '1.25rem',
    color: COLORS.gray[400],
    maxWidth: '600px',
    margin: '0 auto 40px auto',
    lineHeight: '1.6'
});

export const homePage = () => {
    const startBtn = Button({
        id: 'start-btn',
        label: 'Get Started',
        variant: 'primary',
        icon: '🚀'
    });

    const docsBtn = Button({
        id: 'docs-btn',
        label: 'Read Documentation',
        variant: 'ghost'
    });

    return {
        canvas: () => `
            <div class="home-wrapper">
                <div class="blob blob-primary"></div>
                <div class="blob blob-accent"></div>
                
                <div class="hero-card">
                    <div class="hero-badge">v2.0 — Lightspeed Beta</div>
                    <h1 class="hero-title">Build <span>Faster</span> with Studio</h1>
                    <p class="hero-subtitle">
                        The minimal reactive framework designed for modern web engineers who value 
                        performance, purity, and pixel-perfection.
                    </p>
                    
                    <div class="flex gap-4 justify-center">
                        ${startBtn.canvas()}
                        ${docsBtn.canvas()}
                    </div>
                </div>
            </div>
        `,
        action: [
            {
                id: 'start-btn',
                type: 'click',
                func: () => navigate('/docs')
            },
            {
                id: 'docs-btn',
                type: 'click',
                func: () => navigate('/docs')
            }
        ]
    };
};

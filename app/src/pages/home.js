import { usePixel, useStore, navigate } from "../../../appNstudio/frame.js"
import { style } from "../../../appNstudio/css.js"

// DESIGN SYSTEM
const COLORS = {
    background: '#000000',
    foreground: '#ffffff',
    gray: '#888888',
    border: '#333333',
    primary: '#0070f3',
    gradient: 'linear-gradient(180deg, #fff 0%, #888 100%)',
    hover: '#111111'
};

style('body', { backgroundColor: COLORS.background, color: COLORS.foreground });

style('.container', {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '80px 24px',
    textAlign: 'center'
});

style('.hero-title', {
    fontSize: 'clamp(2.5rem, 8vw, 5rem)',
    fontWeight: '800',
    letterSpacing: '-0.05em',
    lineHeight: '1.1',
    background: COLORS.gradient,
    webkitBackgroundClip: 'text',
    webkitTextFillColor: 'transparent',
    marginBottom: '24px'
});

style('.hero-subtitle', {
    fontSize: 'clamp(1.1rem, 3vw, 1.5rem)',
    color: COLORS.gray,
    maxWidth: '600px',
    margin: '0 auto 48px auto',
    lineHeight: '1.6'
});

style('.btn-group', {
    display: 'flex',
    gap: '16px',
    justifyContent: 'center',
    marginBottom: '80px'
});

style('.btn', {
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    border: '1px solid transparent'
});

style('.btn-primary', {
    backgroundColor: COLORS.foreground,
    color: COLORS.background,
});

style('.btn-primary:hover', {
    backgroundColor: '#eaeaea'
});

style('.btn-secondary', {
    backgroundColor: 'transparent',
    color: COLORS.foreground,
    borderColor: COLORS.border
});

style('.btn-secondary:hover', {
    backgroundColor: COLORS.hover,
    borderColor: COLORS.gray
});

style('.grid', {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px',
    marginTop: '80px',
    textAlign: 'left'
});

style('.card', {
    padding: '24px',
    borderRadius: '12px',
    border: `1px solid ${COLORS.border}`,
    backgroundColor: 'transparent',
    transition: 'border-color 0.2s ease'
});

style('.card:hover', {
    borderColor: COLORS.foreground
});

style('.card h3', {
    fontSize: '1.25rem',
    fontWeight: '600',
    marginBottom: '12px'
});

style('.card p', {
    color: COLORS.gray,
    fontSize: '0.95rem',
    lineHeight: '1.5'
});

export const homePage = () => {
    const [count, useCount] = usePixel('count', 0);
    const [show, setShow] = usePixel('show', false);
    const app = App();

    return {
        canvas: () => `
        <div class="container">
            <header>
                <h1 class="hero-title">Studio Framer</h1>
                <p class="hero-subtitle text-slate-400 font-medium tracking-tight">The lightspeed framework for building high-performance web applications with a modern VDOM.</p>
                <div class="btn-group">
                    <button id="index-page" class="btn btn-primary">Start Building</button>
                    <button id="docs-link" class="btn btn-secondary">Documentation</button>
                </div>
            </header>

            <section class="grid">
                <div class="card">
                    <h3 class="text-blue-500">VDOM Engine →</h3>
                    <p>Optimized diffing and patching for smooth state transitions and reliable updates.</p>
                </div>
                <div class="card">
                    <h3 class="text-purple-500">Declarative APIs →</h3>
                    <p>Build components with intuitive patterns inspired by industry leaders.</p>
                </div>
                <div class="card">
                    <h3 class="text-emerald-500">Tailwind Support →</h3>
                    <p>Native Tailwind CSS integration via the Play CDN, togglable in studio.config.js.</p>
                </div>
            </section>

            <div class="mt-20 p-8 border border-dashed border-slate-700 rounded-2xl bg-slate-900/50">
                <h2 class="text-2xl font-bold mb-4">Tailwind Playground</h2>
                <div class="flex flex-wrap gap-4 justify-center">
                    <div class="bg-blue-600 px-4 py-2 rounded shadow-lg">Blue</div>
                    <div class="bg-purple-600 px-4 py-2 rounded shadow-lg">Purple</div>
                    <div class="bg-emerald-600 px-4 py-2 rounded shadow-lg">Emerald</div>
                </div>
                <p class="mt-4 text-sm text-slate-500">These elements use pure Tailwind utility classes.</p>
            </div>

            <div style="margin-top: 100px;">
                ${app.canvas()}
            </div>
        </div>
        `,
        action: [{
            id: "index-page",
            type: "click",
            func: () => {
                useCount(c => c + 1);
                console.log("Exploring Studio Framer!");
            }
        }, {
            id: "docs-link",
            type: "click",
            func: (e) => {
                e.preventDefault();
                navigate('/docs');
            }
        }, ...app.action],
        state: {
            name: "Daniel Joshua"
        }
    }
}

const App = () => {
    const [count1, setCount1] = usePixel('count1', 0);
    
    style('.counter-box', {
        marginTop: '40px',
        padding: '32px',
        borderRadius: '16px',
        background: 'rgba(255, 255, 255, 0.03)',
        border: `1px solid ${COLORS.border}`,
        display: 'inline-block'
    });

    style('.counter-value', {
        fontSize: '3rem',
        fontWeight: '700',
        marginBottom: '16px',
        fontVariantNumeric: 'tabular-nums'
    });

    return {
        canvas: () => `
        <div class="counter-box">
            <div class="counter-value">{{count1}}</div>
            <button id="btn-increment" class="btn btn-secondary">Increment State</button>
        </div>
        `,
        action: [{
            id: "btn-increment",
            type: "click",
            func: () => setCount1(c => c + 1)
        }]
    }
}

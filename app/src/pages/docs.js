import { navigate, usePixel, useStore } from "../../../appNstudio/frame.js"
import { style, rstyle } from "../../../appNstudio/css.js"

// Reuse colors for consistency
const COLORS = {
    background: '#000000',
    foreground: '#ffffff',
    gray: '#888888',
    border: '#333333',
    primary: '#0070f3',
    code: '#111111'
};

style('.docs-container', {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '80px 24px',
    textAlign: 'left',
    lineHeight: '1.6'
});

style('.docs-section', {
    marginBottom: '64px'
});

style('.docs-title', {
    fontSize: '3rem',
    fontWeight: '800',
    letterSpacing: '-0.04em',
    marginBottom: '16px'
});

style('.api-card', {
    border: `1px solid ${COLORS.border}`,
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '24px',
    backgroundColor: 'rgba(255, 255, 255, 0.02)'
});

style('code', {
    backgroundColor: COLORS.code,
    padding: '2px 6px',
    borderRadius: '4px',
    fontFamily: 'monospace',
    color: '#38bdf8'
});

style('pre', {
    backgroundColor: COLORS.code,
    padding: '20px',
    borderRadius: '8px',
    overflowX: 'auto',
    border: `1px solid ${COLORS.border}`,
    margin: '16px 0'
});

export default function Homepage() {
    return ({
        canvas: () => `
            <div class="docs-container">
                <header class="docs-section">
                    <button id="back-home" class="text-blue-500 mb-8 hover:underline flex items-center gap-2">
                        ← Back to Project
                    </button>
                    <h1 class="docs-title">Documentation</h1>
                    <p class="text-xl text-slate-400">Everything you need to build with Studio Framer.</p>
                </header>

                <section class="docs-section">
                    <h2 class="text-3xl font-bold mb-8 pb-4 border-b border-slate-800">Core APIs</h2>
                    
                    <div class="api-card">
                        <h3 class="text-2xl font-semibold mb-4"><code>usePixel(name, initialValue)</code></h3>
                        <p class="mb-4">Creates a reactive state variable. Returns a getter and a setter.</p>
                        <pre><code>const [count, setCount] = usePixel('count', 0);

// Usage in template
canvas: () => \`&lt;button id="inc"&gt;Count is {{count}}&lt;/button&gt;\`

// Update state
setCount(c => c + 1);</code></pre>
                    </div>

                    <div class="api-card">
                        <h3 class="text-2xl font-semibold mb-4"><code>navigate(path | component, props)</code></h3>
                        <p class="mb-4">Handles routing and state changes. Can take a registered path string (e.g. <code>'/docs'</code>) or a direct component function.</p>
                        <pre><code>// Path-based (updates URL)
navigate('/docs');

// Component-based
import NextPage from './pages/next.js';
navigate(NextPage, { userId: 123 });</code></pre>
                    </div>
                </section>

                <section class="docs-section">
                    <h2 class="text-3xl font-bold mb-8 pb-4 border-b border-slate-800">Advanced</h2>
                    
                    <div class="api-card">
                        <h3 class="text-2xl font-semibold mb-4"><code>studio.setConfig(config)</code></h3>
                        <p class="mb-4">Initializes the framework with your <code>studio.config.js</code>. This links the routing table and enables features like Tailwind.</p>
                        <pre><code>import { studio } from '../appNstudio/frame.js';
import config from '../studio.config.js';

studio.setConfig(config);</code></pre>
                    </div>
                </section>

                <section class="docs-section">
                    <h2 class="text-3xl font-bold mb-8 pb-4 border-b border-slate-800">Styling APIs</h2>
                    
                    <div class="api-card">
                        <h3 class="text-2xl font-semibold mb-4"><code>style(selector, rules)</code></h3>
                        <p class="mb-4">Injects a CSS rule globally. Supports nested objects or string values.</p>
                        <pre><code>style('.my-class', {
    color: 'red',
    fontSize: '20px'
});</code></pre>
                    </div>

                    <div class="api-card">
                        <h3 class="text-2xl font-semibold mb-4"><code>injectCSS(cssText)</code></h3>
                        <p class="mb-4">Injects raw CSS strings directly into the style registry.</p>
                        <pre><code>injectCSS('.btn { padding: 10px; }');</code></pre>
                    </div>
                </section>

                <section class="docs-section">
                    <h2 class="text-3xl font-bold mb-8 pb-4 border-b border-slate-800">Configuration</h2>
                    <p class="mb-4">Configure framework features in <code>studio.config.js</code> at the root of your project.</p>
                    <pre><code>export default {
    tailwind: true, // Enable Tailwind Play CDN
    theme: {
        darkMode: true
    }
};</code></pre>
                </section>

                <footer class="mt-20 pt-8 border-t border-slate-800 text-slate-500 text-sm">
                    Studio Framer Framework &copy; 2026
                </footer>
            </div>
        `,
        action: [{
            id: "back-home",
            type: "click",
            func: (e) => {
                e.preventDefault();
                navigate('/');
            }
        }]
    })
}

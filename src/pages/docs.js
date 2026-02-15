import { DocLayout } from "../components/layout/DocLayout.js";
import { ApiItem } from "../components/atoms/ApiItem.js";
import { CodeBlock } from "../components/atoms/CodeBlock.js";

export default function docsPage() {
    const categories = [
        {
            title: 'Getting Started',
            links: [
                { label: 'Introduction', href: '#intro', active: true },
                { label: 'Installation', href: '#install' },
                { label: 'Folder Structure', href: '#structure' }
            ]
        },
        {
            title: 'State Hooks',
            links: [
                { label: 'usePixel', href: '#usepixel' },
                { label: 'useStore', href: '#usestore' }
            ]
        },
        {
            title: 'Styling',
            links: [
                { label: 'style', href: '#style' },
                { label: 'rstyle', href: '#rstyle' },
                { label: 'injectCSS', href: '#injectcss' }
            ]
        },
        {
            title: 'Navigation',
            links: [
                { label: 'navigate', href: '#navigate' }
            ]
        }
    ];

    const npmInitCode = CodeBlock({
        language: 'bash',
        code: `mkdir my-app\ncd my-app\nnpx studio-framer init\nnpm install\nnpx studio-framer serve`
    });

    const npmInstallCode = CodeBlock({
        language: 'bash',
        code: `npm install studio-framer`
    });

    const usePixelCode = CodeBlock({
        language: 'javascript',
        code: `const [getCount, setCount] = usePixel('count', 0);\n\n// Update state\nsetCount(prev => prev + 1);\n\n// UI\ncanvas: () => \`<button>Count: {{count}}</button>\``
    });

    const useStoreCode = CodeBlock({
        language: 'javascript',
        code: `const userEmail = useStore('email');`
    });

    const styleCode = CodeBlock({
        language: 'javascript',
        code: `style('.card', {\n  padding: '20px',\n  backgroundColor: '#fff'\n});`
    });

    const rstyleCode = CodeBlock({
        language: 'javascript',
        code: `const cssString = rstyle('.dynamic', {\n  color: active ? 'red' : 'blue'\n});`
    });

    const injectCssCode = CodeBlock({
        language: 'javascript',
        code: `injectCSS(\`@keyframes spin { ... }\`);`
    });

    const navigateCode = CodeBlock({
        language: 'javascript',
        code: `// To a route\nnavigate('/docs');\n\n// To a component\nnavigate(homePage);`
    });

    const structureCode = CodeBlock({
        language: 'text',
        code: `/\n├── _studio-frame/       # Core Framework Engine\n│   ├── css.js           # Atomic CSS System\n│   ├── frame.js         # Studio Class & Router\n│   ├── server.js        # SPA Dev Server\n│   └── vdom.js          # Virtual DOM Engine\n├── src/                 # Application Source\n│   ├── components/      # UI Components\n│   │   ├── atoms/       # High-fidelity Atoms\n│   │   └── layout/      # Layout Containers\n│   ├── pages/           # Application Pages\n│   └── styles/          # Design System\n├── index.html           # HTML Entry Point\n├── index.js             # App Initialization\n└── studio.config.js     # Framework Configuration`
    });

    const content = `
        <section id="intro" class="mb-20">
            <h2 class="text-3xl font-bold text-white mb-6">Introduction</h2>
            <p class="text-slate-400 mb-4">
                Studio Framer is a next-generation JavaScript framework built for designers and engineers. 
                It combines the power of a reactive Virtual DOM with the simplicity of atomic styling.
            </p>
        </section>

        <section id="install" class="mb-20">
            <h2 class="text-3xl font-bold text-white mb-6">Installation</h2>
            <p class="text-slate-400 mb-6">
                You can start a new project instantly using our scaffolding tool, or install it manually as a library.
            </p>
            
            <div class="mb-10">
                <h3 class="text-xl font-semibold text-slate-200 mb-4">1. Quick Start (Scaffold)</h3>
                ${npmInitCode.canvas()}
            </div>

            <div>
                <h3 class="text-xl font-semibold text-slate-200 mb-4">2. Manual Installation</h3>
                ${npmInstallCode.canvas()}
            </div>
        </section>

        <section id="structure" class="mb-20">
            <h2 class="text-3xl font-bold text-white mb-6">Folder Structure</h2>
            <p class="text-slate-400 mb-6">
                Studio projects are organized into a clear, modular structure that separates the core engine 
                from your application source.
            </p>
            ${structureCode.canvas()}
        </section>

        <section id="usepixel" class="mb-20">
            ${ApiItem({
                name: 'usePixel',
                type: 'Hook',
                signature: 'usePixel(name, initialValue)',
                description: 'Atomic state management that triggers granular re-renders. Returns a getter and a setter.',
                exampleCode: usePixelCode.canvas()
            })}
        </section>

        <section id="usestore" class="mb-20">
            ${ApiItem({
                name: 'useStore',
                type: 'Utility',
                signature: 'useStore(key)',
                description: 'Directly access a value from the global framework state.',
                exampleCode: useStoreCode.canvas()
            })}
        </section>

        <section id="style" class="mb-20">
            ${ApiItem({
                name: 'style',
                type: 'CSS',
                signature: 'style(selector, styleObject)',
                description: 'Automatically converts a JS object to CSS and injects it into the DOM.',
                exampleCode: styleCode.canvas()
            })}
        </section>

        <section id="rstyle" class="mb-20">
            ${ApiItem({
                name: 'rstyle',
                type: 'CSS',
                signature: 'rstyle(selector, styleObject)',
                description: 'Converts a JS object to a CSS string but does NOT inject it. Useful for dynamic inline styles or SSR.',
                exampleCode: rstyleCode.canvas()
            })}
        </section>

        <section id="injectcss" class="mb-20">
            ${ApiItem({
                name: 'injectCSS',
                type: 'CSS',
                signature: 'injectCSS(cssText)',
                description: 'Injects raw CSS text directly into the document head.',
                exampleCode: injectCssCode.canvas()
            })}
        </section>

        <section id="navigate" class="mb-20">
            ${ApiItem({
                name: 'navigate',
                type: 'Router',
                signature: 'navigate(path | component, props = null)',
                description: 'Programmable navigation supporting both route strings and framework components.',
                exampleCode: navigateCode.canvas()
            })}
        </section>
    `;

    return DocLayout({
        title: 'Documentation',
        description: 'Learn how to build lighting-fast interfaces with Studio.',
        categories,
        children: content
    });
}

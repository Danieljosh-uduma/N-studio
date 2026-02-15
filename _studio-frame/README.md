# Studio Framer 🚀

The lightspeed JavaScript framework for building high-performance web applications with a modern Virtual DOM and built-in client-side routing.

## ✨ Features

- **🚀 High-Performance VDOM:** Efficient diffing and patching engine.
- **🛣️ Client-Side Routing:** History API support for clean URLs.
- **🏗️ Declarative APIs:** Intuitive `usePixel` and `useStore` hooks.
- **✨ Style API:** Programmatic CSS management with `style()` and `injectCSS()`.
- **⌨️ TypeScript Ready:** Full type definitions included.

## 📦 Installation

```bash
npm install studio-framer
```

## 🏗️ Quick Start (Scaffold)

The easiest way to start a new project is using the built-in scaffolding tool:

```bash
mkdir my-app
cd my-app
npx studio init
npm install
npx studio serve
```

## 🚀 Manual Usage

If you prefer building from scratch:

// Define a reactive component
const Counter = () => {
    const [count, setCount] = studio.usePixel('count', 0);
    
    return {
        canvas: () => `
            <div>
                <h1>Count: {{count}}</h1>
                <button id="inc">Increment</button>
            </div>
        `,
        action: [{
            id: 'inc',
            type: 'click',
            func: () => setCount(c => c + 1)
        }]
    };
};

// Initialize
studio.setConfig({
    routes: { '/': Counter }
});
```

## 📄 License
MIT

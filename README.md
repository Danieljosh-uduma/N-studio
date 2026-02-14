# Studio Framer 🚀

The lightspeed JavaScript framework for building high-performance web applications with a modern Virtual DOM, built-in client-side routing, and seamless Tailwind CSS integration.

## ✨ Features

- **🚀 High-Performance VDOM:** Efficient diffing and patching engine for smooth UI updates.
- **🛣️ Client-Side Routing:** Built-in History API support for clean URLs and browser navigation.
- **🎨 Tailwind Integrated:** Native Play CDN support via `studio.config.js`.
- **🏗️ Declarative APIs:** Intuitive `usePixel` and `useStore` hooks for state management.
- **✨ Style API:** Programmatic CSS management with the `style()` and `injectCSS()` functions.
- **🌑 Modern Aesthetic:** Out-of-the-box support for premium dark-themed designs.

## 📦 Project Structure

```text
framework/
├── app/
│   ├── index.js           # Entry point
│   └── src/
│       └── pages/         # Page components (home.js, docs.js)
├── appNstudio/
│   ├── frame.js           # Core Studio class & hooks
│   ├── vdom.js            # VDOM engine
│   └── css.js             # Styling utilities
├── index.html             # HTML Shell
└── studio.config.js       # Framework configuration
```

## 🚀 Getting Started

### 1. Configure the Framework

Edit `studio.config.js` to define your routes and enable features like Tailwind:

```javascript
import { homePage } from "./app/src/pages/home.js";
import docsPage from "./app/src/pages/docs.js";

export default {
    tailwind: true,
    routes: {
        '/': homePage,
        '/docs': docsPage
    }
};
```

### 2. Initialize the App

The entry point (`app/index.js`) links the core to your config:

```javascript
import { studio } from "../appNstudio/frame.js";
import config from "../studio.config.js";

studio.setConfig(config);
```

### 3. Create Reactive Components

```javascript
import { usePixel } from "../appNstudio/frame.js";

export const Counter = () => {
    const [count, setCount] = usePixel('count', 0);
    
    return {
        canvas: () => `
            <div class="p-8 bg-slate-900 rounded-xl">
                <h1 class="text-3xl">Count: {{count}}</h1>
                <button id="inc" class="bg-blue-500 px-4 py-2 mt-4">Increment</button>
            </div>
        `,
        action: [{
            id: 'inc',
            type: 'click',
            func: () => setCount(c => c + 1)
        }]
    };
};
```

## 📖 API Reference

Detailed API documentation is available in-app at the `/docs` route.

- `usePixel(name, initialValue)` - Reactive state hook.
- `useStore(name)` - Direct global state access.
- `navigate(path | component)` - Client-side navigation.
- `style(selector, rules)` - Global CSS injection.

## 📝 License

MIT License
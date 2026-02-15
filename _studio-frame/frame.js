import { h, mount, patch, htmlToVNode } from "./vdom.js";
import { style } from "./css.js";    

class Studio {
    constructor(base = document) {
        this.base = base ? base.getElementById('base') : null;
        this.oldVDom = null;
        this.state = {};
        this.style = {}
        this.actions = {};
        this.config = {}; // Initialize empty, set later

        this.initRouter();
    }

    setConfig(config) {
        this.config = config;
        if (this.config.tailwind) {
            this.injectTailwind();
        }
        // Handle initial route after config is set
        this.handleRoute(window.location.pathname);
    }

    initRouter() {
        window.addEventListener('popstate', () => {
            this.handleRoute(window.location.pathname);
        });
    }

    handleRoute(path) {
        if (!this.config.routes) return;
        
        // Normalize path for local filesystem or nested paths
        // Try exact match first
        let component = this.config.routes[path];
        
        // If no match, try finding a route that ends with this path
        if (!component) {
            const keys = Object.keys(this.config.routes);
            const matchingKey = keys.find(k => path.endsWith(k) && k !== '/');
            component = matchingKey ? this.config.routes[matchingKey] : this.config.routes['/'];
        }
        
        this.navigate(component, null, false);
    }

    injectTailwind() {
        if (document.head.querySelector('script[src*="tailwindcss"]')) return;
        const script = document.createElement('script');
        script.src = "https://cdn.tailwindcss.com";
        document.head.appendChild(script);
    }
    
    setState(newState) {
        Object.assign(this.state, newState);
        this.render();
    } 
    async render() {
        if (!this.base && !this.currentFrame) {
            console.error("Rendering Error: 1101");
            return;
        }

        const canvasHTML = await this.getCanvas();
        if (canvasHTML === null) return;

        let newVDom = htmlToVNode(canvasHTML);
        this.injectActions(newVDom);

        if (!this.oldVDom) {
            if (this.base) {
                this.base.innerHTML = "";
                mount(newVDom, this.base);
            }
        } else {
            patch(this.base, this.oldVDom, newVDom);
        }

        this.oldVDom = newVDom;

        if (this.style["style"]) {
            this.updateStyles();
        }
    }

    async getCanvas() {
        if (!this.currentFrame) return null;
        let canvas = await this.currentFrame();
        
        // Better interpolation
        for (const key in this.state) {
            const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
            canvas = canvas.replace(regex, this.state[key]);
        }
        
        return canvas;
    }

    injectActions(vnode) {
        if (!vnode) return;
        
        const id = vnode.props.id;
        if (id && this.actions[id]) {
            const action = this.actions[id];
            vnode.props[`on${action.type}`] = action.func;
        }

        if (vnode.props.children) {
            vnode.props.children.forEach(child => this.injectActions(child));
        }
    }

    navigate(template, props = null, pushState = true) {
        // Handle path strings
        if (typeof template === 'string') {
            const component = this.config.routes[template];
            if (component) {
                if (pushState) history.pushState({}, '', template);
                return this.navigate(component, props, false);
            }
            console.error(`Route ${template} not found`);
            return;
        }

        const frame = (typeof template === 'function') ? template(props) : template;
        this.currentFrame = frame.canvas;
        
        this.actions = {};
        if (frame.action) {
            const actions = Array.isArray(frame.action) ? frame.action : [frame.action];
            actions.forEach(act => {
                this.addEvent(act.id, { func: act.func, type: act.type });
            });
        }

        if (frame.style) {
            const styleText = typeof frame.style === 'string' ? frame.style : JSON.stringify(frame.style);
            this.addStyle(styleText);
        }

        if (frame.state) {
            this.setState(frame.state);
        } else {
            this.render(); // Ensure render if no state provided
        }

        // Auto-update URL if pushState is true and we can find a matching path
        if (pushState && typeof template === 'function') {
            const path = Object.keys(this.config.routes).find(key => this.config.routes[key] === template);
            if (path) history.pushState({}, '', path);
        }
    }

    addEvent(id, { func, type }) {
        this.actions[id] = { func, type };
    }

    addStyle(style) {
        this.style["style"] = style;
        this.updateStyles();
    }

    updateStyles() {
        let styleTag = document.head.querySelector('style#studio-style');
        if (!styleTag) {
            styleTag = document.createElement('style');
            styleTag.id = 'studio-style';
            document.head.appendChild(styleTag);
        }
        styleTag.textContent = this.style["style"] || "";
    }

    addDOMStyle(cssText) {
        let styleTag = document.head.querySelector('style#studio-injected-style');
        if (!styleTag) {
            styleTag = document.createElement('style');
            styleTag.id = 'studio-injected-style';
            document.head.appendChild(styleTag);
        }
        styleTag.textContent += cssText;
    }
}
const studio = new Studio()
const navigate = (template, props) => studio.navigate(template, props)
const useStore = (value) => studio.state[value]
const injectCSS = (cssText) => studio.addDOMStyle(cssText)
const usePixel = (state, initialValue) => {
    const dict = {}
    dict[state] = initialValue
    if (studio.state[state] === undefined) {
        Object.assign(studio.state, dict);
    }
    
    // Return a getter function to ensure we always have the latest value
    const getPixel = () => studio.state[state];
    
    const setPixel = (valueOrUpdater) => {
        if (typeof valueOrUpdater === 'function') {
            const prev = studio.state[state];
            const next = valueOrUpdater(prev);
            dict[state] = next
            studio.setState(dict);
        } else {
            dict[state] = valueOrUpdater
            studio.setState(dict);
        }
    };
    return [getPixel, setPixel];
};

export { studio, navigate, usePixel, useStore, injectCSS, style }
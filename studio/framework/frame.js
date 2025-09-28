"use strict";
/**
 * Studio class to manage state, rendering, actions, and styles for a web application.
 * @class Studio
 * @param {HTMLElement} [base=document] - The base HTML element where the application will be rendered.
 * @property {Object} state - The state object to hold application state variables.
 * @property {Object} style - The style object to hold CSS styles.
 * @property {Object} actions - The actions object to hold event listeners.
 */
class Studio {
    constructor(base = document) {
        this.base = base ? base.getElementById('base') : null;
        this.state = {};
        this.style = {}
        this.actions = {};
    }
    /**
     * Merges the provided new state with the existing state and triggers a re-render of the application.
     * @param {Object} newState - An object containing the new state properties to be merged with the existing state.
     * @returns {void}
    */
    setState(newState) {
        Object.assign(this.state, newState);
        this.render();
    } 
    /**
     * Renders the current frame into the base element, applying state variables and attaching event listeners and styles.
     * @throws {Error} If 'base' or 'currentFrame' is not found.
     * @throws {Error} if 'canvas' is not found.
     * @returns {void}
    */
    async render() {
        if (!this.base || !this.currentFrame) {
            console.error("Rendering error: 'base' or 'currentFrame' not found");
        }
        const canvas = await this.getCanvas();
        if (!canvas) {
            console.error("Canvas error: 'currentFrame' not found");
            return;
        }
        if (this.base) {
            this.base.innerHTML = canvas
        }
        if (this.actions) {
            this.addDOMAction();
        }
        if (this.style) {
            this.addDOMStyle();
        }
    }
    /**
     * Generates the HTML canvas by invoking the current frame function and replacing state variable placeholders with their actual values.
     * @throws {Error} if 'currentFrame' is not found.
     * @returns {Promise<string|null>} The generated HTML canvas as a string, or null if an error occurs.
    */
    async getCanvas() {
        if (!this.currentFrame) {
            console.error("Canvas error: 'currentFrame' not found");
            return null;
        }
        let canvas = await this.currentFrame();
        for (const key in this.state) {
            const regex = RegExp(`{{${key}}}`, 'g');
            canvas = canvas.replace(regex, this.state[key]);
        }
        
        return canvas;
    }
    /**
     * Processes and replaces custom component tags in the canvas with their corresponding HTML.
     * @throws {Error} if 'canvas' is not defined.
     * @returns {void}
    */
    AddComponent() {
        const component = RegExp(`<[A-Z][a-zA-Z0-9]*\ */>`, 'g')
        const matches = canvas.match(component)

        const regex = /<([A-Z][a-zA-Z0-9]*)/g
        const componentMatch = matches.map(item => item.match(regex)[0])
        const componentNames = componentMatch.map(item => item.slice(1))

        for (let i = 0; i < componentNames.length; i++) {
            canvas = canvas.replace(regex, componentNames[i])
        }
    }
    /**
     * Attaches event listeners to DOM elements based on the defined actions.
     * @throws {Error} If an element for a given action ID is not found.
     * @returns {void}
     */
    addDOMAction() {
        for (const key in this.actions) {
            const element = document.getElementById(key);
            if (!element) {
                console.error("Event error: 'event canvas' not found");
                continue;
            }
            const action = this.actions[key];
            element.addEventListener(action.type, action.func);
        }
    }
    /**
     * Navigates to a new frame based on the provided template and props.
     * @param {Object} template 
     * @param {Any} props - Optional properties to be passed to the template function.
     * @returns {void} 
     */
    navigate(template, props=null) {
        const frame = props == 0 && props != undefined ? template(props): template();
        this.currentFrame = frame.canvas;
        if (frame.action) {
            if (typeof frame.action === "object" && frame.action.length > 0) {
                for (let i = 0; i < frame.action.length; i++) {
                    this.addEvent(
                        frame.action[i].id,
                        {
                            func: frame.action[i].func,
                            type: frame.action[i].type
                        }
                    )
                }
            } else {
                this.addEvent(frame.action.id, { func: frame.action.func, type: frame.action.type });
            }
        }
        if (frame.style) {
            this.addStyle(frame.style)
        }
        this.setState(frame.state);
    }
    /**
     * Adds an event listener to event list.
     * @param {string} id - The ID of the DOM element.
     * @param {Object} param1 - The event listener details.
     */
    addEvent(id, { func, type }) {
        this.actions[id] = { func, type };
    }
    /**
     * Adds a style to the style list.
     * @param {Object} style - The style object to be added.
     */
    addStyle(style) {
        let id = Math.floor(Math.random * 999999) + 100000
        if (this.style[id]) {
            this.addStyle()
        }
        this.style[id] = style
    }
    /**
     * Adds a style to the DOM.
     * @param {string} cssText - The CSS styles to be added.
     * @returns {void}
     */
    addDOMStyle(cssText=null) {
        let style = document.head.querySelector('style');
        if (!document.head.contains(style)) {
            style = document.createElement('style')
        }
        const head = document.head;
        head.appendChild(style)
        if (cssText) {
            style.textContent += cssText
            return
        }
        if (this.style) {
            for (const key in this.style) {
            style.appendChild(document.createTextNode(this.style[key]))
            }
            head.appendChild(style)
        }
        
    }
}
/**
 * Singleton instance of the Studio class to manage the application state and rendering.
 * @type {Studio}
 */
const studio = new Studio()

/**
 * Navigates to a new frame based on the provided template and props.
 * @type {Studio.navigate}
 * @param {Object} template 
 * @param {*} props 
 * @returns 
 */
const navigate = (template, props) => studio.navigate(template, props)

/**
 * Retrieves the current value from the application state.
 * @param {string} value - The key of the state variable to retrieve.
 * @returns {*} - The current value of the state variable.
 */
const useStore = (value) => studio.state[value]

/**
 * Injects CSS styles into the DOM.
 * @type {Studio.addDOMStyle}
 * @param {string} cssText - The CSS styles to be injected.
 * @returns {void}
 */
const injectCSS = (cssText) => studio.addDOMStyle(cssText)


/**
 * Creates a pixel state.
 * @param {string} state 
 * @param {*} initialValue 
 * @returns {Array} pixelState
 */
const usePixel = (state, initialValue) => {
    const dict = {}
    dict[state] = initialValue
    if (studio.state[state] === undefined) {
        studio.setState(dict);
    }
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
    return [studio.state[state], setPixel];
};


export { studio, navigate, usePixel, useStore, injectCSS }
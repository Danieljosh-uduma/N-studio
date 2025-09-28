"use strict";

class Studio {
    constructor(base = document) {
        this.base = base ? base.getElementById('base') : null;
        this.state = {};
        this.style = {}
        this.actions = {};
    }
    setState(newState) {
        Object.assign(this.state, newState);
        this.render();
    } 
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
    AddComponent() {
        const component = RegExp(`<[A-Z][a-zA-Z0-9]*\ */>`, 'g')
        const matches = canvas.match(component)

        const regex = /<([A-Z][a-zA-Z0-9]*)/g
        const componentMatch = matches.map(item => item.match(regex)[0])
        const componentNames = componentMatch.map(item => item.slice(1))
        // console.log(1, componentMatch, componentNames)

        for (let i = 0; i < componentNames.length; i++) {
            canvas = canvas.replace(regex, componentNames[i])
            // console.log(componentNames[i])
        }
    }
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
    addEvent(id, { func, type }) {
        this.actions[id] = { func, type };
    }
    addStyle(style) {
        let id = Math.floor(Math.random * 999999) + 100000
        if (this.style[id]) {
            this.addStyle()
        }
        this.style[id] = style
    }
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

const studio = new Studio()
const navigate = (template, props) => studio.navigate(template, props)
const useStore = (value) => studio.state[value]
const injectCSS = (cssText) => studio.addDOMStyle(cssText)


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
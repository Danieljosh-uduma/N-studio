import { injectCSS } from "./frame.js";

/**
 * @type {Object} - store temporary css text
 */
const styleRegistry = {}

/**
 * transforms css object into cssText and inject it to the DOM
 * @param {String} selector 
 * @param {Object} styleObject 
 */
export function style(selector, styleObject) {
    const cssText = jsonToCssString(selector, styleObject);
    
    styleRegistry[selector] = cssText;
    injectCSS(cssText);
}

function jsonToCssString(selector, styleObject) {
    let cssRule = `${selector} {\n`;

    for (const prop in styleObject) {
        if (styleObject.hasOwnProperty(prop)) {
            const value = styleObject[prop];
            
            const cssProp = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
            cssRule += `  ${cssProp}: ${value};\n`;
        }
    }
    cssRule += '}\n';
    return cssRule;
}
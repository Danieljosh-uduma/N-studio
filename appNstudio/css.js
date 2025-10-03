import { injectCSS } from "./frame.js";

const styleRegistry = {}

export function style(selector, styleObject) {
    const cssText = jsonToCssString(selector, styleObject);
    
    styleRegistry[selector] = cssText;
    injectCSS(cssText);
}
export function rstyle(selector, styleObject) {
    const cssText = jsonToCssString(selector, styleObject)

    return cssText
}

function jsonToCssString(selector, styleObject) {
    if (typeof styleObject === "string") {
        return `${selector} { ${styleObject} }`
    }

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
/**
 * Virtual DOM Engine for Studio Framer
 */

export const h = (type, props, ...children) => {
    return {
        type,
        props: {
            ...props,
            children: children.flat().map(child =>
                typeof child === "object" ? child : createTextElement(child)
            ),
        },
    };
};

const createTextElement = (text) => {
    return {
        type: "TEXT_ELEMENT",
        props: {
            nodeValue: text,
            children: [],
        },
    };
};

const isEvent = (key) => key.startsWith("on");
const isProperty = (key) => key !== "children" && !isEvent(key);

export const mount = (vnode, container) => {
    const dom =
        vnode.type === "TEXT_ELEMENT"
            ? document.createTextNode("")
            : document.createElement(vnode.type);

    // Add event listeners
    Object.keys(vnode.props)
        .filter(isEvent)
        .forEach((name) => {
            const eventType = name.toLowerCase().substring(2);
            dom.addEventListener(eventType, vnode.props[name]);
        });

    // Set properties
    Object.keys(vnode.props)
        .filter(isProperty)
        .forEach((name) => {
            if (name === "class") {
                dom.className = vnode.props[name];
            } else {
                dom[name] = vnode.props[name];
            }
        });

    vnode.props.children.forEach((child) => mount(child, dom));

    vnode.dom = dom;
    container.appendChild(dom);
    return dom;
};

export const patch = (parent, oldVNode, newVNode) => {
    if (!oldVNode) {
        mount(newVNode, parent);
    } else if (!newVNode) {
        parent.removeChild(oldVNode.dom);
    } else if (oldVNode.type !== newVNode.type) {
        const newDom = mount(newVNode, parent);
        parent.replaceChild(newDom, oldVNode.dom);
    } else if (typeof newVNode.type === "string") {
        const dom = (newVNode.dom = oldVNode.dom);
        
        // Update props
        const oldProps = oldVNode.props || {};
        const newProps = newVNode.props || {};
        
        // Remove old props and events
        Object.keys(oldProps)
            .filter(key => key !== 'children')
            .forEach(name => {
                if (!(name in newProps)) {
                    if (isEvent(name)) {
                        const eventType = name.toLowerCase().substring(2);
                        dom.removeEventListener(eventType, oldProps[name]);
                    } else {
                        if (name === "class") {
                            dom.className = "";
                        } else {
                            dom[name] = "";
                        }
                    }
                }
            });

        // Set new/updated props and events
        Object.keys(newProps)
            .filter(key => key !== 'children')
            .forEach(name => {
                if (oldProps[name] !== newProps[name]) {
                    if (isEvent(name)) {
                        const eventType = name.toLowerCase().substring(2);
                        if (oldProps[name]) {
                            dom.removeEventListener(eventType, oldProps[name]);
                        }
                        dom.addEventListener(eventType, newProps[name]);
                    } else {
                        if (name === "class") {
                            dom.className = newProps[name];
                        } else {
                            dom[name] = newProps[name];
                        }
                    }
                }
            });

        // Patch children
        const oldChildren = oldVNode.props.children;
        const newChildren = newVNode.props.children;
        const max = Math.max(oldChildren.length, newChildren.length);
        for (let i = 0; i < max; i++) {
            patch(dom, oldChildren[i], newChildren[i]);
        }
    } else if (newVNode.type === "TEXT_ELEMENT") {
        if (oldVNode.props.nodeValue !== newVNode.props.nodeValue) {
            oldVNode.dom.nodeValue = newVNode.props.nodeValue;
        }
        newVNode.dom = oldVNode.dom;
    }
};

/**
 * Utility to convert HTML string to VNode
 * Note: Limited implementation for proof of concept
 */
export const htmlToVNode = (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString.trim(), "text/html");
    return domToVNode(doc.body.firstChild);
};

const domToVNode = (dom) => {
    if (dom.nodeType === Node.TEXT_NODE) {
        return createTextElement(dom.nodeValue);
    }
    const props = {};
    Array.from(dom.attributes).forEach(attr => {
        props[attr.name] = attr.value;
    });
    const children = Array.from(dom.childNodes).map(domToVNode);
    return h(dom.tagName.toLowerCase(), props, ...children);
};

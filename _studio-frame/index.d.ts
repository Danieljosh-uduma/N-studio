/**
 * Studio Framer Type Definitions
 */

export namespace Studio {
    /**
     * Virtual DOM Node
     */
    export interface VNode {
        type: string | Function;
        props: {
            [key: string]: any;
            children: VNode[];
        };
        dom?: Node;
    }

    /**
     * Component Function
     */
    export type Component<P = any> = (props?: P) => Frame;

    /**
     * Action definition for components
     */
    export interface Action {
        id: string;
        type: string;
        func: (event: Event) => void;
    }

    /**
     * Standard return object for Studio components
     */
    export interface Frame {
        canvas: () => string;
        action?: Action | Action[];
        style?: string | object;
        state?: object;
    }

    /**
     * Framework Configuration
     */
    export interface Config {
        routes?: {
            [path: string]: Component<any>;
        };
        tailwind?: boolean;
        darkMode?: boolean;
    }
}

/**
 * Main Studio Instance class
 */
export class StudioInstance {
    state: Record<string, any>;
    config: Studio.Config;
    
    setConfig(config: Studio.Config): void;
    navigate(template: string | Studio.Component, props?: any): void;
    setState(newState: Record<string, any>): void;
    render(): Promise<void>;
    injectCSS(cssText: string): void;
}

/**
 * Core Hooks & Utilities
 */

/**
 * Atomic state hook.
 * @returns [getter, setter]
 */
export function usePixel<T>(state: string, initialValue: T): [() => T, (val: T | ((prev: T) => T)) => void];

/**
 * Global store hook.
 * @returns The value from the global state.
 */
export function useStore<T = any>(key: string): T;

/**
 * Programmable navigation.
 */
export function navigate(template: string | Studio.Component, props?: any): void;

/**
 * Inject raw CSS.
 */
export function injectCSS(cssText: string): void;

/**
 * Style API: Inject selector styles.
 */
export function style(selector: string, styleObject: Record<string, string | number>): void;

/**
 * Raw Style API: Return CSS string.
 */
export function rstyle(selector: string, styleObject: Record<string, string | number>): string;

/**
 * Virtual DOM Creator (Hyperscript)
 */
export function h(type: string, props: any, ...children: any[]): Studio.VNode;

/**
 * Virtual DOM Mounter
 */
export function mount(vnode: Studio.VNode, container: HTMLElement): HTMLElement;

/**
 * Virtual DOM Patcher
 */
export function patch(parent: HTMLElement, oldVNode: Studio.VNode, newVNode: Studio.VNode): void;

/**
 * HTML to VNode Utility
 */
export function htmlToVNode(html: string): Studio.VNode;

/**
 * Global Studio instance
 */
export const studio: StudioInstance;

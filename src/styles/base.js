import { style } from "../../_studio-frame/css.js";
import { COLORS } from "./theme.js";

style('body', {
        backgroundColor: COLORS.background,
        color: COLORS.text,
        margin: '0',
        padding: '0',
        fontFamily: '"Inter", -apple-system, system-ui, sans-serif',
        WebkitFontSmoothing: 'antialiased',
        lineHeight: '1.5'
    });

style('*', {
        boxSizing: 'border-box'
    });

style('button', {
        fontFamily: 'inherit',
        cursor: 'pointer'
    });
    
style('.container', {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px'
    });

import { useStore } from "../../../studio/framework/frame.js"

export default function Header(setTheme) {

    return ({
        canvas: () => `
        <header>
            <h3 class="logo">NStudio</h3>
            <nav>
                <ul>
                    <li id="theme">Theme: ${useStore('theme')}</li>
                    <li>Home</li>
                    <li>Docs</li>
                    <li>Contact us</li>
                </ul>
            </nav>
        </header>
        `,
        state: {
            theme: useStore('theme')
        },
        action: {
            id: "theme",
            type: "click",
            func: () => setTheme(prevTheme => prevTheme === 'light'? 'dark': 'light')
        },
    })
}
import { useStore } from "../../../_nstudio/frame.js"

export default function Header(setTheme) {

    return ({
        canvas: () => `
        <header>
            <h3 class="logo">NStudio</h3>
            <nav>
                <ul>
                    <li id="theme">
                        <img 
                            src="${useStore('theme') === 'light' ? '/public/dark.png' : '/public/light.png'}"
                            alt="theme icon"
                            class="theme-icon"
                        />
                    </li>
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
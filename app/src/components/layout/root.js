import Header from "../header.js"
import { usePixel, useStore } from "../../../../_nstudio/frame.js"
import { rstyle } from "../../../../_nstudio/css.js"

export default function RootLayout(App) {
    const [theme, setTheme] = usePixel('theme', 'dark')
    const header = Header(setTheme)
    const app = App()
    
    return ({
        canvas: () => `
            <div class="${useStore('theme') === "light"? "light": "dark"}">
                ${header.canvas()}
                ${app.canvas()}
            </div>
        `,
        state: [app.state, header.state],
        action: [header.action],
        style: app.style
    })
}
import Header from "../header.js"
import { usePixel, useStore } from "../../../../studio/framework/frame.js"
import { rstyle } from "../../../../studio/framework/css.js"

export default function RootLayout(App) {
    const [theme, setTheme] = usePixel('theme', 'dark')
    const header = Header(setTheme)
    const app = App()
    return ({
        canvas: () => `
            ${header.canvas()}
            ${app.canvas()}
        `,
        state: [app.state, header.state],
        action: [header.action],
        style: app.style
    })
}
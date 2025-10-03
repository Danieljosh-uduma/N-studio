import { navigate, usePixel, useStore } from "../appNstudio/frame.js"
import DocsPage from "./src/pages/homepage.js"
import './src/styles/style.js'

const homePage = () => {
    const [count, useCount] = usePixel('count', 0)
    const [show, setShow] = usePixel('show', false)
    const app = App()

    return {
        canvas: () => `
        <div class="div">
            <h1> Studio Framer </h1>
            <button id="index-page">Count {{count}}</button>
            <button id="change-page" class="new"> ${useStore('show') ? "Hey Dear" : "wasted haaa!"}</button>
            ${app.canvas()}
        </div>
        `,
        action: [{
            id: "index-page",
            type: "click",
            func: () => useCount(count => count + 1)
        }, {
            id: "change-page",
            type: "click",
            func: () => setShow(prev => !prev)
        }, ...app.action],
        style: app.style
    }
}


const App = () => {
    const [count1, setCount1] = usePixel('count1', 0)
    return {
        canvas: () => `
        <div class="app-div">
            <h1>App Component</h1>
            <button id="index">Count {{count1}}</button>
        </div>

        <button type="button" id="docs">Read documentation.</button>
        `,
        action: [{
            id: "index",
            type: "click",
            func: () => setCount1(count => count + 2)
        }, {
            id: "docs",
            type: "click",
            func: (e) => {
                e.preventDefault()
                navigate(DocsPage)
            }
        }],
        style: `
            .app-div {
                display: flex;
                flex-direction: column;
                align-items: center;
                margin-top: 20px;
            }
            .anc {
                color: white;
                text-decoration: none;
                margin-top: 20px;
                font-weight: bold;

                &:hover {
                    text-decoration: underline;
                    color: #21a4e1ff;
                }
            }
        `
    }
}

window.onload = async () => navigate(homePage)
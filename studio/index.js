import { navigate, usePixel, useStore, studio } from "./framework/frame.js"
import './style.js'

const homePage = () => {
    const [count, useCount] = usePixel('count', 0)
    const [show, setShow] = usePixel('show', false)

    return {
        canvas: () => `
        <div class="div">
            <h1> {{name}} </h1>
            <button id="index-page">Count {{count}}</button>
            <button id="change-page" class="new"> ${useStore('show') ? "Hey Dear" : "wasted haaa!"}</button>
            ${App().canvas()}
        </div>
        `,
        state: {
            count: count,
            show: show,
            name: "Studio Framer",
            title: "homepage",
        },
        action: [{
            id: "index-page",
            type: "click",
            func: () => useCount(count => count + 1)
        }, {
            id: "change-page",
            type: "click",
            func: () => setShow(prev => !prev)
        }
        ],
        style: ''
    }
}


const App = () => {
    return {
        canvas: () => `
        <div>
            <h1>App Component</h1>
        </div>
        `
    }
}

window.onload = async () => navigate(homePage)
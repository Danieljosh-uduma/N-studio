import { navigate, usePixel, useStore, studio } from "./framework/frame.js"
import './style.js'

export const homePage = () => {
    const [count, useCount] = usePixel('count', 0)
    const [show, setShow] = usePixel('show', false)

    return {
        canvas: () => `
        <div class="div">
            <h1> {{name}} </h1>
            <button id="index-page">Count {{count}}</button>
            <button id="change-page" class="new"> ${useStore('show') ? "Hey Dear" : "wasted haaa!"}</button>
            <App />
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

const App = () => ({
    canvas: `
    <a href="">Checkout the documentation</a>
    `
})

const regex = RegExp(`<[A-Z][a-zA-Z0-9]*\ */>`, 'g')
const code = `
    <div>
        <h1>Hello world</h1>
        <BookReview />
        <AppMega1 />
    </div>
`
let matches = code.match(regex)
// console.log(matches)

window.onload = async () => navigate(homePage)
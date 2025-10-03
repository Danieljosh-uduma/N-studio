import type { Framer, State, Action } from './types.js'

class Studio {
    base: HTMLElement | null
    state: { [key: string]: State }
    actions: { [key: string]: { func: () => void, type: string } }
    currentFrame: (() => string) | undefined
    style: {}

    constructor (base=document) {
        this.base = base? base.getElementById('base') : null
        this.state = {}
        this.actions = {}
        this.style = {}
    }

    setState (newState: State) {
        Object.assign(this.state, newState)
        this.render()
    }

    render () {
        if (!this.base || !this.currentFrame) {
            console.error("Rendering error: 'base' or 'currentFrame' not found")
        }
        const canvas = this.getCanvas()
        if (!canvas) {
            console.error("Canvas error: 'currentFrame' not found")
            return
        }
        if (this.base) {
            this.base.innerHTML = canvas
        }
        if (this.style) {
            this.addDomStyle()
        }
        if (this.actions) {
            this.addDOMAction()
        }
    }

    getCanvas () {
        if (!this.currentFrame) {
            console.error("Canvas error: 'currentFrame' not found")
            return null
        }
        let canvas = this.currentFrame()

        for (const key in this.state) {
            const regex = RegExp(`{{\\s*${key}\\s*}}`, 'g')
            canvas = canvas.replace(regex, String(this.state[key]))
        }
        return canvas
    }

    addDOMAction () {
        for (const key in this.actions) {
            const element = document.getElementById(key)

            if (!element) {
                console.error("Event error: 'event canvas' not found")
                continue
            }
            const action = this.actions[key]
            element.addEventListener(action.type, action.func)
        }
    }
    

    navigate (template: Framer, props=null) {
        const frame = props === 0 && props != undefined? template(props): template()
        this.currentFrame = frame.canvas

        if (frame.action) {
            if (typeof frame.action === "object" && frame.action.length > 0) {
                for (let i = 0; i < frame.action.length; i++) {
                    this.addEvent(
                        frame.action[i].id,
                        {
                            func: frame.action[i].func,
                            type: frame.action[i].type
                        }
                    )
                }
            } else {
                this.addEvent(frame.action.id, {func: frame.action.func, type: frame.action.type})
            }
        }
        if (frame.style) {
            this.addStyle(frame.style)
        }
        this.setState(frame.state)
    }

    addEvent (id: string, {func, type}: {func: () => void, type: string}) {
        this.actions[id] = {func, type}
    }
}
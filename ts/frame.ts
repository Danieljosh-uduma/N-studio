import type { Framer, State, Action } from './types.js'

class Studio {
    base: HTMLElement | null
    state: { [key: string]: State }
    actions: { [key: string]: { func: () => void, type: string } }
    currentFrame: (() => string) | undefined

    constructor (base=document) {
        this.base = base? base.getElementById('base') : null
        this.state = {}
        this.actions = {}
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
        this.addActionToDom()
    }

    getCanvas () {
        if (!this.currentFrame) {
            console.error("Canvas error: 'currentFrame' not found")
            return null
        }
        let canvas = this.currentFrame()

        for (const key in this.state) {
            const regex = RegExp(`{{${key}}}`, 'g')
            canvas = canvas.replace(regex, String(this.state[key]))
        }
        return canvas
    }

    addActionToDom () {
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
    

    navigate (template: Framer) {
        const frame = template()
        this.currentFrame = frame.canvas

        if (frame.action) {
            this.addEvent(frame.action.id, {func: frame.action.func, type: frame.action.type})
        }
        this.setState(frame.state)
    }

    addEvent (id: string, {func, type}: {func: () => void, type: string}) {
        this.actions[id] = {func, type}
    }
}
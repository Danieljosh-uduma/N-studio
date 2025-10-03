type Framer = (props?: string | number | object) => {
    canvas: () => string
    state: State
    action: Action[] // | Action
    style: string
}

type State = {
    title: string
    props: {}
}
type Action = {
    id: string
    type: string
    func: () => void
}

export type { Framer, State, Action }
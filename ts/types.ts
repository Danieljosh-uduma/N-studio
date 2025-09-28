type Framer = () => {
    canvas: () => string
    state: State
    action: Action
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
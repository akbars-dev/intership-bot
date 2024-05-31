export default interface SessionData {
    state: 'start' | 'main' | 'categories'
    fsm: string,
    data: {
        actionId: string
    }
}
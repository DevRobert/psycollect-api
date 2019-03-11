export default class GoalPlan {
    private _currentState: string
    private _desiredState: string
    private _actions: string

    get currentState(): string {
        return this._currentState
    }

    set currentState(currentState: string) {
        this._currentState = currentState
    }

    get desiredState(): string {
        return this._desiredState
    }

    set desiredState(desiredState: string) {
        this._desiredState = desiredState
    }

    get actions(): string {
        return this._actions
    }

    set actions(actions: string) {
        this._actions = actions
    }
}

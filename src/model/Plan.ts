import PlanId from "./PlanId";
import GoalPlan from "./GoalPlan";
import Goals from "./Goals";

export default class Plan {
    private _planId: PlanId
    private _goalPlans = new Map<string, GoalPlan>()
    
    constructor(planId: PlanId) {
        this._planId = planId

        Goals.forEach(goal => {
            this.setGoalPlan(goal.name, new GoalPlan())
        })
    }

    get planId(): PlanId {
        return this._planId
    }

    get goalPlans(): ReadonlyMap<string, GoalPlan> {
        return this._goalPlans
    }

    setGoalPlan(goalName: string, goalPlan: GoalPlan): void {
        if(!Goals.has(goalName)) {
            throw new Error("The goal '" + goalName + "' is unknown.")
        }

        this._goalPlans.set(goalName, goalPlan)
    }
}

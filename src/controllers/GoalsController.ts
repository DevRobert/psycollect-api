import { Request, Response } from "express";
import Period from "../model/Period";
import PlanId from "../model/PlanId";
import Plan from "../model/Plan";
import * as PlanRepository from "../model/PlanRepository"
import Goals from "../model/Goals";
import GoalPlan from "../model/GoalPlan";

function getPlanId(request: Request) {
    const userId = request.user.userid
    const period = new Period(new Date().getFullYear())
    return new PlanId(userId, period)
}

export async function getGoals(request: Request, response: Response) {
    const planId = getPlanId(request)

    let plan: Plan

    try {
        plan = await PlanRepository.getPlan(planId)
    }
    catch(error) {
        response.status(500).send({
            error: error.message
        })

        return
    }

    if(plan === null) {
        plan = new Plan(planId)
    }

    const body = {
        period: planId.period.toString(),
        goalPlans: {}
    }

    for(let goal of Goals.values()) {
        body.goalPlans[goal.name] = {
            description: goal.description,
        }

        const goalPlan = plan.goalPlans.get(goal.name)
    
        if(goalPlan) {
            body.goalPlans[goal.name].currentState = goalPlan.currentState
            body.goalPlans[goal.name].desiredState = goalPlan.desiredState
            body.goalPlans[goal.name].actions = goalPlan.actions
        }
    }

    response.status(200).send(body)
}

export async function setGoals(request: Request, response: Response) {
    const planId = getPlanId(request)

    const plan = new Plan(planId)

    try {
        if(request.body.goalPlans) {
            for(let goalName in request.body.goalPlans) {
                let goalPlanItem = request.body.goalPlans[goalName]

                const goalPlan = new GoalPlan
                goalPlan.currentState = goalPlanItem.currentState
                goalPlan.desiredState = goalPlanItem.desiredState
                goalPlan.actions = goalPlanItem.actions

                plan.setGoalPlan(goalName, goalPlan)
            }
        }
    }
    catch(error) {
        response.status(400).send({
            error: error.message
        })

        return
    }

    try {
        await PlanRepository.savePlan(plan)
    }
    catch(error) {
        console.log(error)

        response.status(500).send({
            error: error.message
        })

        return
    }

    response.status(200).send({})
}

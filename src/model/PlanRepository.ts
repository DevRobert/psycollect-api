import * as AWS from "aws-sdk"
import * as config from "config"
import Plan from "./Plan";
import PlanId from "./PlanId";
import GoalPlan from "./GoalPlan";
import { ConfigurationServicePlaceholders } from "aws-sdk/lib/config_service_placeholders";

AWS.config.update({
    region: config.get("aws_region")
})

const documentClient = new AWS.DynamoDB.DocumentClient()
const tableName = "psycollect-plans"

function itemToPlan(item: any): Plan {
    const planId = PlanId.parseString(item.PlanId)
    const plan = new Plan(planId)
    
    if(item.GoalPlans) {
        for(let goalName of Object.keys(item.GoalPlans)) {
            const goalPlanItem = item.GoalPlans[goalName]

            const goalPlan = new GoalPlan()
            goalPlan.currentState = goalPlanItem.CurrentState
            goalPlan.desiredState = goalPlanItem.DesiredState
            goalPlan.actions = goalPlanItem.Actions
            plan.setGoalPlan(goalName, goalPlan)
        }
    }

    return plan
}

function planToItem(plan: Plan): any {
    const GoalPlans = {}

    plan.goalPlans.forEach((goalPlan, goalName) => {        
        GoalPlans[goalName] = {
            CurrentState: goalPlan.currentState,
            DesiredState: goalPlan.desiredState,
            Actions: goalPlan.actions
        }
    })

    return {
        PlanId: plan.planId.toString(),
        GoalPlans
    }
}

export async function savePlan(plan: Plan): Promise<void> {
    const params = {
        TableName: tableName,
        Item: planToItem(plan)
    }

    console.log(params.Item)

    await documentClient.put(params).promise()
}

export async function getPlan(planId: PlanId): Promise<Plan> {
    const params = {
        TableName: tableName,
        Key: {
            PlanId: planId.toString()
        }
    }

    const response = await documentClient.get(params).promise()

    if(!response.Item) {
        return null
    }

    return itemToPlan(response.Item)
}

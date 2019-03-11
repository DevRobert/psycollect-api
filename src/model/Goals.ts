import Goal from "./Goal";

const GoalsSource = [{
    name: "Family",
    description: "partnership, children, parents, other relatives"
},
{
    name: "Friends",
    description: "make and develop friends, resolve friend ships"
},
{
    name: "Hobbies",
    description: "discover and maintain hobbies, improve capabilities, increase social commitment"
},
{
    name: "Job",
    description: "develop career, get new job, change branch, improve salary"
},
{
    name: "Finance",
    description: "build reserve, improve pension plan"
},
{
    name: "Health",
    description: "optimize weight, do sports"
},
{
    name: "Home",
    description: "change region/ city, change or improve house/ flat, enhance furniture"
}]

const Goals = new Map<string, Goal>()

GoalsSource.forEach(goal => {
    Goals.set(goal.name, new Goal(goal.name, goal.description))
})

export default Goals

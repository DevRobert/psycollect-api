import User from "./User";
import * as AWS from "aws-sdk"
import * as config from "config"

AWS.config.update({
    region: config.get("aws-region")
})

const documentClient = new AWS.DynamoDB.DocumentClient()
const tableName = 'psycollect-users'

function itemToUser(item: any): User {
    const user = new User
    user.id = item.UserId
    user.email = item.Email
    user.admin = item.Admin
    user.enabled = item.Enabled
    user.password = item.Password
    return user
}

function userToItem(user: User): any {
    return {
        "UserId": user.id,
        "Email": user.email,
        "Password": user.password,
        "Enabled": user.enabled,
        "Admin": user.admin
    }
}

export async function getAllUsers(): Promise<User[]> {
    const params = {
        TableName: tableName
    }

    const response = await documentClient.scan(params).promise()
    return response.Items.map(itemToUser)
}

export async function getUserByEmail(email: String): Promise<User> {
    const params = {
        TableName: tableName,
        FilterExpression: "Email = :email",
        ExpressionAttributeValues: {
            ":email": email
        }
    }

    const response = await documentClient.scan(params).promise()

    if(response.Count === 0) {
        return null
    }

    return itemToUser(response.Items[0])
}

export async function saveUser(user: User): Promise<void> {
    const params = {
        TableName: tableName,
        Item: userToItem(user)
    }

    await documentClient.put(params).promise()
}

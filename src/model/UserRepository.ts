import User from "./User";
import * as AWS from "aws-sdk"

AWS.config.update({
    region: "us-east-1"
})

const documentClient = new AWS.DynamoDB.DocumentClient()
const tableName = 'psycollect-users'

export default class UserRepository {
    static itemToUser(item: any): User {
        const user = new User
        user.id = item.UserId
        user.email = item.Email
        user.admin = item.Admin
        user.enabled = item.Enabled
        user.password = item.Password
        return user
    }

    static userToItem(user: User): any {
        return {
            "UserId": user.id,
            "Email": user.email,
            "Password": user.password,
            "Enabled": user.enabled,
            "Admin": user.admin
        }
    }

    async getAllUsers(): Promise<User[]> {
        const params = {
            TableName: tableName
        }

        const response = await documentClient.scan(params).promise()
        return response.Items.map(UserRepository.itemToUser)
    }

    async getUserByEmail(email: String): Promise<User> {
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

        return UserRepository.itemToUser(response.Items[0])
    }

    async saveUser(user: User): Promise<void> {
        const params = {
            TableName: tableName,
            Item: UserRepository.userToItem(user)
        }

        await documentClient.put(params).promise()
    }
}

import { APIRequestContext } from "@playwright/test";
import * as testData from "../../fixtures/testData.json"

export class UserPO {


    private readonly request: APIRequestContext
    baseURL = testData.apiURL
    constructor(request: APIRequestContext) {
        this.request = request
    }

    async createUser(userData) {

        const response = await this.request.post(`${this.baseURL}/user`, {
            data: userData
        })
        return response
    }

    async updateUser(username, randomData) {

        const response = await this.request.put(`${this.baseURL}/user/${username}`, {
            data: randomData
        })
        return response
    }

    async searchUser(username) {

        const response = await this.request.get(`${this.baseURL}/user/${username}`)

        return response
    }

}

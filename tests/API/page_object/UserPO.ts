import { APIRequestContext, expect } from "@playwright/test";
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

    async searchAndValidateUser(dataToValidate: any) {

        const response = await this.searchUser(dataToValidate.username);
        const responseJson = await response.json();

        expect(response.status()).toBe(200);
        expect(responseJson.id.toString()).toBe(dataToValidate.id);
        expect(responseJson.username).toBe(dataToValidate.username);
        expect(responseJson.email).toBe(dataToValidate.email);
        expect(responseJson.password).toBe(dataToValidate.password);
        expect(responseJson.phone).toBe(dataToValidate.phone);
        expect(responseJson.userStatus.toString()).toBe(dataToValidate.userStatus);
    }

}

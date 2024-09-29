import { APIRequestContext, expect } from "@playwright/test";
import * as testData from "../../fixtures/testData.json"

export class UserPO {


    private request: APIRequestContext
    baseURL = testData.apiURL
    constructor(request: APIRequestContext) {
        this.request = request
    }

    /*async login(userData) {
        const response = await this.request.post(`https://petstore.swagger.io/#/user/`, {
            data: {
                "username": "eve.holt@reqres.in",
                "password": "cityslicka"
            }
        })

        //verify that the response is 200
        expect(response.status()).toBe(201)

        const responseBody = await response.json()
        console.log(responseBody)

        return response
    }*/

    async createUser(userData) {

        const response = await this.request.post(`${this.baseURL}/createUser`, {
            data: userData
        })
        console.log(response.ok())
        expect(response.ok())

        return response
    }

}
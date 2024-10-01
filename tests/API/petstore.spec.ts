import { test as baseTest, expect } from '../fixtures/pomFixtures';
import { generateRandomUser } from '../page_object/testUtils'



baseTest.describe('This are the positive tests for users', () => {

    const randomCreateData = generateRandomUser()
    const randomUpdateData = generateRandomUser()

    async function searchAndValidateUser(userPO: any, data: any) {
        const response = await userPO.searchUser(randomCreateData.username);
        const responseJson = await response.json();

        expect(response.status()).toBe(200);
        expect(responseJson.id.toString()).toBe(data.id);
        expect(responseJson.username).toBe(data.username);
        expect(responseJson.email).toBe(data.email);
        expect(responseJson.password).toBe(data.password);
        expect(responseJson.phone).toBe(data.phone);
        expect(responseJson.userStatus.toString()).toBe(data.userStatus);
    }

    baseTest('This is a test to create a user', async ({ userPO }) => {

        const response = await userPO.createUser(randomCreateData);
        const responseJson = await response.json()

        console.log('test data create: ', randomUpdateData)

        expect(responseJson.code).toBe(200)
        expect(responseJson.type).toBe('unknown')
        expect(responseJson.message).toBe(randomCreateData.id.toString())

    })

    baseTest('This is a test to validate the created user', async ({ userPO }) => {

        await searchAndValidateUser(userPO, randomCreateData)

    })

    baseTest('This is a test to update the user', async ({ userPO }) => {


        randomUpdateData.id = randomCreateData.id
        randomUpdateData.username = randomCreateData.username

        console.log('test data update: ', randomUpdateData)

        const response = await userPO.updateUser(randomCreateData.username, randomUpdateData)
        const responseJson = await response.json()
        expect(responseJson.code).toBe(200)
        expect(responseJson.type).toBe('unknown')
        expect(responseJson.message).toBe(randomCreateData.id.toString())

    })

    baseTest('This is a test to validate the updated user', async ({ userPO }) => {

        await searchAndValidateUser(userPO, randomUpdateData)

    })

})

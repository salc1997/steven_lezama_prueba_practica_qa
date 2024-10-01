import { test as baseTest, expect } from '../fixtures/pomFixtures';
import { generateRandomUser } from '../page_object/testUtils'



const randomCreateData = generateRandomUser()
const randomUpdateData = generateRandomUser()

baseTest.describe('This are the test to create and validate an user', () => {

    baseTest('This is a test to create a user', async ({ userPO }) => {

        const response = await userPO.createUser(randomCreateData);
        const responseJson = await response.json()

        expect(responseJson.code).toBe(200)
        expect(responseJson.type).toBe('unknown')
        expect(responseJson.message).toBe(randomCreateData.id.toString())

    })

    baseTest('This is a test to validate the created user', async ({ userPO }) => {

        await userPO.searchAndValidateUser(randomCreateData)

    })

})

baseTest.describe('This are the test to update and validate an user', () => {


    baseTest('This is a test to update the user', async ({ userPO }) => {

        randomUpdateData.id = randomCreateData.id
        randomUpdateData.username = randomCreateData.username

        const response = await userPO.updateUser(randomCreateData.username, randomUpdateData)
        const responseJson = await response.json()
        expect(responseJson.code).toBe(200)
        expect(responseJson.type).toBe('unknown')
        expect(responseJson.message).toBe(randomCreateData.id.toString())

    })


    baseTest('This is a test to validate the updated user', async ({ userPO }) => {

        await userPO.searchAndValidateUser(randomUpdateData)

    })

})

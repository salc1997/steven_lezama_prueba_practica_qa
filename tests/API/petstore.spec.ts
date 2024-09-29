import { test as baseTest, expect } from '@playwright/test';
import { UserPO } from './page_object/userPO';
import userData from "../fixtures/testData.json"

type UserFixture = {
    createdUser: any; // Define un tipo para el usuario creado
};

let userPO: UserPO

const test = baseTest.extend<UserFixture>({
    createdUser: async ({ request }, use) => {
        const userPO = new UserPO(request);
        const loginUser = {
            username: userData.APIuser.loginUsername,
            password: userData.APIuser.loginPassword,
        }
        /*const newUser = {
            id: userData.APIuser.id,
            username: userData.APIuser.username,
            firstname: userData.APIuser.firstname,
            lastname: userData.APIuser.lastname,
            email: userData.APIuser.email,
            password: userData.APIuser.password,
            phone: userData.APIuser.phone,
            userStatus: userData.APIuser.userStatus
        }*/

        //const login = await userPO.login(loginUser);

        const user = await userPO.createUser(loginUser);
        await use(user);
    }
});


test.describe('This are the positive tests for users', () => {



    test('This is a test to create a user', async ({ createdUser }) => {

        //expect(createdUser.id).toBe(userData.APIuser.id)
        //console.log('user created from fixture: ', createdUser)

    })
})


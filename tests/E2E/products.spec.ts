import { test } from '../fixtures/pomFixtures';

test.describe('This is a test to add a producto to the cart', () => {


    test('This is a test to tr to add 2 products', async ({ loginPO, inventoryPO, checkoutPO, goTo }) => {

        //Login and verifying that the login was successful
        await loginPO.login()

        await inventoryPO.verifyLogin()

        await checkoutPO.checkout()
        await checkoutPO.fillInformation()
        await checkoutPO.checkOverview()
        await checkoutPO.finishPurchase()

    })





})

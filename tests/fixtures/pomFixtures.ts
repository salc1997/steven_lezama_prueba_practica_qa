import { test as baseTest } from '@playwright/test'
import { LoginPO } from "../page_object/LoginPO";
import { InventoryPO } from "../page_object/inventoryPO";
import { CheckoutPO } from "../page_object/CheckoutPO";
import { UserPO } from '../API/page_object/userPO';
import * as testData from '../fixtures/testData.json'



const testPages = baseTest.extend({

    goTo: async ({ page }, use) => {
        await use(page.goto(testData.url))
    },

    loginPO: async ({ page }, use) => {

        await use(new LoginPO(page))
    },

    inventoryPO: async ({ page }, use) => {
        await use(new InventoryPO(page))
    },

    checkoutPO: async ({ page }, use) => {
        await use(new CheckoutPO(page))
    },
    userPO: async ({ request }, use) => {
        const userPO = new UserPO(request);
        await use(userPO);
    }
})

export const test = testPages
export const expect = testPages.expect

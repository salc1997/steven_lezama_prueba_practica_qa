import { test as baseTest } from '@playwright/test'
import { LoginPO } from "../page_object/LoginPO";
import { InventoryPO } from "../page_object/inventoryPO";
import { CheckoutPO } from "../page_object/CheckoutPO";
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
})


export const test = testPages
export const expect = testPages.expect
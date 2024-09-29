import { expect, Locator, Page } from "@playwright/test";
import { getTwoRandomNumbers } from '../page_object/testUtils'

export class InventoryPO {

    private page: Page
    private readonly labelProducts: Locator
    private readonly inventory: Locator
    private readonly btnCart: Locator
    public readonly labelAmountItems: Locator

    constructor(page: Page) {
        this.page = page;
        this.labelProducts = page.locator('.product_label')
        this.inventory = page.locator('//div[@class="inventory_item"]')
        this.btnCart = page.locator('.shopping_cart_container')
        this.labelAmountItems = page.locator('.shopping_cart_badge')
    }

    async clickBtnCart() {
        await this.btnCart.click()
    }

    async verifyLogin() {

        const elements = await this.inventory.count()
        const title = await this.labelProducts.innerText()

        //verifies that the list of products is being displayed
        expect(elements).toBeGreaterThan(0)

        //Verifies that the title is correct
        expect(title).toContain('Products')


    }

    async addTwoRandomProducts() {

        const element = await (this.inventory).count()

        const randomNumers = getTwoRandomNumbers(element)

        let products: { name?: string, description?: string, price?: string }[] = [];

        for (const element of randomNumers) {

            const product: { name?: string, description?: string, price?: string } = {}

            product.name = await this.page.locator(`(//div[@class="inventory_item_name"])[${element}]`).innerText()
            product.description = await this.page.locator(`(//div[@class="inventory_item_desc"])[${element}]`).innerText()
            product.price = (await this.page.locator(`(//div[@class="inventory_item_price"])[${element}]`).innerText()).replace('$', '')
            await this.page.locator(`(//div[@class="pricebar"])[${element}]//button`).click()

            products.push(product)

        }


        expect(await this.labelAmountItems.innerText()).toEqual(products.length.toString())

        await this.clickBtnCart()

        return products;


    }
}
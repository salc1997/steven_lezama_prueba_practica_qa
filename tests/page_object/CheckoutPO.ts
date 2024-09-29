import { expect, Locator, Page } from "@playwright/test";
import { convertToFloat } from "./testUtils";
import * as testData from '../fixtures/testData.json'
import { InventoryPO } from "./inventoryPO";

export class CheckoutPO {

    private page: Page
    private inventoryPO: InventoryPO
    private readonly listProducts: Locator
    private readonly btnCheckOut: Locator
    private readonly txtFirstName: Locator
    private readonly txtLastName: Locator
    private readonly txtZipCode: Locator
    private readonly btnContinue: Locator
    private readonly checkoutContainer: Locator
    private readonly btnCancel: Locator
    private readonly labelItemTotal: Locator
    private readonly labelTax: Locator
    private readonly labelTotal: Locator
    private readonly labelPaymentInformation: Locator
    private readonly labelShippingInformation: Locator
    private readonly btnFinish: Locator
    private readonly labelThankYou: Locator
    private readonly labelSentOrder: Locator
    private readonly labelFinish: Locator

    constructor(page: Page) {
        this.page = page;
        this.listProducts = page.locator('.cart_item')
        this.btnCheckOut = page.locator('.checkout_button')
        this.txtFirstName = page.getByRole('textbox', { name: 'First Name' })
        this.txtLastName = page.getByRole('textbox', { name: 'Last Name' })
        this.txtZipCode = page.getByRole('textbox', { name: 'Zip/Postal Code' })
        this.btnContinue = page.getByRole('button', { name: 'CONTINUE' })
        this.btnCancel = page.getByRole('link', { name: 'CANCEL' })
        this.checkoutContainer = page.locator('.checkout_info_container')
        this.labelItemTotal = page.locator('.summary_subtotal_label')
        this.labelTax = page.locator('.summary_tax_label')
        this.labelTotal = page.locator('.summary_total_label')
        this.labelPaymentInformation = this.page.locator('//div[@class="summary_value_label"][1]')
        this.labelShippingInformation = this.page.locator('//div[@class="summary_value_label"][2]')
        this.btnFinish = page.getByRole('link', { name: 'FINISH' })
        this.labelThankYou = page.locator('.complete-header')
        this.labelSentOrder = page.locator('.complete-text')
        this.labelFinish = page.locator('.subheader')
        this.inventoryPO = new InventoryPO(this.page)

    }

    products = {}

    async checkProducts() {

        //checks that the products on the correct page and the products on the menu have the same values
        const amountItems = await this.listProducts.count()
        for (let index = 0; index < amountItems; index++) {

            const cartName = await this.page.locator(`(//div[@class="inventory_item_name"])[${index + 1}]`).innerText();
            const cartDescription = await this.page.locator(`(//div[@class="inventory_item_desc"])[${index + 1}]`).innerText();
            const cartPrice = await this.page.locator(`(//div[@class="inventory_item_price"])[${index + 1}]`).innerText()

            expect(this.products[index].name).toContain(cartName)
            expect(this.products[index].description).toContain(cartDescription)
            expect(this.products[index].price).toContain(cartPrice)

        }

    }

    async checkout() {


        this.products = await this.inventoryPO.addTwoRandomProducts()

        this.checkProducts()
        await this.btnCheckOut.click()

    }

    async fillInformation() {

        //check if the container with the fields and all the required fields are being displayed
        expect(await this.checkoutContainer.count()).toEqual(1)
        expect(await this.txtFirstName.count()).toEqual(1)
        expect(await this.txtLastName.count()).toEqual(1)
        expect(await this.txtZipCode.count()).toEqual(1)
        expect(await this.btnCancel.count()).toEqual(1)
        expect(await this.btnContinue.count()).toEqual(1)


        //Filling the form
        await this.txtFirstName.fill(testData.firstName)
        await this.txtLastName.fill(testData.lastname)
        await this.txtZipCode.fill(testData.zipCode)
        await this.btnContinue.click()

    }

    async checkOverview() {

        let totalprice = 0

        for (const key in this.products) {
            if (this.products.hasOwnProperty(key)) {

                totalprice += convertToFloat(this.products[key].price)

            }
        }

        //Checking that the information that is being displayed here is the correct one

        const calculatedTax: number = parseFloat((totalprice * 0.08).toFixed(2))


        const paymentInformation = await this.labelPaymentInformation.innerText()
        const shippingInformation = await this.labelShippingInformation.innerText()

        const itemTotal = (await this.labelItemTotal.innerText()).replace('$', '')
        const tax = (await this.labelTax.innerText()).replace('$', '')

        //Verify that the information is accurate
        expect(paymentInformation).toEqual(testData.paymentInfo)
        expect(shippingInformation).toContain(testData.shippingInfo)
        expect(itemTotal).toContain((totalprice.toFixed(2)).toString())
        expect(tax).toContain(calculatedTax.toString())

        await this.btnFinish.click()

    }

    async finishPurchase() {

        //verifies that the bubble with the amount of items is no longer visible after the clicking on Finish
        const amountItems = await this.inventoryPO.labelAmountItems.count()

        expect(amountItems).toEqual(0)

        expect(await this.labelFinish.innerText()).toEqual('Finish')
        expect(await this.labelThankYou.innerText()).toEqual(testData.thanksMessage)
        expect(await this.labelSentOrder.innerText()).toEqual(testData.sentOrderMessage)

    }
}

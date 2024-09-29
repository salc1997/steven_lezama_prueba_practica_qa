import { Locator, Page } from "@playwright/test";
import * as testData from '../fixtures/testData.json'

export class LoginPO {
    private readonly txtUsername: Locator
    private readonly txtPassword: Locator
    private readonly btnLogin: Locator

    constructor(page: Page) {

        this.txtUsername = page.getByRole('textbox', { name: 'Username' })
        this.txtPassword = page.getByRole('textbox', { name: 'Password' })
        this.btnLogin = page.getByRole('button', { name: 'Login' })

    }

    async login() {
        await this.txtUsername.fill(testData.username)
        await this.txtPassword.fill(testData.password)
        await this.btnLogin.click()
    }


}
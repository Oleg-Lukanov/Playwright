import { expect } from '@playwright/test';
import BasePage from "./BasePage";

const loginField = '#user_login';
const passwordField = '#user_password';
const confirmPasswordField = '#user_password_confirmation';
const firstNameField = '#user_firstname';
const lastNameField = '#user_lastname';
const emailField = '#user_mail';
const hideEmailCheckbox = '#pref_hide_mail';
const languageDropdown = '#user_language';
const organizationField = '#user_custom_field_values_5';
const locationField = '#user_custom_field_values_6';
const ircNicknameField = '#user_custom_field_values_3';
const sendButton = 'input[name="commit"]';
const successMessage = '#flash_notice';
const errorMessage = '#errorExplanation';

class RegisterFormPage extends BasePage {
    constructor(page) {
        super(page);
        this.page = page;
    }

    async goto() {
        await this.page.goto('/account/register'); 
    }

    // Methods for individual fields (Required)
    async fillLogin(login) {
        await this.page.locator(loginField).fill(login);
    }

    async fillPassword(password) {
        await this.page.locator(passwordField).fill(password);
    }

    async fillConfirmation(confirmation) {
        await this.page.locator(confirmPasswordField).fill(confirmation);
    }

    async fillFirstName(firstName) {
        await this.page.locator(firstNameField).fill(firstName);
    }

    async fillLastName(lastName) {
        await this.page.locator(lastNameField).fill(lastName);
    }

    async fillEmail(email) {
        await this.page.locator(emailField).fill(email);
    }

    // Methods for individual fields (Optional)
    async toggleHideEmail(hide = true) {
        const checkbox = this.page.locator(hideEmailCheckbox);
        if (hide) {
            await checkbox.check();
        } else {
            await checkbox.uncheck();
        }
    }

    async selectLanguage(language) {
        await this.page.locator(languageDropdown).selectOption(language);
    }

    async fillOrganization(organization) {
        await this.page.locator(organizationField).fill(organization);
    }

    async fillLocation(location) {
        await this.page.locator(locationField).fill(location);
    }

    async fillIrcNickname(ircNickname) {
        await this.page.locator(ircNicknameField).fill(ircNickname);
    }

    // Methods to fill all required fields at once
    async fillRequiredFields({ login, password, confirmation, firstName, lastName, email }) {
        await this.fillLogin(login);
        await this.fillPassword(password);
        await this.fillConfirmation(confirmation);
        await this.fillFirstName(firstName);
        await this.fillLastName(lastName);
        await this.fillEmail(email);
    }

    // Methods to fill all optional fields at once
    async fillOptionalFields({ hideEmail = true, language = null, organization = null, location = null, ircNickname = null }) {
        await this.toggleHideEmail(hideEmail);
        if (language) {
            await this.selectLanguage(language);
        }
        if (organization) {
            await this.fillOrganization(organization);
        }
        if (location) {
            await this.fillLocation(location);
        }
        if (ircNickname) {
            await this.fillIrcNickname(ircNickname);
        }
    }


    async submit() {
        await this.page.locator(sendButton).click();
    }

    async assertSuccess() {
        await expect(this.page.locator(successMessage)).toBeVisible();
    }

    async assertError() {
        await expect(this.page.locator(errorMessage)).toBeVisible();
    }
}

export default RegisterFormPage;

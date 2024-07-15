import { expect } from '@playwright/test';

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

class RegisterFormPage {
    constructor(page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('/account/register'); 
    }

    async fillRequiredFields({ login, password, confirmation, firstName, lastName, email }) {
        await this.page.locator(loginField).fill(login);
        await this.page.locator(passwordField).fill(password);
        await this.page.locator(confirmPasswordField).fill(confirmation);
        await this.page.locator(firstNameField).fill(firstName);
        await this.page.locator(lastNameField).fill(lastName);
        await this.page.locator(emailField).fill(email);
    }

    async fillOptionalFields({ hideEmail = true, language = null, organization = null, location = null, ircNickname = null }) {
        if (hideEmail) {
            await this.page.locator(hideEmailCheckbox).check();
        } else {
            await this.page.locator(hideEmailCheckbox).uncheck();
        }
        if (language) {
            await this.page.locator(languageDropdown).selectOption(language);
        }
        if (organization) {
            await this.page.locator(organizationField).fill(organization);
        }
        if (location) {
            await this.page.locator(locationField).fill(location);
        }
        if (ircNickname) {
            await this.page.locator(ircNicknameField).fill(ircNickname);
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

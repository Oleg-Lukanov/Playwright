import { test, expect } from '@playwright/test';
import RegisterFormPage from '../page-objects/RegisterFormPage';
import { getRandomString, getRandomEmail } from '../helper/utils';

test.describe('User', () => {
    let formPage;

    test.beforeEach(async ({ page }) => {
        formPage = new RegisterFormPage(page);
        await formPage.goto();
    });

    test('should successfully submit the form with all required fields filled', async ({ page }) => {
        const randomLogin = getRandomString(10);
        const randomEmail = getRandomEmail();
        
        await formPage.fillRequiredFields({
            login: randomLogin,
            password: 'testpassword',
            confirmation: 'testpassword',
            firstName: 'Ivan',
            lastName: 'Petrov',
            email: randomEmail
        });
        await formPage.submit();
        await formPage.assertSuccess();
    });

    test('should successfully submit the form with optional fields filled', async ({ page }) => {
        const randomLogin = getRandomString(10);
        const randomEmail = getRandomEmail();
        
        await formPage.fillRequiredFields({
            login: randomLogin,
            password: 'testpassword',
            confirmation: 'testpassword',
            firstName: 'Ivan',
            lastName: 'Petrov',
            email: randomEmail
        });
        await formPage.fillOptionalFields({
            hideEmail: true,
            language: 'en',
            organization: 'Organization Name',
            location: 'Location Name',
            ircNickname: 'ivanpetrov'
        });
        await formPage.submit();
        await formPage.assertSuccess();
    });

    test('should successfully submit the form with optional fields left blank', async ({ page }) => {
        const randomLogin = getRandomString(10);
        const randomEmail = getRandomEmail();
        
        await formPage.fillRequiredFields({
            login: randomLogin,
            password: 'testpassword',
            confirmation: 'testpassword',
            firstName: 'Ivan',
            lastName: 'Petrov',
            email: randomEmail
        });
        await formPage.fillOptionalFields({});
        await formPage.submit();
        await formPage.assertSuccess();
    });

    test('should show error messages when required fields are missing', async ({ page }) => {
        await formPage.submit();
        await formPage.assertError();
    });

    test('should successfully register with the checkbox "Hide my email address" checked', async ({ page }) => {
        const randomLogin = getRandomString(10);
        const randomEmail = getRandomEmail();
        
        await formPage.fillRequiredFields({
            login: randomLogin,
            password: 'testpassword',
            confirmation: 'testpassword',
            firstName: 'Ivan',
            lastName: 'Petrov',
            email: randomEmail
        });
        await formPage.fillOptionalFields({ hideEmail: true });
        await formPage.submit();
        await formPage.assertSuccess();
    });

    test('should successfully register with a randomly selected language in the "Language" dropdown list', async ({ page }) => {
        const randomLogin = getRandomString(10);
        const randomEmail = getRandomEmail();
        
        await formPage.fillRequiredFields({
            login: randomLogin,
            password: 'testpassword',
            confirmation: 'testpassword',
            firstName: 'Ivan',
            lastName: 'Petrov',
            email: randomEmail
        });
        await formPage.fillOptionalFields({
            language: 'en',
            organization: 'Organization Name',
            location: 'Location Name',
            ircNickname: 'ivanpetrov'
        });
        await formPage.submit();
        await formPage.assertSuccess();
    });
});

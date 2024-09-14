import { test, expect } from "global-setup";
import { LoginPage } from "pages/login/LoginPage";
import { CategoriesPage } from "pages/dashboard/categories/CategoriesPage";
import { getFormattedTimestamp } from "utils/helper";

const email = process.env.TEST_EMAIL;
const password = process.env.TEST_PASSWORD;

test.describe(`Category Tests`, () => {
  test(`Create Category and Subcategory`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    const categoriesPage = new CategoriesPage(page);
    const categoryName = `${getFormattedTimestamp()}-TestCategory`;
    const subCategoryName = `${categoryName}-subcategory`;

    // Go to Qubika Sports Club Management System
    await loginPage.GoTo(loginPage.urlLoginpage);

    // Validate that the login page is displayed correctly
    expect(
      await page.getByText("Qubika ClubPor favor ingrese").isVisible(),
    ).toBe(true);

    // Log in with the created user
    await loginPage.Login(email, password);

    // Validate that the user is logged in
    await expect(page).toHaveURL(
      "https://club-administration.qa.qubika.com/#/dashboard",
      { timeout: 5000 },
    );

    // Go to the Categories page
    await categoriesPage.GoToCategories();

    // Create a new category and validate that the category was created successfully
    await categoriesPage.AddCategory(categoryName);
    const successMessage = await categoriesPage.alertAddSuccess;
    expect(successMessage).toBeVisible();

    // Create a new subcategory and validate that the subcategory was created successfully
    await categoriesPage.AddSubCategory(categoryName, subCategoryName);
    expect(successMessage).toBeVisible();

    // Validate that the categories are displayed correctly on the list of categories
    await expect(
      await categoriesPage.SearchCategoryItems(categoryName),
    ).toBeTruthy();
    await expect(
      await categoriesPage.SearchCategoryItems(subCategoryName),
    ).toBeTruthy();
  });
});

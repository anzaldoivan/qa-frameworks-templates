import { test, expect } from "global-setup";
import { getFormattedTimestamp } from "utils/helper";
import { LoginPost } from "api/auth-controller/login";
import { SetContext } from "api/auth";
import {
  CreateCategory,
  CreateSubCategory,
  GetCategoryId,
} from "api/category-type-controller/category-type";

const email = process.env.TEST_EMAIL;
const password = process.env.TEST_PASSWORD;

test.describe("API Category Tests", () => {
  let apiContext;
  let categoryName;

  test.beforeAll(async ({ playwright, request }) => {
    // Log in with the created user
    const token = await LoginPost(request, email, password);
    apiContext = await playwright.request.newContext(SetContext(token));
  });

  test.afterAll(async ({}) => {
    // Dispose all responses.
    await apiContext.dispose();
  });

  test("Create Category and Subcategory", async ({ request }) => {
    categoryName = `${await getFormattedTimestamp()}-API-Category`;

    // Create category and subcategory.
    const resCategory = await CreateCategory(apiContext, categoryName);
    expect(resCategory.status()).toBe(200);
    const categoryBody = await resCategory.json();

    const resSubCategory = await CreateSubCategory(
      apiContext,
      categoryName,
      categoryBody.id,
    );
    expect(resSubCategory.status()).toBe(200);
    const subcategoryBody = await resSubCategory.json();

    // Validate category and subcategory
    const resGetCategory = await GetCategoryId(apiContext, categoryBody.id);
    expect(resGetCategory.status()).toBe(200);

    const resGetSubCategory = await GetCategoryId(
      apiContext,
      subcategoryBody.id,
    );
    expect(resGetSubCategory.status()).toBe(200);
  });
});

import { type Locator, type Page } from "@playwright/test";
import { DashboardPage } from "pages/dashboard/DashboardPage";

export class CategoriesPage extends DashboardPage {
  readonly buttonAddCategory: Locator;
  readonly categoryName: Locator;
  readonly parentCategoryName: Locator;
  readonly subcategoryCheck: Locator;
  readonly categoryList: Locator;
  readonly buttonAccept: Locator;
  readonly buttonPage: Locator;
  readonly alertAddSuccess: Locator;

  constructor(page: Page) {
    super(page);
    this.buttonAddCategory = this.page.locator(
      "xpath=//button[@class='btn btn-primary' and contains(text(),'Adicionar')]",
    );
    this.categoryName = this.page.getByPlaceholder("Nombre de categoría");
    this.parentCategoryName = this.page.locator(
      "xpath=//div[@role='combobox']/input",
    );
    this.subcategoryCheck = this.page.getByText("Es subcategoria?");
    this.categoryList = this.page.getByRole("combobox").getByRole("textbox");
    this.buttonAccept = this.page.getByRole("button", { name: "Aceptar" });
    this.buttonPage = this.page.locator("xpath=//a[@class='page-link']");
    this.alertAddSuccess = this.page.getByRole("alertdialog");
    // this.lastPage = this.page.locator("xpath=//li[@class='page-item']");
  }

  async AddCategory(name: string): Promise<void> {
    await this.buttonAddCategory.click();
    await this.categoryName.fill(name);
    await this.buttonAccept.click();
  }

  async AddSubCategory(nameCategory: string, nameSub: string): Promise<void> {
    await this.buttonAddCategory.click();
    await this.categoryName.fill(`${nameSub}`);
    await this.subcategoryCheck.click();
    await this.parentCategoryName.fill(nameCategory);
    await this.page.getByRole("option", { name: nameCategory }).click();
    await this.buttonAccept.click();
  }

  async GoToPage(index: number): Promise<void> {
    await this.buttonPage.nth(index).click();
    await this.page.waitForTimeout(1000);
  }

  async SearchCategoryItems(name: string): Promise<boolean> {
    await this.GoToPage(-2);
    if (
      (await this.page
        .locator(
          `xpath=(//td[@class='ng-star-inserted' and contains(text(),'${name}')])`,
        )
        .count()) == 0
    ) {
      await this.GoToPage(-2);
    }
    const categoryItem = await this.page.locator(
      `xpath=(//td[@class='ng-star-inserted' and contains(text(),'${name}')])`,
    );
    // console.log(await categoryItem.count());
    return await this.page.isVisible(
      `xpath=(//td[@class='ng-star-inserted' and contains(text(),'${name}')])`,
    );
  }
}

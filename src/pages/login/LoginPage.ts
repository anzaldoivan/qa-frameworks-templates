import { type Locator, type Page } from "@playwright/test";
import { BasePage } from "pages/common/BasePage";

export class LoginPage extends BasePage {
  readonly urlLoginpage: string;
  readonly fieldEmail: Locator;
  readonly fieldPassword: Locator;
  readonly buttonLogin: Locator;

  //a[@class='product-item-link']/*[contains(text(),'Balboa')]"

  constructor(page: Page) {
    super(page);
    this.urlLoginpage =
      "https://club-administration.qa.qubika.com/#/auth/login";
    this.fieldEmail = this.page.getByPlaceholder(
      "Usuario o correo electrónico",
    );
    this.fieldPassword = this.page.getByPlaceholder("Contraseña");
    this.buttonLogin = this.page.getByRole("button", { name: "Autenticar" });
  }

  async Login(email: string, password: string): Promise<void> {
    await this.fieldEmail.fill(email);
    await this.fieldPassword.fill(password);
    await this.buttonLogin.click();
  }

  async EnterSearch(): Promise<void> {
    await this.page.keyboard.press("Enter");
  }

  async SearchResults(text: string): Promise<void> {
    await this.page.keyboard.press("Enter");
  }
}

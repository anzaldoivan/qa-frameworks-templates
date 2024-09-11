import { test, expect, Browser, Page } from '@playwright/test';

(async () => {
    let browser: Browser;
    let page: Page;

    test.describe('Navegacion en FRT', ()=> {

      const sections = [
        {name: 'Cursos', url: '/cursos', expectedTitle: 'Cursos'},
        {name: 'Udemy', url: '/udemy', expectedTitle: 'Udemy'},
        {name: 'Recursos', url: '/recursos', expectedTitle: 'Recursos'}
      ]

      for(const section of sections){
        test(`Validar redireccion a la seccion "${section.name}"`, async ({page}) => {
          await test.step(`Estando yo en la web principal www.freerangetesters.com`, async () => {
            page.goto('https://www.freerangetesters.com');
            await expect(page).toHaveTitle('Free Range Testers');
          })

          await test.step(`Cuando hago click en "${section.name}`, async () => {
            page.locator('#page_header').getByRole('link', {name: section.name, exact: true}).click();
            await page.waitForURL(`**${section.url}`);
          })

          await test.step(`Soy redirigido a la seccion de titulo "${section.expectedTitle}`, async () => {
            await expect(page).toHaveTitle(section.expectedTitle);
          })
        })
      }

      test("Validar título de la página Free Range Testers", async ({ page }) => {
        await test.step("Estando yo en la web principal www.freerangetesters.com", async () => {
          await page.goto('https://www.freerangetesters.com');
          await expect(page).toHaveTitle('Free Range Testers');
        });
    });

    test('Click en Botón ID Dinámico', async ({ page }) => {
      await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
          await page.goto('');
      })

      await test.step('Puedo hacer click en el botón con ID dinámico', async () => {
          const botonIDDinamico = page.getByRole('button', { name: 'Hacé click para generar un ID dinámico y mostrar el elemento oculto' });
          await botonIDDinamico.click({ force: true });
          await expect(page.getByText('OMG, aparezco después de 3 segundos de haber hecho click en el botón 👻.')).toBeVisible();
      })
    })
    })
})();



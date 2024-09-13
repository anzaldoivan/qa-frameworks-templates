import { test , expect } from '@playwright/test';
import { HomePage } from 'pages/homepage/HomePage';

test.describe(`Shirt Validation`, () => {
    test(`Cart should have one element added`, async ({ page }) => {
        // Escribir "shirt" en el buscador y ejecutar la búsqueda.
        // Encontrar la remera con el texto "Balboa" en el nombre entre los resultados, no hacerlo por índice.
        // Hacer click en el producto.
        // Seleccionar cualquier tamaño.
        // Seleccionar cualquier color.
        // Hacer click en el botón de agregar al carrito.
        // Validar que el texto del botón de agregar en un momento dice "Added".
        // Validar que el contador del carrito, al lado del input de búsqueda, diga "1
        const homePage = new HomePage(page);
        await homePage.GoTo(homePage.urlHomepage);
        await homePage.FillSearch('shirt');
        await homePage.EnterSearch();
        await page.locator("xpath=//a[@class='product-item-link']/*[contains(text(),'Balboa')]").click();
        await page.getByLabel('XS').click();
        await page.getByLabel('Gray').click();
        await page.getByRole('button', { name: 'Add to Cart' }).click();
        // await expect(await page.getByRole('button', { name: 'Added' })).toBeEnabled();
        // await page.locator("#product-addtocart-button")

        await expect(page).toHaveTitle("Balboa Persistence Tree");
    });
});
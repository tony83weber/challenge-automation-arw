
import { expect } from '@playwright/test';
import { encryptSecretKey } from '../../helpers/encryptionHelper';
import { WikipediaPage } from '../../pages/WikipediaPage';
import { test } from '../../fixtures/globalFixtures';
import * as fs from 'fs-extra';
import * as path from 'path';
import xlsx from 'xlsx';

// Función para leer el archivo de Excel y extraer los nombres de Pokémon
const getPokemonNamesFromExcel = (filePath: string): string[] => {
    const workbook = xlsx.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });
    return data.slice(1).map((row: any) => row[1]); // Ignora la cabecera y obtiene solo los Pokémon
};

test.describe('Pruebas de Wikipedia con Pokémon', () => {
    const pokemonNames = getPokemonNamesFromExcel('data/Datos-pruebas.xlsx');

    pokemonNames.forEach((pokemonName) => {
        test(`Verificar página de Wikipedia para el Pokémon: ${pokemonName}`, async ({ page, encryptedSecretKey }) => {
            
            // 1. Crear instancia de la página WikipediaPage
            const wikipediaPage = new WikipediaPage(page);

            // 2. Navegar a la página de Wikipedia del Pokémon
            await wikipediaPage.navigateTo(pokemonName);

            // 3. Validar el título de la página
            const articleTitle = await wikipediaPage.getArticleTitle();
            expect(articleTitle.toLowerCase()).toBe(pokemonName.toLowerCase());

            // 4. Loguear quién realizó el dibujo
            const drawingAuthor = await wikipediaPage.getDrawingAuthor();
            console.log('Dibujo realizado por:', drawingAuthor);

            // 5. Descargar la imagen
            const imageUrl = await wikipediaPage.getImageUrl();
            const response = await page.request.get(imageUrl);
            const imageBuffer = await response.body();

            // Guardar la imagen
            const imagePath = path.join('src/images', `${pokemonName}.png`);
            await fs.ensureDir(path.dirname(imagePath));
            await fs.writeFile(imagePath, imageBuffer);

            // 7. Validaciones sobre la imagen descargada
            expect(WikipediaPage.isValidImageExtension(imagePath)).toBe(true);
            expect(await WikipediaPage.isValidImageSize(imagePath)).toBe(true);
        });
    });
});

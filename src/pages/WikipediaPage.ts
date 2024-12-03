// src/pages/wikipediaPage.ts
import { Page } from '@playwright/test';
import { Locator } from '@playwright/test';

export class WikipediaPage {
    // Definir los locators dentro del constructor
    titleLocator: Locator;
    imageLocator: Locator;
    authorLocator: Locator;

    constructor(private page: Page) {
        // Inicializar los locators
        this.titleLocator = this.page.locator('[class="mw-page-title-main"]');
        this.imageLocator = this.page.locator('[class="infobox ib-character"] img[class="mw-file-element"]');
        this.authorLocator = this.page.locator('[class="infobox-caption"]');
    }

    // Navegar a la página de un Pokémon específico
    async navigateTo(pokemonName: string): Promise<void> {
        await this.page.goto(`https://en.wikipedia.org/wiki/${pokemonName}`);
    }

    // Obtener el título de la página
    async getArticleTitle(): Promise<string> {
        return await this.titleLocator.innerText();  
    }

    // Obtener la URL de la imagen principal
    async getImageUrl(): Promise<string> {
        const imageUrl = await this.imageLocator.first().getAttribute('src');  
        return imageUrl ? `https:${imageUrl}` : '';  
    }

    // Obtener el nombre del autor del dibujo
    async getDrawingAuthor(): Promise<string> {
        return await this.authorLocator.innerText();  
    }

    // Validar si el archivo descargado tiene una extensión de imagen válida
    static isValidImageExtension(filePath: string): boolean {
        return /\.(jpg|jpeg|png|svg)$/i.test(filePath);
    }

    // Validar si el tamaño de la imagen es adecuado (< 500KB)
    static async isValidImageSize(filePath: string): Promise<boolean> {
        const fs = require('fs').promises;
        const stats = await fs.stat(filePath);
        return stats.size < 500000;  
    }
}

import { test } from '../../fixtures/globalFixtures';
import { expect } from '@playwright/test';
import { readExcelFile } from '../../helpers/excelReader';
import axios from 'axios';

// Función para obtener datos de la API
const getPokemon = async (pokemonIdentifier: string) => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonIdentifier}`);
    return response.data;
};

// Leer datos desde el archivo Excel
const testData = readExcelFile('data/Datos-pruebas.xlsx'); // Archivo Excel con datos de prueba

test.describe('Pruebas de API - Pokémon', () => {
    testData.forEach((row) => {
        const pokemonIdentifier = row[0]; // ID 
        const expectedName = row[1]; // Nombre 
        const expectedAbilities = row[2]; // Habilidades

        test(`Validar API con Pokémon ${pokemonIdentifier}`, async ({ encryptedSecretKey }) => {

            // Obtener datos del Pokémon desde la API
            const pokemonData = await getPokemon(pokemonIdentifier);

            // Imprimir datos
            console.log('Datos relevantes de la API:', {
                id: pokemonData.id,
                name: pokemonData.name,
                abilities: pokemonData.abilities.map((ability: any) => ability.ability.name),
            });

            // Validaciones
            expect(pokemonData).toHaveProperty('id');
            expect(pokemonData).toHaveProperty('name');
            expect(pokemonData).toHaveProperty('abilities');

            console.log(`Validando: ID=${pokemonIdentifier}, Name=${expectedName}, Abilities=${expectedAbilities}`);
            expect(pokemonData.id).toBe(Number(pokemonIdentifier)); // Validar ID
            expect(pokemonData.name).toBe(expectedName); // Validar nombre
            expect(
                pokemonData.abilities.map((ability: any) => ability.ability.name).join(', ')
            ).toBe(expectedAbilities); // Validar habilidades
        });
    });
});

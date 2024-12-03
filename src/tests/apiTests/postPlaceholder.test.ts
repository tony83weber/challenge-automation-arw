import { encryptSecretKey } from '../../helpers/encryptionHelper';
import { expect, request } from '@playwright/test';
import { test } from '../../fixtures/globalFixtures';

test('Realizar POST con jsonplaceholder y verificar respuesta', async ({ encryptedSecretKey }) => {

    // Datos a enviar en el POST
    const postData = {
        title: 'foo',
        body: 'bar',
        userId: 1,
    };

    // Crear un contexto de solicitud para hacer la solicitud POST
    const apiContext = await request.newContext();

    // Realizar la solicitud POST
    const response = await apiContext.post('https://jsonplaceholder.typicode.com/posts', {
        data: postData,
    });

    // Verificar que la respuesta tiene un código 201
    expect(response.status()).toBe(201);

    // Obtener la respuesta en JSON
    const responseBody = await response.json();

    // Validar que el ID está presente en la respuesta
    expect(responseBody).toHaveProperty('id');
    console.log(`Respuesta POST:`, responseBody);

    // Loguear la fecha y hora de finalización del test
    console.log(`Test finalizado a: ${new Date().toISOString()}`);
});

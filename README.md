# Challenge Automation - ARW
Este repositorio contiene las pruebas automatizadas desarrolladas con Playwright para diversos casos de prueba, incluyendo pruebas API y pruebas de interfaz web.

## Requisitos previos
Antes de ejecutar las pruebas, asegúrate de tener los siguientes requisitos instalados:

Node.js: Si no lo tienes instalado, puedes descargarlo desde [aquí](https://nodejs.org/en).

Git: Para clonar el repositorio. Puedes descargarlo desde [aquí](https://git-scm.com/).

Playwright: Se instalará a través de npm (ver instrucciones abajo).

## Instalación
### Clonar el repositorio
Primero, clona el repositorio en tu máquina local usando Git:
```bash
git clone https://github.com/tony83weber/challenge-automation-arw.git
```

### Instalación de dependencias
Una vez que hayas clonado el repositorio, navega a la carpeta del proyecto y ejecuta el siguiente comando para instalar todas las dependencias necesarias:
```bash
npm install
```
Esto instalará las dependencias necesarias, incluyendo Playwright y otros paquetes relacionados.

### Ejecutando las pruebas
Para ejecutar todas las pruebas automatizadas, usa el siguiente comando en la terminal:
```bash
$env:SECRET_KEY="tu_clave_secreta"; npx playwright test src/tests
```

Pruebas individuales
Si solo deseas ejecutar una prueba específica, puedes hacerlo con el siguiente comando:
```bash
$env:SECRET_KEY="tu_clave_secreta"; npx playwright test src/tests/[ruta/a/tu/test].test.ts
```
Reemplaza [ruta/a/tu/test] con la ruta relativa al archivo de prueba que quieres ejecutar.

### Reportes con Allure
Para generar los reportes de las pruebas con Allure, sigue estos pasos:

Instalación de Allure: Si no lo has hecho aún, instala Allure CLI de manera global:
```bash
npm install -g allure-commandline --save-dev
```
Para ver el reporte en tu navegador, usa el siguiente comando:
```bash
npx allure-commandline serve allure-results
```
Este comando abrirá el reporte en tu navegador, donde podrás ver el detalle de las pruebas ejecutadas.


### Estructura del proyecto
El proyecto sigue una estructura organizada para facilitar la ubicación y mantenimiento de las pruebas. A continuación, se describe la estructura de carpetas:


apiTests: Contiene las pruebas automatizadas para las API (por ejemplo, getPokemon.test.ts y postPlaceholder.test.ts).
webTests: Contiene las pruebas automatizadas para la interfaz web (por ejemplo, pokemonWikipedia.test.ts).
helpers: Contiene funciones auxiliares como encryptionHelper.ts para manejar la encriptación de claves.
pages: Contiene clases de Page Object Model (POM) como WikipediaPage.ts para manejar la interacción con páginas web.
images: Carpeta donde se guardan las imágenes descargadas durante las pruebas.
data: Carpeta que contiene archivos de datos, como el archivo Excel con los nombres de los Pokémon.

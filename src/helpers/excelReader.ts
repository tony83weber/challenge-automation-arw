import * as XLSX from 'xlsx';
import * as path from 'path';

// Función para leer el archivo de Excel
export const readExcelFile = (filePath: string): any[] => {
    const workbook = XLSX.readFile(path.resolve(filePath));
    const sheetName = workbook.SheetNames[0]; 
    const worksheet = workbook.Sheets[sheetName];
    return XLSX.utils.sheet_to_json(worksheet, { header: 1 }).slice(1); // Excluye la cabecera
};

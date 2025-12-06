
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const files = [
    'src/locales/en.json',
    'src/locales/it.json',
    'src/locales/es.json'
];

files.forEach(file => {
    const filePath = path.join(process.cwd(), file);
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        JSON.parse(content);
        console.log(`✅ ${file} is valid JSON.`);
    } catch (error) {
        console.error(`❌ ${file} is INVALID JSON.`);
        console.error(error.message);
    }
});

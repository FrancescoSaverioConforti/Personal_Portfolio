
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const file = 'src/locales/en.json';
const filePath = path.join(process.cwd(), file);
const errorFile = path.join(process.cwd(), 'error.txt');

try {
    const content = fs.readFileSync(filePath, 'utf8');
    JSON.parse(content);
    fs.writeFileSync(errorFile, `✅ ${file} is valid JSON.`);
} catch (error) {
    fs.writeFileSync(errorFile, `❌ ${file} is INVALID JSON.\n${error.message}`);
}

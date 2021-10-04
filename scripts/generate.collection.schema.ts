import { compile } from 'json-schema-to-typescript';
import path from 'path';
import fs from 'fs';

const collectionsFolder = path.join(__dirname, '..', 'src', 'collections');

fs.readdir(collectionsFolder, async (err, files) => {
    if (err) {
        console.log(err);
    }

    for (const fName of files) {
        const currentDir = path.join(collectionsFolder, fName);
        const schema = await getSchema(
            path.join(currentDir, 'schema.json'),
            (err) => {
                console.error(err);
            }
        );
        if (!schema) {
            continue;
        }
        const tsAnotation = await generateTsFile(schema, schema.title);
        await writeFile(
            path.resolve(currentDir, `${fName}.schema.d.ts`),
            tsAnotation
        );
    }
});

async function generateTsFile(schema: any, title: string): Promise<string> {
    const tsAnotation = await compile(schema, title);
    return tsAnotation;
}

async function writeFile(dir: string, file: string) {
    return fs.writeFileSync(dir, file);
}

async function getSchema(path: string, err?: (err: string) => void) {
    try {
        const file = await import(path);
        return file;
    } catch (e) {
        err && err(`Ошибка импорта ${path}`);
    }
}

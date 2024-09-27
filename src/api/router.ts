import * as fs from "node:fs";
import {Application} from "express";

export const initRoutes = async (app: Application) => {
    const folderName = './routes';
    const routeSuffix = '.routes';
    const fileSuffix = `${routeSuffix}.${process.env.API_FILE_EXT}`;

    try {
        if (fs.existsSync(folderName)) {
            const files = fs.readdirSync(folderName).filter((file: string) => file.endsWith(fileSuffix));

            for (const fileName of files) {
                const route = await import((`./routes/${fileName}`));
                const routeName = fileName.split('.')[0];

                app.use(`/${routeName}`, route['default'])
            }
        }
    } catch (err) {
        console.error(err);
    }
};
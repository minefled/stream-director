import { createWriteStream, unlinkSync } from "fs";
import { get } from "https";

export async function download(url:string, destination:string, callback:Function):Promise<any> {
    return new Promise((resolve, reject) => {
        let outFile = createWriteStream(destination);

        const request = get(url, (response) => {
            response.pipe(outFile);
            outFile.on('finish', () => {
                outFile.close((err) => {

                    if(!err) resolve(null);
                    else resolve(err);

                    callback(err);
                });
            });
        }).on('error', (err) => {
            unlinkSync(destination);
            if (callback) callback(err.message);

            resolve(err);
        });
    });
};
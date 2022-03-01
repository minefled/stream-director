import clc from "cli-color";
import { createReadStream, existsSync, mkdirSync, rmdirSync, rmSync } from "fs";
import { moveSync } from "fs-extra";
import { join } from "path";
import { exit } from "process";
import { download } from "../utils";
import * as unzipper from "unzipper";
import { exec, execSync } from "child_process";

export async function install() {
    let installPath = process.cwd();
    let downloadURL = "https://codeload.github.com/minefled/stream-director/zip/master";

    console.log(clc.green(`Installing Stream Director into ${installPath}`));

    //// Download ////
    if(!existsSync(installPath + "stream-director.zip")) {
        await download(downloadURL, installPath+"stream-director.zip", (err:any) => {
            if(err) {
                console.log(clc.red("An error occurred while trying to download Stream Director!"));
                console.log(err);
                exit(1);
            }

            console.log(clc.green("Download finished!"));
        });
    } else {
        console.log(clc.blue("File already downloaded!"));
    }

    //// Extract from ZIP ////
    console.log(clc.green(`Extracting ZIP file...`));

    if(existsSync(join(installPath, "stream-director-master"))) rmSync(join(installPath, "stream-director-master"), { recursive: true });
    createReadStream(installPath + "stream-director.zip")
        .pipe(unzipper.Extract({ path: installPath }))
        .on("close", () => {
            moveSync(join(installPath, "stream-director-master", "backend"), join(installPath, "backend"), { overwrite: true });
            moveSync(join(installPath, "stream-director-master", "frontend"), join(installPath, "frontend"), { overwrite: true });

            // Delete directories
            rmSync(join(installPath, "stream-director-master"), { recursive: true });
            rmSync(join(installPath, "backend", "plugins"), { recursive: true });

            mkdirSync(join(installPath, "backend", "plugins"));

            console.log(clc.green(`Installing Dependencies...`));

            // Run NPM Installs
            console.log(clc.green(` - Installing Backend Dependencies...`));
            execSync("npm i", { cwd: join(installPath, "backend") });

            console.log(clc.green(` - Installing Frontend Dependencies...`));
            execSync("npm i", { cwd: join(installPath, "frontend") });

            // Build
            console.log(clc.green(`Building Frontend`));
            execSync("npm run build", { cwd: join(installPath, "frontend") });

            console.log();
            console.log(clc.green(`Stream Director has been set up successfully!`));
        });
    
}
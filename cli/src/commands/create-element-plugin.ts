import { writeFileSync }    from "fs";
import { join }             from "path";
import { cwd }              from "process";

import PromptSync           from "prompt-sync";
import clc                  from "cli-color";

const prompt = PromptSync({});

export async function createElementPlugin() {
    console.log(clc.bold("1. "));
    const twitchName = await prompt(clc.cyanBright("Twitch Channel Name > "));
    console.log();
}
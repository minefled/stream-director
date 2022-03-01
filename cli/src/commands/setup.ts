import clc from "cli-color";
import { writeFileSync } from "fs";
import { join } from "path";
import { cwd } from "process";
import PromptSync from "prompt-sync";
import { install } from "./install";
const prompt = PromptSync({});

export async function setup() {
    console.log(clc.bold("1. First, please enter the name of the Twitch\nChannel that should be monitored for going live\n"));
    const twitchName = await prompt(clc.cyanBright("Twitch Channel Name > "));
    console.log();

    console.log(clc.bold("2. Now, please enter the Client ID for your Twitch Application.\nIf you dont know what this is or how to get it, check out\nhttps://github.com/minefled/stream-director/blob/master/README.md\nfor help on setting up.\n"));
    const clientID = await prompt(clc.cyanBright("Application Client ID > "));
    console.log();

    console.log(clc.bold("3. Lastly, enter the Client Secret of your Twitch Application.\nOnce again, check out the setup help mentioned before if you\ndont know what this is or how to get it.\n"));
    const clientSecret = await prompt(clc.cyanBright("Application Client Secret > "));
    console.log();

    await install(() => {
        console.log(twitchName, clientID, clientSecret);

        writeFileSync(join(cwd(), "backend", ".env"), `TWITCH_CLIENT_ID=${clientID}
TWITCH_CLIENT_SECRET=${clientSecret}
TWITCH_CHANNEL_NAME=${twitchName}
        `);
    });
}
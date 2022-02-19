import clc from "cli-color";
import fetch from "node-fetch";
import 'dotenv/config';
import { join } from "path";
import { existsSync, fstat, readFileSync, writeFileSync } from "fs";

export class TwitchAPI {

    clientID:string;
    clientSecret:string;
    accessToken:string;
    tokenExpiresAt:number;

    constructor() {
        this.clientID = process.env.TWITCH_CLIENT_ID || "";
        this.clientSecret = process.env.TWITCH_CLIENT_SECRET || "";

        this.getCredentials();
    }

    async getAccessToken():Promise<string> {
        let url = `https://id.twitch.tv/oauth2/token?client_id=${this.clientID}&client_secret=${this.clientSecret}&grant_type=client_credentials`;

        let response = await fetch(url, { method: "POST" });
        let data = await response.json();

        console.log(data);

        if(data.access_token) {
            console.log(clc.green("Successfully got Twitch API Access Token!"));
        }

        this.accessToken = data.access_token;
        this.tokenExpiresAt = new Date().getTime() + data.expires_in*1000;

        this.exportTwitchCredentials();

        return data.access_token;
    }

    exportTwitchCredentials() {
        let data = {
            accessToken: this.accessToken,
            expiresAt: this.tokenExpiresAt
        };

        let path = join(__dirname, "../../../data/twitch-credentials.json");
        writeFileSync(path, JSON.stringify(data, null, 4));
    }

    async getCredentials() {
        let path = join(__dirname, "../../../data/twitch-credentials.json");

        if(existsSync(path)) {
            let data = JSON.parse(readFileSync(path, "utf-8"));

            this.accessToken = data.accessToken || "";
            this.tokenExpiresAt = data.expiresAt || 0;

            console.log(clc.green("Loaded Twitch Credentials from local file"));
        } else {
            this.getAccessToken();
        }
    }

}
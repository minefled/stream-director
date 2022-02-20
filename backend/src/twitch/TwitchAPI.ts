import clc from "cli-color";
import fetch from "node-fetch";
import { join } from "path";
import { existsSync, fstat, readFileSync, writeFileSync } from "fs";
import 'dotenv/config';

import { Service } from "../service";

export class TwitchAPI {

    clientID:string;
    clientSecret:string;
    accessToken:string;
    tokenExpiresAt:number;

    private checkIsLiveInterval:NodeJS.Timer;

    private previousIsLive:boolean = false;
    public isLive:boolean = false;

    constructor(
        private service:Service
    ) {
        this.clientID = process.env.TWITCH_CLIENT_ID || "";
        this.clientSecret = process.env.TWITCH_CLIENT_SECRET || "";

        this.getCredentials();

        this.startIsLiveInterval();
    }

    /* ========================================= */
    /* ============= Authorization ============= */
    /* ========================================= */

    async getAccessToken():Promise<string> {
        let url = `https://id.twitch.tv/oauth2/token?client_id=${this.clientID}&client_secret=${this.clientSecret}&grant_type=client_credentials`;

        let response = await fetch(url, { method: "POST" });
        let data = await response.json();

        if(data.access_token) {
            console.log(clc.green("[Twitch API] Successfully got Twitch API Access Token!"));
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

            console.log(clc.green("[Twitch API] Loaded Twitch Credentials from local file"));

            if(new Date().getTime() > this.tokenExpiresAt) {
                console.log(clc.yellow("[Twitch API] Twitch Access Token expired! Getting new one..."));
                await this.getAccessToken();
            }

            if(await this.isAccessTokenValid(this.accessToken) == false) {
                console.log(clc.yellow("[Twitch API] Twitch Access Token invalid! Getting new one..."));
                await this.getAccessToken();
            }
        } else {
            this.getAccessToken();
        }
    }

    async isAccessTokenValid(token:string):Promise<boolean> {
        let response = await fetch(
            "https://id.twitch.tv/oauth2/validate",
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        let res = await response.json();
        return res.status != 401;
    }

    /* ====================================================== */
    /* ============= Automatically send queries ============= */
    /* ====================================================== */

    startIsLiveInterval() {
        this.checkIsLiveInterval = setInterval(() => {
            this.checkIsLive();
        }, 10000);
    }

    async checkIsLive() {
        let isLive = await this.getIsLive(process.env.TWITCH_CHANNEL_NAME || "");

        this.isLive = isLive;

        if(this.previousIsLive != isLive) {
            this.service.server.websocket.broadcast({
                type: "is_live",
                data: {
                    is_live: isLive
                }
            });
        }
    }

    /* ========================================= */
    /* ============= API Endpoints ============= */
    /* ========================================= */

    async getIsLive(channelName:string):Promise<boolean> {
        let url = `https://api.twitch.tv/helix/streams?user_login=${channelName}`;

        let response = await fetch(url, { headers: {
            "Client-Id": this.clientID,
            "Authorization": `Bearer ${this.accessToken}`
        } });

        return (await response.json()).data?.length > 0;
    }

}
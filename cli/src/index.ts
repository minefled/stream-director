#!/usr/bin/env node

import { program } from "commander";
import clc from "cli-color";

import { install } from "./commands/install";
import { setup } from "./commands/setup";

console.log(clc.yellowBright     ("╭─────────────────────────╮"));
console.log(clc.yellowBright.bold("│   Stream Director CLI   │"));
console.log(clc.yellowBright     ("╰─────────────────────────╯"));
console.log();

program
    .name("stream-director")
    .description("A tool helping with Stream Director Projects")

program.command("install")
    .description("Installs the StreamDirector front- & backend into the current directory")
    .action(() => {
        install();
    });

program.command("setup")
    .description("Helps setting Stream Director up")
    .action(() => {
        setup();
    });

program.parse();

if (!process.argv.slice(2).length) {
    program.outputHelp();
}
#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const src_1 = require("../src");
const package_json_1 = __importDefault(require("../package.json"));
class Bootstrap {
    static build() {
        this.program
            .version(package_json_1.default.version, '-v --version', 'Выводит текущую версию')
            .usage('<command> [options]')
            .helpOption('-h --help', 'Выводит информацию для использования');
        src_1.Commander.run(this.program);
        if (!process.argv.slice(2).length) {
            this.program.outputHelp();
        }
    }
}
Bootstrap.program = commander_1.program;
Bootstrap.build();

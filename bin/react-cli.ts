#!/usr/bin/env node
import 'module-alias/register';
import { Command, program } from 'commander';
import { Commander } from '../src';

import pck from '../package.json';
class Bootstrap {
    private static program: Command = program;
    static build() {
        this.program
            .version(pck.version, '-v --version', 'Выводит текущую версию')
            .usage('<command> [options]')
            .helpOption('-h --help', 'Выводит информацию для использования');

        Commander.run(this.program);

        this.program.parse(process.argv);

        if (!process.argv.slice(2).length) {
            this.program.outputHelp();
        }
    }
}

Bootstrap.build();
